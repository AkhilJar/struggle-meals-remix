export interface Meal {
  id: string;
  title: string;
  image: string | null;
  ingredients: string[];
  tools: string[];
  timeInMinutes: number;
  estimatedCost: number;
  author: {
    name: string;
    handle: string;
    avatar?: string | null;
  };
  struggleScore: number;
  verifications: number;
  remixes: number;
  isVerified: boolean;
  createdAt: string;
  description?: string | null;
  steps: string[];
}

export interface Remix {
  id: string;
  parentMealId: string | null;
  title: string;
  description?: string | null;
  image: string | null;
  ingredients: string[];
  tools: string[];
  steps: string[];
  timeInMinutes: number;
  estimatedCost: number;
  struggleScore: number;
  createdAt: string;
  author: {
    name: string;
    handle: string;
    avatar?: string | null;
  };
}

export interface NewRemixInput {
  parentMealId?: string | null;
  title: string;
  description?: string;
  image?: string | null;
  ingredients: string[];
  tools: string[];
  steps: string[];
  timeInMinutes: number;
  estimatedCost: number;
  struggleScore?: number;
  authorName: string;
  authorHandle: string;
  authorAvatar?: string | null;
}

export interface NewMealInput {
  title: string;
  description?: string | null;
  image?: string | null;
  ingredients: string[];
  tools: string[];
  steps: string[];
  timeInMinutes: number;
  estimatedCost: number;
  struggleScore: number;
  authorName: string;
  authorHandle: string;
  authorAvatar?: string | null;
  verifications?: number;
  remixes?: number;
  isVerified?: boolean;
}
