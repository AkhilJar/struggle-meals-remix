import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchMeals,
  fetchRecentMeals,
  fetchMealById,
  fetchRemixById,
  fetchRemixesForMeal,
  fetchLatestRemixes,
  createRemix,
  createMeal,
  updateMeal,
  updateRemix,
  deleteMeal,
  deleteRemix,
  verifyMeal,
} from "@/lib/api/meals";
import type { Meal, NewMealInput, NewRemixInput } from "@/types/meal";

export const useMeals = () =>
  useQuery({
    queryKey: ["meals"],
    queryFn: fetchMeals,
  });

export const useMeal = (id?: string) =>
  useQuery({
    queryKey: ["meal", id],
    queryFn: () => fetchMealById(id as string),
    enabled: Boolean(id),
  });

export const useRemixes = (mealId?: string) =>
  useQuery({
    queryKey: ["remixes", mealId],
    queryFn: () => fetchRemixesForMeal(mealId as string),
    enabled: Boolean(mealId),
  });

export const useRemix = (remixId?: string) =>
  useQuery({
    queryKey: ["remix", remixId],
    queryFn: () => fetchRemixById(remixId as string),
    enabled: Boolean(remixId),
  });

export const useLatestRemixes = (limit = 6) =>
  useQuery({
    queryKey: ["latest-remixes", limit],
    queryFn: () => fetchLatestRemixes(limit),
  });

export const useRecentMeals = (limit = 6) =>
  useQuery({
    queryKey: ["recent-meals", limit],
    queryFn: () => fetchRecentMeals(limit),
  });

export const useCreateRemix = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: NewRemixInput) => createRemix(input),
    onSuccess: (remix) => {
      queryClient.invalidateQueries({ queryKey: ["remixes", remix.parentMealId ?? undefined] });
      queryClient.invalidateQueries({ queryKey: ["meals"] });
      queryClient.invalidateQueries({ queryKey: ["latest-remixes"], exact: false });
      if (remix.parentMealId) {
        queryClient.invalidateQueries({ queryKey: ["meal", remix.parentMealId] });
      }
    },
  });
};

export const useCreateMeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: NewMealInput) => createMeal(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recent-meals"] });
    },
  });
};

export const useUpdateMeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: NewMealInput }) => updateMeal(id, payload),
    onSuccess: (meal) => {
      queryClient.invalidateQueries({ queryKey: ["meal", meal.id] });
      queryClient.invalidateQueries({ queryKey: ["recent-meals"] });
    },
  });
};

export const useDeleteMeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteMeal(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["recent-meals"] });
      queryClient.removeQueries({ queryKey: ["meal", id], exact: true });
    },
  });
};

export const useUpdateRemix = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: NewRemixInput }) => updateRemix(id, payload),
    onSuccess: (remix) => {
      queryClient.invalidateQueries({ queryKey: ["remix", remix.id] });
      queryClient.invalidateQueries({ queryKey: ["remixes", remix.parentMealId ?? undefined] });
      queryClient.invalidateQueries({ queryKey: ["latest-remixes"], exact: false });
      if (remix.parentMealId) {
        queryClient.invalidateQueries({ queryKey: ["meal", remix.parentMealId] });
      }
    },
  });
};

export const useDeleteRemix = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRemix(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["remix", id] });
      queryClient.invalidateQueries({ queryKey: ["remixes"] });
      queryClient.invalidateQueries({ queryKey: ["latest-remixes"], exact: false });
    },
  });
};

export const useVerifyMeal = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Meal,
    Error,
    { mealId: string; isVerified: boolean; verifications?: number },
    { previousMeals?: Meal[] | undefined; previousMeal?: Meal | null }
  >({
    mutationFn: ({ mealId, isVerified, verifications }) => verifyMeal(mealId, { isVerified, verifications }),
    onMutate: async ({ mealId, isVerified, verifications }) => {
      await queryClient.cancelQueries({ queryKey: ["meals"] });
      await queryClient.cancelQueries({ queryKey: ["meal", mealId] });

      const previousMeals = queryClient.getQueryData<Meal[]>(["meals"]);
      if (previousMeals) {
        queryClient.setQueryData<Meal[]>(["meals"], (old) =>
          old?.map((meal) =>
            meal.id === mealId
              ? {
                  ...meal,
                  isVerified,
                  verifications: verifications ?? meal.verifications,
                }
              : meal,
          ) ?? [],
        );
      }

      const previousMeal = queryClient.getQueryData<Meal | null>(["meal", mealId]);
      if (previousMeal) {
        queryClient.setQueryData<Meal>(["meal", mealId], {
          ...previousMeal,
          isVerified,
          verifications: verifications ?? previousMeal.verifications,
        });
      }

      return { previousMeals, previousMeal };
    },
    onError: (_error, variables, context) => {
      if (context?.previousMeals) {
        queryClient.setQueryData(["meals"], context.previousMeals);
      }
      if (context?.previousMeal) {
        queryClient.setQueryData(["meal", variables.mealId], context.previousMeal);
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["meal", variables.mealId] });
      queryClient.invalidateQueries({ queryKey: ["meals"] });
    },
  });
};
