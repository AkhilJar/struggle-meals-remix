#!/usr/bin/env node
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("Missing SUPABASE_URL (or VITE_SUPABASE_URL) and/or SUPABASE_SERVICE_ROLE_KEY environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false },
});

const now = new Date();

const meals = [
  {
    id: "7f9a4caa-1111-4f9e-a111-111111111111",
    title: "Hot Cheeto Sushi Burrito",
    description: "Crushed Hot Cheetos replace tempura flakes. Microwave-only madness.",
    image_url: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80&auto=format&fit=crop",
    ingredients: ["Hot Cheetos", "Rice", "Spam", "Nori"],
    tools: ["Microwave", "Spoon"],
    steps: [
      "Microwave leftover rice until steamy.",
      "Crumble Hot Cheetos in the bag for neon crumbs.",
      "Flash-heat Spam slices for 60 seconds.",
      "Layer rice + Spam + crumbs on nori and roll tight.",
      "Slice with a spoon or plastic knife—commit to the bit.",
    ],
    time_in_minutes: 8,
    estimated_cost: 3.5,
    struggle_score: 95,
    verifications: 12,
    remixes: 4,
    is_verified: true,
    author_name: "broke_chef_mike",
    author_handle: "broke_chef_mike",
    author_avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Mike",
    created_at: now.toISOString(),
  },
  {
    id: "7f9a4caa-2222-4f9e-a222-222222222222",
    title: "Microwave Ramen Pizza",
    description: "Ramen noodle crust, ketchup sauce, and string cheese—college fine dining.",
    image_url: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=800&q=80&auto=format&fit=crop",
    ingredients: ["Instant Ramen", "Ketchup", "String Cheese"],
    tools: ["Microwave", "Plate"],
    steps: [
      "Cook ramen in the microwave and drain almost all liquid.",
      "Flatten noodles into a disc on a plate.",
      "Paint with ketchup like it’s fancy sauce.",
      "Rip up string cheese and scatter.",
      "Microwave one more minute until molten.",
    ],
    time_in_minutes: 6,
    estimated_cost: 2.0,
    struggle_score: 88,
    verifications: 6,
    remixes: 5,
    is_verified: true,
    author_name: "dorm_gourmet",
    author_handle: "dorm_gourmet",
    author_avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Dorm",
    created_at: now.toISOString(),
  },
  {
    id: "7f9a4caa-3333-4f9e-a333-333333333333",
    title: "PB&J Quesadilla Supreme",
    description: "Peanut butter + jelly folded in a tortilla and fried on any hot surface.",
    image_url: "https://images.unsplash.com/photo-1508739826987-b79cd8b7da12?w=800&q=80&auto=format&fit=crop",
    ingredients: ["Flour Tortilla", "Peanut Butter", "Jelly"],
    tools: ["Pan", "Spatula"],
    steps: [
      "Spread peanut butter over the entire tortilla.",
      "Add jelly to one side only.",
      "Fold and press.",
      "Toast on a pan or hot plate 2 minutes each side.",
    ],
    time_in_minutes: 4,
    estimated_cost: 1.4,
    struggle_score: 82,
    verifications: 5,
    remixes: 2,
    is_verified: false,
    author_name: "air_fry_everything",
    author_handle: "air_fry_everything",
    author_avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=AirFry",
    created_at: now.toISOString(),
  },
  {
    id: "7f9a4caa-4444-4f9e-a444-444444444444",
    title: "Cereal Fried Rice",
    description: "Leftover rice fried with sugary cereal for that chaos crunch.",
    image_url: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&q=80&auto=format&fit=crop",
    ingredients: ["Leftover Rice", "Frosted Flakes", "Soy Sauce", "Egg"],
    tools: ["Microwave", "Bowl"],
    steps: [
      "Crack an egg into rice and stir like you mean it.",
      "Microwave 90 seconds, stir, microwave again.",
      "Splash soy sauce, top with crushed cereal, microwave 30 seconds.",
      "Let it sit so the flakes soften but still crunch.",
    ],
    time_in_minutes: 7,
    estimated_cost: 2.8,
    struggle_score: 79,
    verifications: 3,
    remixes: 1,
    is_verified: false,
    author_name: "3am_snacker",
    author_handle: "3am_snacker",
    author_avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=NightOwl",
    created_at: now.toISOString(),
  },
  {
    id: "7f9a4caa-5555-4f9e-a555-555555555555",
    title: "Mac & Cheese Waffle Stack",
    description: "Box mac smashed into a waffle iron until crispy golden.",
    image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80&auto=format&fit=crop",
    ingredients: ["Boxed Mac & Cheese", "Cooking Spray"],
    tools: ["Pot", "Waffle Iron"],
    steps: [
      "Cook the mac per the instructions.",
      "Grease the waffle iron aggressively.",
      "Pile mac in, close, and forget about it for 6 minutes.",
      "Pop it out, let it set, drizzle hot sauce.",
    ],
    time_in_minutes: 11,
    estimated_cost: 1.7,
    struggle_score: 91,
    verifications: 10,
    remixes: 3,
    is_verified: true,
    author_name: "waffle_wizard",
    author_handle: "waffle_wizard",
    author_avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Waffle",
    created_at: now.toISOString(),
  },
];

