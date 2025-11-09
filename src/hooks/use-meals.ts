import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchMeals,
  fetchMealById,
  fetchRemixById,
  fetchRemixesForMeal,
  fetchLatestRemixes,
  createRemix,
  updateRemix,
  verifyMeal,
} from "@/lib/api/meals";
import type { Meal, NewRemixInput } from "@/types/meal";

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

export const useCreateRemix = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: NewRemixInput) => createRemix(input),
    onSuccess: (remix) => {
      queryClient.invalidateQueries({ queryKey: ["remixes", remix.parentMealId ?? undefined] });
      queryClient.invalidateQueries({ queryKey: ["meals"] });
      queryClient.invalidateQueries({ queryKey: ["latest-remixes"] });
      if (remix.parentMealId) {
        queryClient.invalidateQueries({ queryKey: ["meal", remix.parentMealId] });
      }
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
      queryClient.invalidateQueries({ queryKey: ["latest-remixes"] });
      if (remix.parentMealId) {
        queryClient.invalidateQueries({ queryKey: ["meal", remix.parentMealId] });
      }
    },
  });
};

export const useVerifyMeal = () => {
  const queryClient = useQueryClient();

  return useMutation<Meal, Error, { mealId: string; verifications?: number }, { previousMeals?: Meal[] | undefined; previousMeal?: Meal | null }>({
    mutationFn: ({ mealId, verifications }: { mealId: string; verifications?: number }) =>
      verifyMeal(mealId, verifications),
    onMutate: async ({ mealId, verifications }) => {
      await queryClient.cancelQueries({ queryKey: ["meals"] });
      await queryClient.cancelQueries({ queryKey: ["meal", mealId] });

      const previousMeals = queryClient.getQueryData<Meal[]>(["meals"]);
      if (previousMeals) {
        queryClient.setQueryData<Meal[]>(["meals"], (old) =>
          old?.map((meal) =>
            meal.id === mealId
              ? {
                  ...meal,
                  isVerified: true,
                  verifications: verifications ?? meal.verifications + 1,
                }
              : meal,
          ) ?? [],
        );
      }

      const previousMeal = queryClient.getQueryData<Meal | null>(["meal", mealId]);
      if (previousMeal) {
        queryClient.setQueryData<Meal>(["meal", mealId], {
          ...previousMeal,
          isVerified: true,
          verifications: verifications ?? previousMeal.verifications + 1,
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
