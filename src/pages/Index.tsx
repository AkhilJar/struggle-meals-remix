import { MealCard } from "@/components/MealCard";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Plus, Flame, TrendingUp, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMeals } from "@/hooks/use-meals";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { data: meals = [], isLoading, isError, refetch } = useMeals();
  const [creationLabel] = useState("Make Your Struggle");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Header */}
      <header className="bg-gradient-hero border-b-4 border-primary">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-transparent bg-gradient-struggle bg-clip-text mb-2">
                Struggle Meals
              </h1>
              <p className="text-xl text-foreground font-bold">
                Cheap. Fast. Questionable.
              </p>
            </div>
            <Button 
              size="lg" 
              className="bg-gradient-struggle border-0 hover:opacity-90 font-black text-lg shadow-neon"
              onClick={() => navigate("/remix")}
            >
              <Plus className="w-5 h-5 mr-2" />
              {creationLabel}
            </Button>
          </div>
          
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-struggle p-3 rounded-lg">
            <TrendingUp className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-foreground">
              Top Ranked This Week
            </h2>
            <p className="text-muted-foreground text-sm">
              Sorted by Struggle Score™, verifications, and remix count
            </p>
          </div>
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {isLoading && (
            <>
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="h-80 rounded-xl border-2 border-dashed border-border animate-pulse bg-card/50" />
              ))}
            </>
          )}

          {isError && (
            <div className="col-span-full flex flex-col items-center justify-center gap-4 border-2 border-destructive rounded-xl p-8 text-center">
              <Loader2 className="w-8 h-8 text-destructive animate-spin" />
              <p className="font-bold text-destructive">Could not load the leaderboard. Check your Supabase table or try again.</p>
              <Button onClick={() => refetch()} variant="outline" className="font-bold">
                Retry
              </Button>
            </div>
          )}

          {!isLoading && !isError && meals.length === 0 && (
            <div className="col-span-full text-center border-2 border-border rounded-xl p-10 text-muted-foreground font-bold">
              No struggle meals yet. Use the Remix button to seed your Supabase table.
            </div>
          )}

          {!isLoading && !isError && meals.map((meal, index) => (
            <MealCard key={meal.id} meal={meal} rank={index + 1} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-struggle p-8 rounded-xl text-center shadow-neon">
          <Flame className="w-16 h-16 text-primary-foreground mx-auto mb-4" />
          <h3 className="text-3xl font-black text-primary-foreground mb-3">
            Got a Struggle Meal?
          </h3>
          <p className="text-primary-foreground/90 mb-6 max-w-lg mx-auto">
            Share your most creative, cheap, and chaotic meal. Get verified by the community. Rise to the top of the leaderboard.
          </p>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-background hover:bg-background/90 border-2 border-background font-black text-lg"
            onClick={() => navigate("/remix")}
          >
            <Plus className="w-5 h-5 mr-2" />
            {creationLabel}
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-primary bg-card mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            College cooking meets chaos mode. © 2024 Struggle Meals
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