const remixes = [
  {
    parent_meal_id: meals[0].id,
    title: "Nuclear Crunch Roll",
    description: "Added canned corn + torched mayo for a dorm brûlée.",
    image_url: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80&auto=format&fit=crop",
    ingredients: ["Hot Cheetos", "Rice", "Spam", "Corn", "Spicy Mayo"],
    tools: ["Microwave", "Spoon", "Lighter"],
    steps: ["Follow the OG roll", "Mix corn into rice", "Torch mayo on top"],
    time_in_minutes: 9,
    estimated_cost: 4.2,
    struggle_score: 88,
    author_name: "Rhea Tran",
    author_handle: "rice_hoarder",
    author_avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Rhea",
    created_at: now.toISOString(),
  },
  {
    parent_meal_id: meals[1].id,
    title: "Breakfast Ramen Pizza",
    description: "Threw scrambled egg and crushed chips on the ramen crust.",
    image_url: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80&auto=format&fit=crop",
    ingredients: ["Instant Ramen", "Egg", "Tortilla Chips", "Hot Sauce"],
    tools: ["Microwave", "Plate"],
    steps: ["Cook ramen disc", "Scramble egg in microwave cup", "Top pizza with egg + chips + hot sauce"],
    time_in_minutes: 7,
    estimated_cost: 2.5,
    struggle_score: 84,
    author_name: "Quincy Vega",
    author_handle: "queso_bandit",
    author_avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Quincy",
    created_at: now.toISOString(),
  },
  {
    parent_meal_id: meals[4].id,
    title: "Sweet Heat Mac Waffle",
    description: "Sriracha + honey drizzle plus crushed peanuts for texture.",
    image_url: "https://images.unsplash.com/photo-1542827633-3b3c62b4b006?w=800&q=80&auto=format&fit=crop",
    ingredients: ["Mac & Cheese", "Hot Honey", "Peanuts"],
    tools: ["Waffle Iron"],
    steps: ["Waffle the mac", "Drizzle hot honey", "Finish with crushed peanuts"],
    time_in_minutes: 12,
    estimated_cost: 2.1,
    struggle_score: 90,
    author_name: "Maya Ortiz",
    author_handle: "microwave_marauder",
    author_avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Maya",
    created_at: now.toISOString(),
  },
];

async function seed() {
  console.log("Clearing remixes…");
  const deleteRemixes = await supabase.from("remixes").delete().not("id", "is", null);
  if (deleteRemixes.error && deleteRemixes.error.code !== "PGRST116") {
    throw deleteRemixes.error;
  }

  console.log("Clearing meals…");
  const deleteMeals = await supabase.from("meals").delete().not("id", "is", null);
  if (deleteMeals.error && deleteMeals.error.code !== "PGRST116") {
    throw deleteMeals.error;
  }

  console.log(`Inserting ${meals.length} meals…`);
  const { error: mealError } = await supabase.from("meals").insert(meals);
  if (mealError) throw mealError;

  console.log(`Inserting ${remixes.length} remixes…`);
  const { error: remixError } = await supabase.from("remixes").insert(remixes);
  if (remixError) throw remixError;

  console.log("Seed complete ✅");
}

seed()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .then(() => process.exit(0));
