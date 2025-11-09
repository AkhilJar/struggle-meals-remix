import { useParams, useNavigate } from "react-router-dom";
import { MOCK_MEALS } from "@/types/meal";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  DollarSign, 
  Flame, 
  Shuffle, 
  CheckCircle2, 
  ChevronLeft,
  Utensils
} from "lucide-react";

const MealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const meal = MOCK_MEALS.find(m => m.id === id);

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
            src={meal.image} 
            alt={meal.title}
            className="w-full h-full object-cover"
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
              src={meal.author.avatar} 
              alt={meal.author.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-bold text-foreground">@{meal.author.name}</p>
              <p className="text-sm text-muted-foreground">
                {meal.createdAt.toLocaleDateString()}
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

        {/* Actions */}
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="flex-1 border-primary hover:bg-primary hover:text-primary-foreground font-bold text-lg h-14"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Verify This Meal
          </Button>
          <Button 
            className="flex-1 bg-gradient-struggle border-0 hover:opacity-90 font-bold text-lg h-14"
            onClick={() => navigate(`/remix/${meal.id}`)}
          >
            <Shuffle className="w-5 h-5 mr-2" />
            Remix This
          </Button>
        </div>
      </main>
    </div>
  );
};

export default MealDetail;
