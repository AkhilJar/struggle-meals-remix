import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useNavigate } from "react-router-dom";
import { MOCK_MEALS } from "@/types/meal";
import { Shuffle, Plus, Trash2, Upload, ChevronLeft } from "lucide-react";
import { useState } from "react";

const Remix = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const originalMeal = id ? MOCK_MEALS.find(m => m.id === id) : null;

  const [title, setTitle] = useState(originalMeal ? `${originalMeal.title} (Remix)` : "");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<string[]>(originalMeal?.ingredients || [""]);
  const [tools, setTools] = useState<string[]>(originalMeal?.tools || [""]);
  const [steps, setSteps] = useState<string[]>(originalMeal?.steps || [""]);
  const [timeInMinutes, setTimeInMinutes] = useState(originalMeal?.timeInMinutes || 5);
  const [estimatedCost, setEstimatedCost] = useState(originalMeal?.estimatedCost || 2);

  const addIngredient = () => setIngredients([...ingredients, ""]);
  const removeIngredient = (idx: number) => setIngredients(ingredients.filter((_, i) => i !== idx));
  const updateIngredient = (idx: number, value: string) => {
    const updated = [...ingredients];
    updated[idx] = value;
    setIngredients(updated);
  };

  const addTool = () => setTools([...tools, ""]);
  const removeTool = (idx: number) => setTools(tools.filter((_, i) => i !== idx));
  const updateTool = (idx: number, value: string) => {
    const updated = [...tools];
    updated[idx] = value;
    setTools(updated);
  };

  const addStep = () => setSteps([...steps, ""]);
  const removeStep = (idx: number) => setSteps(steps.filter((_, i) => i !== idx));
  const updateStep = (idx: number, value: string) => {
    const updated = [...steps];
    updated[idx] = value;
    setSteps(updated);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          {originalMeal && (
            <Button 
              variant="ghost" 
              onClick={() => navigate(`/meal/${originalMeal.id}`)}
              className="mb-4 font-bold"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Original
            </Button>
          )}
          
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-struggle p-4 rounded-full">
              <Shuffle className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-gradient-struggle bg-clip-text">
                {originalMeal ? "Remix This Meal" : "Create Remix"}
              </h1>
              <p className="text-muted-foreground text-lg">
                Put your own spin on {originalMeal ? originalMeal.title : "a struggle meal"}
              </p>
            </div>
          </div>
        </div>

        {/* Original Meal Reference */}
        {originalMeal && (
          <Card className="p-6 mb-8 border-2 border-primary/30">
            <h2 className="text-xl font-black text-foreground mb-4">Remixing from:</h2>
            <div className="flex gap-4 items-center">
              <img 
                src={originalMeal.image} 
                alt={originalMeal.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-2xl font-black text-foreground">{originalMeal.title}</h3>
                <p className="text-muted-foreground">by @{originalMeal.author.name}</p>
                <Badge className="mt-2 bg-gradient-struggle border-0 text-primary-foreground">
                  {originalMeal.remixes} remixes
                </Badge>
              </div>
            </div>
          </Card>
        )}

        {/* Form */}
        <Card className="p-8">
          <form className="space-y-6">
            {/* Image Upload */}
            <div>
              <Label className="text-lg font-bold">Meal Photo</Label>
              <div className="mt-2 border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-foreground font-bold mb-2">Click to upload your photo</p>
                <p className="text-sm text-muted-foreground">Make it look as chaotic as possible</p>
              </div>
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-lg font-bold">Meal Title</Label>
              <Input 
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your remix a creative name"
                className="mt-2 text-lg font-bold"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-lg font-bold">Description</Label>
              <Textarea 
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What makes your version different? Any pro tips?"
                className="mt-2"
                rows={3}
              />
            </div>

            {/* Time & Cost */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="time" className="text-lg font-bold">🕒 Prep Time (minutes)</Label>
                <Input 
                  id="time"
                  type="number"
                  value={timeInMinutes}
                  onChange={(e) => setTimeInMinutes(Number(e.target.value))}
                  className="mt-2 text-lg font-bold"
                />
              </div>
              <div>
                <Label htmlFor="cost" className="text-lg font-bold">💰 Estimated Cost ($)</Label>
                <Input 
                  id="cost"
                  type="number"
                  step="0.50"
                  value={estimatedCost}
                  onChange={(e) => setEstimatedCost(Number(e.target.value))}
                  className="mt-2 text-lg font-bold"
                />
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <Label className="text-lg font-bold">🍴 Ingredients</Label>
              <div className="mt-2 space-y-2">
                {ingredients.map((ingredient, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input 
                      value={ingredient}
                      onChange={(e) => updateIngredient(idx, e.target.value)}
                      placeholder="e.g., Hot Cheetos"
                      className="flex-1"
                    />
                    {ingredients.length > 1 && (
                      <Button 
                        type="button"
                        variant="outline" 
                        size="icon"
                        onClick={() => removeIngredient(idx)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={addIngredient}
                  className="w-full font-bold"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Ingredient
                </Button>
              </div>
            </div>

            {/* Tools */}
            <div>
              <Label className="text-lg font-bold">🔧 Tools Used</Label>
              <div className="mt-2 space-y-2">
                {tools.map((tool, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input 
                      value={tool}
                      onChange={(e) => updateTool(idx, e.target.value)}
                      placeholder="e.g., Microwave, Spoon"
                      className="flex-1"
                    />
                    {tools.length > 1 && (
                      <Button 
                        type="button"
                        variant="outline" 
                        size="icon"
                        onClick={() => removeTool(idx)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={addTool}
                  className="w-full font-bold"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Tool
                </Button>
              </div>
            </div>

            {/* Steps */}
            <div>
              <Label className="text-lg font-bold">📝 Steps to Make It</Label>
              <div className="mt-2 space-y-3">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-2">
                    <div className="bg-gradient-struggle text-primary-foreground font-black text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      {idx + 1}
                    </div>
                    <Textarea 
                      value={step}
                      onChange={(e) => updateStep(idx, e.target.value)}
                      placeholder="Describe this step..."
                      className="flex-1"
                      rows={2}
                    />
                    {steps.length > 1 && (
                      <Button 
                        type="button"
                        variant="outline" 
                        size="icon"
                        onClick={() => removeStep(idx)}
                        className="flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={addStep}
                  className="w-full font-bold"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Step
                </Button>
              </div>
            </div>

            {/* Submit */}
            <Button 
              type="submit"
              size="lg"
              className="w-full bg-gradient-struggle border-0 hover:opacity-90 font-black text-xl h-16"
            >
              <Shuffle className="w-6 h-6 mr-2" />
              Post Your Remix
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default Remix;
