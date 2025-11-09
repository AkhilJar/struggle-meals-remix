import { supabase } from "@/lib/supabase";
import { Meal, Remix, NewRemixInput } from "@/types/meal";

type MealRow = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  ingredients: string[] | null;
  tools: string[] | null;
  steps: string[] | null;
  time_in_minutes: number | null;
  estimated_cost: number | null;
  struggle_score: number | null;
  verifications: number | null;
  remixes: number | null;
  is_verified: boolean | null;
  author_name: string | null;
  author_handle: string | null;
  author_avatar: string | null;
  created_at: string;
};

type RemixRow = {
  id: string;
  parent_meal_id: string | null;
  title: string;
  description: string | null;
  image_url: string | null;
  ingredients: string[] | null;
  tools: string[] | null;
  steps: string[] | null;
  time_in_minutes: number | null;
  estimated_cost: number | null;
  struggle_score: number | null;
  author_name: string | null;
  author_handle: string | null;
  author_avatar: string | null;
  created_at: string;
};

const mealSelect = `
  id,
  title,
  description,
  image_url,
  ingredients,
  tools,
  steps,
  time_in_minutes,
  estimated_cost,
  struggle_score,
  verifications,
  remixes,
  is_verified,
  author_name,
  author_handle,
  author_avatar,
  created_at
`;

const remixSelect = `
  id,
  parent_meal_id,
  title,
  description,
  image_url,
  ingredients,
  tools,
  steps,
  time_in_minutes,
  estimated_cost,
  struggle_score,
  author_name,
  author_handle,
  author_avatar,
  created_at
`;

const fallbackImage = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80";

const mapMeal = (record: MealRow): Meal => ({
  id: record.id,
  title: record.title,
  description: record.description,
  image: record.image_url ?? fallbackImage,
  ingredients: record.ingredients ?? [],
  tools: record.tools ?? [],
  steps: record.steps ?? [],
  timeInMinutes: record.time_in_minutes ?? 0,
  estimatedCost: Number(record.estimated_cost ?? 0),
  struggleScore: record.struggle_score ?? 0,
  verifications: record.verifications ?? 0,
  remixes: record.remixes ?? 0,
  isVerified: Boolean(record.is_verified),
  createdAt: record.created_at,
  author: {
    name: record.author_name ?? "unknown_chef",
    handle: record.author_handle ?? "unknown",
    avatar: record.author_avatar,
  },
});

const mapRemix = (record: RemixRow): Remix => ({
  id: record.id,
  parentMealId: record.parent_meal_id,
  title: record.title,
  description: record.description,
  image: record.image_url ?? fallbackImage,
  ingredients: record.ingredients ?? [],
  tools: record.tools ?? [],
  steps: record.steps ?? [],
  timeInMinutes: record.time_in_minutes ?? 0,
  estimatedCost: Number(record.estimated_cost ?? 0),
  struggleScore: record.struggle_score ?? 0,
  createdAt: record.created_at,
  author: {
    name: record.author_name ?? "remix_unknown",
    handle: record.author_handle ?? "unknown",
    avatar: record.author_avatar,
  },
});

export const fetchMeals = async (): Promise<Meal[]> => {
  const { data, error } = await supabase
    .from<MealRow>("meals")
    .select(mealSelect)
    .order("struggle_score", { ascending: false });
  if (error) {
    throw error;
  }
  return (data ?? []).map(mapMeal);
};

export const fetchMealById = async (id: string): Promise<Meal | null> => {
  const { data, error } = await supabase.from<MealRow>("meals").select(mealSelect).eq("id", id).single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data ? mapMeal(data) : null;
};

export const fetchRemixesForMeal = async (mealId: string): Promise<Remix[]> => {
  const { data, error } = await supabase
    .from<RemixRow>("remixes")
    .select(remixSelect)
    .eq("parent_meal_id", mealId)
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return (data ?? []).map(mapRemix);
};

export const fetchRemixById = async (id: string): Promise<Remix | null> => {
  const { data, error } = await supabase.from<RemixRow>("remixes").select(remixSelect).eq("id", id).single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data ? mapRemix(data) : null;
};

export const fetchLatestRemixes = async (limit = 6): Promise<Remix[]> => {
  const { data, error } = await supabase
    .from<RemixRow>("remixes")
    .select(remixSelect)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    throw error;
  }
  return (data ?? []).map(mapRemix);
};

export const createRemix = async (payload: NewRemixInput): Promise<Remix> => {
  const { data, error } = await supabase
    .from<RemixRow>("remixes")
    .insert({
      parent_meal_id: payload.parentMealId ?? null,
      title: payload.title,
      description: payload.description,
      image_url: payload.image,
      ingredients: payload.ingredients,
      tools: payload.tools,
      steps: payload.steps,
      time_in_minutes: payload.timeInMinutes,
      estimated_cost: payload.estimatedCost,
      struggle_score: payload.struggleScore ?? 0,
      author_name: payload.authorName,
      author_handle: payload.authorHandle,
      author_avatar: payload.authorAvatar,
    })
    .select(remixSelect)
    .single();

  if (error) {
    throw error;
  }

  return mapRemix(data);
};

export const updateRemix = async (id: string, payload: NewRemixInput): Promise<Remix> => {
  const { data, error } = await supabase
    .from<RemixRow>("remixes")
    .update({
      parent_meal_id: payload.parentMealId ?? null,
      title: payload.title,
      description: payload.description,
      image_url: payload.image,
      ingredients: payload.ingredients,
      tools: payload.tools,
      steps: payload.steps,
      time_in_minutes: payload.timeInMinutes,
      estimated_cost: payload.estimatedCost,
      struggle_score: payload.struggleScore ?? 0,
      author_name: payload.authorName,
      author_handle: payload.authorHandle,
      author_avatar: payload.authorAvatar,
    })
    .eq("id", id)
    .select(remixSelect)
    .single();

  if (error) {
    throw error;
  }

  return mapRemix(data);
};

export const verifyMeal = async (mealId: string, verifications?: number): Promise<Meal> => {
  const { data, error } = await supabase
    .from<MealRow>("meals")
    .update({ is_verified: true, verifications })
    .eq("id", mealId)
    .select(mealSelect)
    .single();

  if (error) {
    throw error;
  }

  return mapMeal(data);
};
