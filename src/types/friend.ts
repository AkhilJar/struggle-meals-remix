export interface FriendProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  struggleScore: number;
  verifiedMeals: number;
  remixes: number;
  partnerLevel: string;
  specialty: string;
  pantryHighlights: string[];
  lastRemix: string;
  weeklyWins: number;
}

export interface GeminiMatchUp {
  id: string;
  headline: string;
  pitch: string;
  action: string;
  ingredients: {
    friend: string;
    items: string[];
  }[];
  bonus: string;
}

export const MOCK_FRIENDS: FriendProfile[] = [
  {
    id: "friend-rhea",
    name: "Rhea Tran",
    handle: "rice_hoarder",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Rhea",
    struggleScore: 214,
    verifiedMeals: 8,
    remixes: 14,
    partnerLevel: "Certified Strategist",
    specialty: "Starch layering & microwave flips",
    pantryHighlights: ["Leftover rice mountain", "Canned corn", "Spicy mayo packets"],
    lastRemix: "Nori Nacho Stack",
    weeklyWins: 3,
  },
  {
    id: "friend-quincy",
    name: "Quincy Vega",
    handle: "queso_bandit",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Quincy",
    struggleScore: 201,
    verifiedMeals: 6,
    remixes: 11,
    partnerLevel: "Remix Royalty",
    specialty: "Cheese-based hacks + ramen flips",
    pantryHighlights: ["Queso brick", "Pickled jalapeños", "Day-old fries"],
    lastRemix: "Dumpster Queso Fries",
    weeklyWins: 2,
  },
  {
    id: "friend-noah",
    name: "Noah Imani",
    handle: "noodle_nova",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Noah",
    struggleScore: 186,
    verifiedMeals: 5,
    remixes: 9,
    partnerLevel: "Flavor Gremlin",
    specialty: "Instant noodle spa day",
    pantryHighlights: ["Kimchi pouch", "Peanut butter", "Hot honey packets"],
    lastRemix: "Seoul PB Ramen",
    weeklyWins: 1,
  },
  {
    id: "friend-maya",
    name: "Maya Ortiz",
    handle: "microwave_marauder",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Maya",
    struggleScore: 173,
    verifiedMeals: 4,
    remixes: 7,
    partnerLevel: "Late Night Lifesaver",
    specialty: "One-bowl everything",
    pantryHighlights: ["Instant mashed potatoes", "Frozen spinach", "Taco bell sauces"],
    lastRemix: "Tsunami Potato Bowl",
    weeklyWins: 1,
  },
];

export const MOCK_GEMINI_MATCHUPS: GeminiMatchUp[] = [
  {
    id: "matchup-queso-casserole",
    headline: "Certified Queso Casserole Energy",
    pitch: "Gemini clocked a starch vs. dairy matchup that could break the leaderboard in under 10 minutes.",
    action: "“Your friend has rice. You've got cheese. Want to team up for a queso casserole?”",
    ingredients: [
      {
        friend: "Rhea",
        items: ["Leftover rice", "Frozen peas"],
      },
      {
        friend: "Quincy",
        items: ["Smoked queso cup", "Pickled jalapeños"],
      },
    ],
    bonus: "Extra points if you torch the top with a dorm iron or air fryer to fake a brûlée crust.",
  },
  {
    id: "matchup-crunch-creamy",
    headline: "Crunch + Cream Chaos Prompt",
    pitch: "Gemini pulled the weekly flavor challenge: crunchy, creamy, and questionably shelf-stable.",
    action: "Split duties: one friend handles creamy, the other handles crunch. Microwave only.",
    ingredients: [
      {
        friend: "Noah",
        items: ["Expired yogurt shot", "Instant ramen brick"],
      },
      {
        friend: "Maya",
        items: ["Stale tortilla chips", "Hot honey packets"],
      },
    ],
    bonus: "Add crushed cereal dust for plating drama and rack up Remix Royalty votes.",
  },
];
