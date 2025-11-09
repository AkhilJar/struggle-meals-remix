import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Clock, 
  DollarSign, 
  Flame, 
  Shuffle, 
  CheckCircle2, 
  ChevronLeft,
  Utensils,
  Loader2
} from "lucide-react";
import { useMeal, useRemixes, useVerifyMeal } from "@/hooks/use-meals";
import { toast } from "@/components/ui/use-toast";

const MealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: meal, isLoading } = useMeal(id);
  const { data: remixes = [], isLoading: remixesLoading } = useRemixes(id);
  const verifyMealMutation = useVerifyMeal();
  const fallbackAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=StruggleChef";
  const fallbackImage = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-muted-foreground font-bold">Loading meal details from Supabase...</p>
        </div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-black text-foreground mb-4">Meal Not Found</h1>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 font-bold"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Hero Image */}
        <div className="relative h-96 rounded-xl overflow-hidden mb-8">
          <img 
            src={meal.image ?? fallbackImage} 
            alt={meal.title}
            className="w-full h-full object-cover"
            onError={(event) => {
              event.currentTarget.src = fallbackImage;
              event.currentTarget.onerror = null;
            }}
          />
          {meal.isVerified && (
            <Badge className="absolute top-4 right-4 bg-struggle-verified border-0 text-foreground font-bold flex items-center gap-1 text-lg px-4 py-2">
              <CheckCircle2 className="w-5 h-5" />
              Certified Struggle
            </Badge>
          )}
        </div>

        {/* Title & Author */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            {meal.title}
          </h1>
          <div className="flex items-center gap-3">
            <img 
              src={meal.author.avatar ?? fallbackAvatar} 
              alt={meal.author.name}
              className="w-10 h-10 rounded-full"
              onError={(event) => {
                event.currentTarget.src = fallbackAvatar;
                event.currentTarget.onerror = null;
              }}
            />
            <div>
              <p className="font-bold text-foreground">@{meal.author.name}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(meal.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        {meal.description && (
          <div className="bg-card border-2 border-primary/30 rounded-lg p-4 mb-6">
            <p className="text-foreground italic text-lg">"{meal.description}"</p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border-2 border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-xs font-bold text-muted-foreground uppercase">Prep Time</span>
            </div>
            <p className="text-2xl font-black text-foreground">{meal.timeInMinutes} min</p>
          </div>

          <div className="bg-card border-2 border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <span className="text-xs font-bold text-muted-foreground uppercase">Cost</span>
            </div>
            <p className="text-2xl font-black text-foreground">${meal.estimatedCost.toFixed(2)}</p>
          </div>

          <div className="bg-card border-2 border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Utensils className="w-5 h-5 text-primary" />
              <span className="text-xs font-bold text-muted-foreground uppercase">Ingredients</span>
            </div>
            <p className="text-2xl font-black text-foreground">{meal.ingredients.length}</p>
          </div>

          <div className="bg-gradient-struggle rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-primary-foreground" />
              <span className="text-xs font-black text-primary-foreground uppercase">Score</span>
            </div>
            <p className="text-2xl font-black text-primary-foreground">{meal.struggleScore}</p>
          </div>
        </div>

        {/* Tools Used */}
        <div className="mb-8">
          <h2 className="text-2xl font-black text-foreground mb-4 flex items-center gap-2">
            🔧 Tools Used
          </h2>
          <div className="flex flex-wrap gap-2">
            {meal.tools.map((tool, idx) => (
              <Badge key={idx} variant="outline" className="border-primary text-foreground text-base px-4 py-2">
                {tool}
              </Badge>
            ))}
          </div>
        </div>

        {/* Ingredients */}
        <div className="mb-8">
          <h2 className="text-2xl font-black text-foreground mb-4 flex items-center gap-2">
            🍴 Ingredients
          </h2>
          <div className="flex flex-wrap gap-2">
            {meal.ingredients.map((ingredient, idx) => (
              <Badge key={idx} className="bg-gradient-struggle border-0 text-primary-foreground text-base px-4 py-2">
                {ingredient}
              </Badge>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="mb-8">
          <h2 className="text-2xl font-black text-foreground mb-4 flex items-center gap-2">
            📝 How to Make It
          </h2>
          <div className="space-y-4">
            {meal.steps.map((step, idx) => (
              <div key={idx} className="flex gap-4 bg-card border-2 border-border rounded-lg p-4">
                <div className="bg-gradient-struggle text-primary-foreground font-black text-xl w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </div>
                <p className="text-foreground text-lg flex-1 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Community Stats */}
        <div className="bg-card border-2 border-primary/30 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-black text-foreground mb-4">Community Stats</h2>
          <div className="flex gap-6 text-center">
            <div>
              <p className="text-3xl font-black text-primary">{meal.verifications}</p>
              <p className="text-sm text-muted-foreground">Verifications</p>
            </div>
            <div>
              <p className="text-3xl font-black text-primary">{meal.remixes}</p>
              <p className="text-sm text-muted-foreground">Remixes</p>
            </div>
          </div>
        </div>

        {/* Recent remixes */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Shuffle className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-black text-foreground">Latest Remixes</h2>
          </div>
          {remixesLoading && (
            <div className="rounded-xl border-2 border-dashed border-border p-6 flex items-center gap-3 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading remixes...
            </div>
          )}
          {!remixesLoading && remixes.length === 0 && (
            <Card className="p-6 text-center text-muted-foreground">
              No remixes yet. Be the first chaos cook to remix this meal.
            </Card>
          )}
          {!remixesLoading && remixes.length > 0 && (
            <div className="space-y-4">
              {remixes.map((remix) => (
                <Card key={remix.id} className="p-5 border-border">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <p className="text-xl font-black text-foreground">{remix.title}</p>
                      <p className="text-sm text-muted-foreground">
                        @{remix.author.name} · {new Date(remix.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className="bg-gradient-struggle border-0 text-primary-foreground">
                      {remix.ingredients.length} ingredients • {remix.timeInMinutes} min
                    </Badge>
                  </div>
                  {remix.description && (
                    <p className="mt-3 text-muted-foreground">{remix.description}</p>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="flex-1 border-primary hover:bg-primary hover:text-primary-foreground font-bold text-lg h-14"
            disabled={meal.isVerified || verifyMealMutation.isPending}
            onClick={() =>
              verifyMealMutation.mutate(
                { mealId: meal.id, verifications: meal.verifications + 1 },
                {
                  onSuccess: () => {
                    toast({
                      title: "Certified Struggle unlocked",
                      description: `${meal.title} is now verified.`,
                    });
                  },
                  onError: () => {
                    toast({
                      title: "Verification failed",
                      description: "Could not talk to Supabase. Try again.",
                    });
                  },
                },
              )
            }
          >
            {verifyMealMutation.isPending ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <CheckCircle2 className="w-5 h-5 mr-2" />
            )}
            {meal.isVerified ? "Verified" : "Verify This Meal"}
          </Button>
          <Button 
            className="flex-1 bg-gradient-struggle border-0 hover:opacity-90 font-bold text-lg h-14"
            onClick={() => navigate(`/remix/${meal.id}`)}
          >
            <Shuffle className="w-5 h-5 mr-2" />
            Make Your Struggle
          </Button>
        </div>
      </main>
    </div>
  );
};

export default MealDetail;
