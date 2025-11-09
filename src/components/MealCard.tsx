import { Meal } from "@/types/meal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, DollarSign, Flame, Shuffle, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MealCardProps {
  meal: Meal;
  rank?: number;
}

export const MealCard = ({ meal, rank }: MealCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="overflow-hidden bg-card border-border hover:shadow-neon transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/meal/${meal.id}`)}
    >
      {/* Rank Badge */}
      {rank && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-struggle text-primary-foreground font-black text-2xl w-12 h-12 rounded-full flex items-center justify-center shadow-neon">
          #{rank}
        </div>
      )}
      
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={meal.image} 
          alt={meal.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {meal.isVerified && (
          <Badge className="absolute top-4 right-4 bg-struggle-verified border-0 text-foreground font-bold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            Certified Struggle
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-2xl font-black text-foreground leading-tight">
          {meal.title}
        </h3>

        {/* Author */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <img 
            src={meal.author.avatar} 
            alt={meal.author.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm font-medium">@{meal.author.name}</span>
        </div>

        {/* Description */}
        {meal.description && (
          <p className="text-sm text-muted-foreground italic">
            "{meal.description}"
          </p>
        )}

        {/* Ingredients */}
        <div className="flex flex-wrap gap-2">
          {meal.ingredients.map((ingredient, idx) => (
            <Badge key={idx} variant="outline" className="border-primary text-foreground">
              {ingredient}
            </Badge>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-foreground font-medium">{meal.timeInMinutes} min</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="text-foreground font-medium">${meal.estimatedCost.toFixed(2)}</span>
          </div>
        </div>

        {/* Tools */}
        <div className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Tools:</span> {meal.tools.join(", ")}
        </div>

        {/* Struggle Score */}
        <div className="bg-gradient-struggle p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-black text-primary-foreground text-sm uppercase tracking-wide">
              Struggle Score™
            </span>
            <Flame className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="text-4xl font-black text-primary-foreground">
            {meal.struggleScore}
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-primary-foreground/80">
            <span>{meal.verifications} verified</span>
            <span>{meal.remixes} remixes</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            className="flex-1 border-primary hover:bg-primary hover:text-primary-foreground font-bold"
            onClick={(e) => {
              e.stopPropagation();
              // Handle verify action
            }}
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Verify
          </Button>
          <Button 
            className="flex-1 bg-gradient-struggle border-0 hover:opacity-90 font-bold"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/remix/${meal.id}`);
            }}
          >
            <Shuffle className="w-4 h-4 mr-2" />
            Remix This
          </Button>
        </div>
      </div>
    </Card>
  );
};
