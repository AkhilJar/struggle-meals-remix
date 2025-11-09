export interface Meal {
  id: string;
  title: string;
  image: string;
  ingredients: string[];
  tools: string[];
  timeInMinutes: number;
  estimatedCost: number;
  author: {
    name: string;
    avatar: string;
  };
  struggleScore: number;
  verifications: number;
  remixes: number;
  isVerified: boolean;
  createdAt: Date;
  description?: string;
  steps: string[];
}

export const MOCK_MEALS: Meal[] = [
  {
    id: "1",
    title: "Hot Cheeto Sushi Burrito",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80",
    ingredients: ["Hot Cheetos", "Rice", "Spam", "Nori"],
    tools: ["Microwave", "Spoon"],
    timeInMinutes: 8,
    estimatedCost: 3.5,
    author: {
      name: "broke_chef_mike",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
    },
    struggleScore: 95,
    verifications: 12,
    remixes: 8,
    isVerified: true,
    createdAt: new Date("2024-01-15"),
    description: "Crushed up a bag of Hot Cheetos for texture. Game changer.",
    steps: [
      "Microwave the rice until hot (2 min)",
      "Crush Hot Cheetos in the bag",
      "Cook spam in microwave (1 min)",
      "Lay nori flat, add rice layer",
      "Top with spam and crushed Cheetos",
      "Roll it up tight",
      "Cut into pieces with a spoon (yes, really)"
    ]
  },
  {
    id: "2",
    title: "Ramen Pizza Hybrid",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    ingredients: ["Instant Ramen", "Cheese", "Ketchup"],
    tools: ["Microwave", "Plate"],
    timeInMinutes: 5,
    estimatedCost: 2.0,
    author: {
      name: "dorm_gourmet",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chef"
    },
    struggleScore: 88,
    verifications: 7,
    remixes: 15,
    isVerified: true,
    createdAt: new Date("2024-01-14"),
    description: "Cooked ramen, flattened it, added cheese and ketchup. Microwave until melty.",
    steps: [
      "Cook ramen in microwave (3 min)",
      "Drain most of the water",
      "Flatten noodles on a plate into a circle",
      "Spread ketchup on top like pizza sauce",
      "Add cheese slices",
      "Microwave for 1 minute until cheese melts"
    ]
  },
  {
    id: "3",
    title: "PB&J Quesadilla Supreme",
    image: "https://images.unsplash.com/photo-1626790680787-de5e9a07bcf2?w=800&q=80",
    ingredients: ["Tortilla", "Peanut Butter", "Jelly"],
    tools: ["Air Fryer"],
    timeInMinutes: 3,
    estimatedCost: 1.5,
    author: {
      name: "air_fry_everything",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Air"
    },
    struggleScore: 92,
    verifications: 5,
    remixes: 3,
    isVerified: false,
    createdAt: new Date("2024-01-13"),
    description: "Trust the process. Air fryer makes it crispy.",
    steps: [
      "Spread peanut butter on tortilla",
      "Add jelly on one half",
      "Fold tortilla in half",
      "Air fry at 380°F for 3 minutes",
      "Flip halfway through"
    ]
  },
  {
    id: "4",
    title: "Cereal Fried Rice",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80",
    ingredients: ["Leftover Rice", "Frosted Flakes", "Soy Sauce", "Egg"],
    tools: ["Microwave", "Bowl"],
    timeInMinutes: 6,
    estimatedCost: 2.8,
    author: {
      name: "3am_snacker",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Night"
    },
    struggleScore: 81,
    verifications: 3,
    remixes: 6,
    isVerified: false,
    createdAt: new Date("2024-01-12"),
    description: "Sounds wrong, tastes right. The sweetness balances the soy sauce.",
    steps: [
      "Put rice in bowl",
      "Crack egg on top, mix it up",
      "Microwave for 2 minutes",
      "Stir in soy sauce",
      "Crush Frosted Flakes on top",
      "Microwave another minute"
    ]
  },
  {
    id: "5",
    title: "Mac & Cheese Waffle",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
    ingredients: ["Box Mac & Cheese", "Nothing else"],
    tools: ["Waffle Iron"],
    timeInMinutes: 10,
    estimatedCost: 1.2,
    author: {
      name: "waffle_wizard",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Waffle"
    },
    struggleScore: 97,
    verifications: 18,
    remixes: 22,
    isVerified: true,
    createdAt: new Date("2024-01-11"),
    description: "Make mac & cheese normally. Press into waffle iron. Crispy heaven.",
    steps: [
      "Make box mac & cheese according to package",
      "Heat up waffle iron",
      "Spray waffle iron with cooking spray (or butter it)",
      "Scoop mac & cheese onto waffle iron",
      "Close and press for 5-7 minutes until crispy",
      "Carefully remove and let cool for 1 minute"
    ]
  }
];
