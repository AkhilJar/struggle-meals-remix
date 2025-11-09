import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MealCard } from "@/components/MealCard";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Shuffle, Plus, Trash2, Upload, ChevronLeft, Loader2, Sparkles, Pencil, Flame, Trash } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  useCreateMeal,
  useCreateRemix,
  useDeleteMeal,
  useDeleteRemix,
  useMeal,
  useLatestRemixes,
  useRecentMeals,
  useRemix,
  useUpdateMeal,
  useUpdateRemix,
} from "@/hooks/use-meals";
import { toast } from "@/components/ui/use-toast";
import type { NewMealInput, NewRemixInput } from "@/types/meal";

const fallbackImage = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&auto=format&fit=crop";

type RemixDraft = {
  title?: string;
  description?: string;
  ingredients?: string[];
  tools?: string[];
  steps?: string[];
  timeInMinutes?: number;
  estimatedCost?: number;
  imageUrl?: string;
  authorName?: string;
  authorHandle?: string;
  authorAvatar?: string;
};

const Remix = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParamsRaw] = useSearchParams();
  const setSearchParams = (mutator: (params: URLSearchParams) => void) => {
    const next = new URLSearchParams(searchParams);
    mutator(next);
    setSearchParamsRaw(next);
  };
  const editingRemixId = searchParams.get("edit") ?? undefined;
  const editingMealId = searchParams.get("editMeal") ?? undefined;
  const { data: remixToEdit, isLoading: remixLoading } = useRemix(editingRemixId);
  const parentMealId = editingRemixId ? remixToEdit?.parentMealId ?? undefined : id;
  const { data: originalMeal, isLoading: mealLoading } = useMeal(parentMealId);
  const { data: editingMealData, isLoading: editingMealLoading } = useMeal(editingMealId);
  const {
    data: recentMeals = [],
    isLoading: recentMealsLoading,
    isError: recentMealsError,
    refetch: refetchRecentMeals,
  } = useRecentMeals(6);
  const { data: latestRemixes = [], isLoading: latestLoading, refetch: refetchLatest } = useLatestRemixes(6);
  const createRemixMutation = useCreateRemix();
  const createMealMutation = useCreateMeal();
  const updateMealMutation = useUpdateMeal();
  const updateRemixMutation = useUpdateRemix();
  const deleteMealMutation = useDeleteMeal();
  const deleteRemixMutation = useDeleteRemix();
  const storageKey = useMemo(() => {
    if (editingRemixId) return `remix-draft-edit-${editingRemixId}`;
    if (editingMealId) return `remix-draft-edit-meal-${editingMealId}`;
    if (parentMealId) return `remix-draft-remix-${parentMealId}`;
    return "remix-draft-new";
  }, [editingRemixId, editingMealId, parentMealId]);
  const hasHydratedDraft = useRef(false);

  useEffect(() => {
    hasHydratedDraft.current = false;
  }, [storageKey]);

  const [showForm, setShowForm] = useState(Boolean(id || editingRemixId || editingMealId));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [tools, setTools] = useState<string[]>([""]);
  const [steps, setSteps] = useState<string[]>([""]);
  const [timeInMinutes, setTimeInMinutes] = useState(5);
  const [estimatedCost, setEstimatedCost] = useState(2);
  const [imageUrl, setImageUrl] = useState("");
  const [authorName, setAuthorName] = useState("chaos_creator");
  const [authorHandle, setAuthorHandle] = useState("chaos_creator");
  const [authorAvatar, setAuthorAvatar] = useState("https://api.dicebear.com/7.x/avataaars/svg?seed=Remix");

  const [creationLabel] = useState("Make Your Struggle");
  const isEditingRemix = Boolean(editingRemixId);
  const isEditingMeal = Boolean(editingMealId);
  const isEditing = isEditingRemix || isEditingMeal;
  const isRemixContext = Boolean(parentMealId);
  const waitingOnBaseMeal = Boolean(parentMealId) && mealLoading;
  const waitingOnEditData =
    (isEditingRemix && remixLoading && !remixToEdit) || (isEditingMeal && editingMealLoading && !editingMealData);

  const hydrateDraft = (draft: RemixDraft) => {
    if (!draft) return;
    setTitle(draft.title ?? "");
    setDescription(draft.description ?? "");
    setIngredients(draft.ingredients?.length ? draft.ingredients : [""]);
    setTools(draft.tools?.length ? draft.tools : [""]);
    setSteps(draft.steps?.length ? draft.steps : [""]);
    setTimeInMinutes(draft.timeInMinutes ?? 5);
    setEstimatedCost(draft.estimatedCost ?? 2);
    setImageUrl(draft.imageUrl ?? "");
    setAuthorName(draft.authorName ?? "chaos_creator");
    setAuthorHandle(draft.authorHandle ?? "chaos_creator");
    setAuthorAvatar(draft.authorAvatar ?? "https://api.dicebear.com/7.x/avataaars/svg?seed=Remix");
  };

  useEffect(() => {
    if (typeof window === "undefined" || hasHydratedDraft.current) return;
    const raw = sessionStorage.getItem(storageKey);
    if (raw) {
      hydrateDraft(JSON.parse(raw));
      hasHydratedDraft.current = true;
      return;
    }
    if (isEditingRemix && remixToEdit) {
      hydrateDraft({
        title: remixToEdit.title,
        description: remixToEdit.description ?? "",
        ingredients: remixToEdit.ingredients ?? [""],
        tools: remixToEdit.tools ?? [""],
        steps: remixToEdit.steps ?? [""],
        timeInMinutes: remixToEdit.timeInMinutes,
        estimatedCost: remixToEdit.estimatedCost,
        imageUrl: remixToEdit.image ?? "",
        authorName: remixToEdit.author.name,
        authorHandle: remixToEdit.author.handle,
        authorAvatar: remixToEdit.author.avatar ?? "https://api.dicebear.com/7.x/avataaars/svg?seed=Remix",
      });
      hasHydratedDraft.current = true;
      return;
    }
    if (isEditingMeal && editingMealData) {
      hydrateDraft({
        title: editingMealData.title,
        description: editingMealData.description ?? "",
        ingredients: editingMealData.ingredients ?? [""],
        tools: editingMealData.tools ?? [""],
        steps: editingMealData.steps ?? [""],
        timeInMinutes: editingMealData.timeInMinutes,
        estimatedCost: editingMealData.estimatedCost,
        imageUrl: editingMealData.image ?? "",
        authorName: editingMealData.author.name,
        authorHandle: editingMealData.author.handle,
        authorAvatar: editingMealData.author.avatar ?? "https://api.dicebear.com/7.x/avataaars/svg?seed=Remix",
      });
      hasHydratedDraft.current = true;
      return;
    }
    if (originalMeal && Boolean(parentMealId)) {
      hydrateDraft({
        title: `${originalMeal.title} (Remix)`,
        description: "",
        ingredients: originalMeal.ingredients.length ? originalMeal.ingredients : [""],
        tools: originalMeal.tools.length ? originalMeal.tools : [""],
        steps: originalMeal.steps.length ? originalMeal.steps : [""],
        timeInMinutes: originalMeal.timeInMinutes || 5,
        estimatedCost: originalMeal.estimatedCost || 2,
        imageUrl: originalMeal.image ?? "",
        authorName,
        authorHandle,
        authorAvatar,
      });
      hasHydratedDraft.current = true;
    }
  }, [
    originalMeal,
    remixToEdit,
    editingMealData,
    storageKey,
    authorName,
    authorHandle,
    authorAvatar,
    isEditingRemix,
    isEditingMeal,
    parentMealId,
  ]);

  useEffect(() => {
    if (!showForm || typeof window === "undefined") return;
    const payload = {
      title,
      description,
      ingredients,
      tools,
      steps,
      timeInMinutes,
      estimatedCost,
      imageUrl,
      authorName,
      authorHandle,
      authorAvatar,
    };
    sessionStorage.setItem(storageKey, JSON.stringify(payload));
  }, [
    showForm,
    storageKey,
    title,
    description,
    ingredients,
    tools,
    steps,
    timeInMinutes,
    estimatedCost,
    imageUrl,
    authorName,
    authorHandle,
    authorAvatar,
  ]);

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

  const sanitizedIngredients = useMemo(() => ingredients.filter((item) => item.trim().length > 0), [ingredients]);
  const sanitizedTools = useMemo(() => tools.filter((item) => item.trim().length > 0), [tools]);
  const sanitizedSteps = useMemo(() => steps.filter((item) => item.trim().length > 0), [steps]);

  const resetForm = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(storageKey);
    }
    setTitle("");
    setDescription("");
    setIngredients([""]);
    setTools([""]);
    setSteps([""]);
    setTimeInMinutes(5);
    setEstimatedCost(2);
    setImageUrl("");
    setAuthorName("chaos_creator");
    setAuthorHandle("chaos_creator");
    setAuthorAvatar("https://api.dicebear.com/7.x/avataaars/svg?seed=Remix");
    hasHydratedDraft.current = false;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) {
      toast({ title: "Missing title", description: "Give your remix a name so the leaderboard can hype it." });
      return;
    }

    try {
      const struggleScore = Math.min(100, Math.max(0, Math.round(timeInMinutes + sanitizedIngredients.length * 5)));

      if (isEditingRemix && editingRemixId) {
        await updateRemixMutation.mutateAsync({
          id: editingRemixId,
          payload: {
            parentMealId: parentMealId ?? null,
            title: title.trim(),
            description,
            image: imageUrl || originalMeal?.image || null,
            ingredients: sanitizedIngredients,
            tools: sanitizedTools,
            steps: sanitizedSteps,
            timeInMinutes,
            estimatedCost,
            struggleScore,
            authorName,
            authorHandle,
            authorAvatar,
          },
        });
        toast({ title: "Remix updated", description: "Your chaos meal has fresh stats." });
        sessionStorage.removeItem(storageKey);
        setSearchParams((params) => {
          params.delete("edit");
          params.delete("editMeal");
        });
        resetForm();
        setShowForm(false);
        refetchLatest();
        return;
      }

      if (!isRemixContext && isEditingMeal && editingMealId && editingMealData) {
        const mealPayload: NewMealInput = {
          title: title.trim(),
          description,
          image: imageUrl || null,
          ingredients: sanitizedIngredients,
          tools: sanitizedTools,
          steps: sanitizedSteps,
          timeInMinutes,
          estimatedCost,
          struggleScore,
          authorName,
          authorHandle,
          authorAvatar,
          verifications: editingMealData.verifications,
          remixes: editingMealData.remixes,
          isVerified: editingMealData.isVerified,
        };
        await updateMealMutation.mutateAsync({ id: editingMealId, payload: mealPayload });
        toast({ title: "Meal updated", description: "Latest submissions refreshed." });
        sessionStorage.removeItem(storageKey);
        setSearchParams((params) => {
          params.delete("edit");
          params.delete("editMeal");
        });
        resetForm();
        setShowForm(false);
        refetchRecentMeals();
        return;
      }

      if (isRemixContext) {
        await createRemixMutation.mutateAsync({
          parentMealId: parentMealId ?? null,
          title: title.trim(),
          description,
          image: imageUrl || originalMeal?.image || null,
          ingredients: sanitizedIngredients,
          tools: sanitizedTools,
          steps: sanitizedSteps,
          timeInMinutes,
          estimatedCost,
          struggleScore,
          authorName,
          authorHandle,
          authorAvatar,
        });
        toast({
          title: "Remix posted",
          description: originalMeal ? `Your spin on ${originalMeal.title} is live.` : "New chaos meal deployed.",
        });
        sessionStorage.removeItem(storageKey);
        if (originalMeal) {
          navigate(`/meal/${originalMeal.id}`);
        } else {
          resetForm();
          setShowForm(false);
          refetchLatest();
        }
      } else {
        const mealPayload: NewMealInput = {
          title: title.trim(),
          description,
          image: imageUrl || null,
          ingredients: sanitizedIngredients,
          tools: sanitizedTools,
          steps: sanitizedSteps,
          timeInMinutes,
          estimatedCost,
          struggleScore,
          authorName,
          authorHandle,
          authorAvatar,
          verifications: 0,
          remixes: 0,
          isVerified: false,
        };
        await createMealMutation.mutateAsync(mealPayload);
        toast({
          title: "Meal posted",
          description: "Your struggle meal now tops the latest submissions.",
        });
        sessionStorage.removeItem(storageKey);
        resetForm();
        setShowForm(false);
        refetchRecentMeals();
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Supabase error",
        description: isRemixContext || isEditingRemix ? "We couldn't save that remix." : "We couldn't save that meal.",
      });
    }
  };

  const loadingMessage = isEditingRemix
    ? "Loading your remix from Supabase..."
    : isEditingMeal
      ? "Loading your meal from Supabase..."
      : "Pulling the original meal from Supabase...";

  if (waitingOnBaseMeal || waitingOnEditData) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-muted-foreground font-bold">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  const showOriginalBack = Boolean(originalMeal && isRemixContext);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          {showOriginalBack && originalMeal && (
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
              <div className="flex items-center gap-3">
                <h1 className="text-4xl md:text-5xl font-black text-transparent bg-gradient-struggle bg-clip-text">
                  {creationLabel}
                </h1>
                {isEditing && (
                  <Badge className="bg-primary text-primary-foreground border-0 font-black">
                    {isEditingRemix ? "Editing Remix" : "Editing Meal"}
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground text-lg">
                {originalMeal
                  ? `Put your own spin on ${originalMeal.title}`
                  : "Drop your own chaotic meal with whatever is in the pantry"}
              </p>
            </div>
          </div>
          {isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchParams((params) => {
                  params.delete("edit");
                  params.delete("editMeal");
                });
                resetForm();
                setShowForm(false);
              }}
            >
              Cancel Editing
            </Button>
          )}
        </div>

        {/* Original Meal Reference */}
        {id && !originalMeal && (
          <Card className="p-6 mb-8 border-2 border-destructive/40 bg-destructive/5 text-destructive">
            Couldn&apos;t find the base meal in Supabase. You can still post an original remix, or head back to the feed.
          </Card>
        )}

        {originalMeal && (
          <Card className="p-6 mb-8 border-2 border-primary/30">
            <h2 className="text-xl font-black text-foreground mb-4">Remixing from:</h2>
            <div className="flex gap-4 items-center">
              <img 
                src={originalMeal.image ?? fallbackImage} 
                alt={originalMeal.title}
                className="w-24 h-24 object-cover rounded-lg"
                onError={(event) => {
                  event.currentTarget.src = fallbackImage;
                  event.currentTarget.onerror = null;
                }}
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

        {/* Form Gate */}
        {!showForm && (
          <Card className="p-8 mb-8 text-center border-dashed border-2 border-primary/60">
            <h2 className="text-3xl font-black text-foreground mb-2">Ready to drop a remix?</h2>
            <p className="text-muted-foreground mb-6">
              Click below when you&apos;re prepped with ingredients, pics, and chaos energy. Your draft auto-saves this session.
            </p>
            <Button
              size="lg"
              className="bg-gradient-struggle border-0 font-black text-lg shadow-neon"
              onClick={() => setShowForm(true)}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {creationLabel}
            </Button>
          </Card>
        )}

        {/* Form */}
        {showForm && (
        <Card className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Image Upload */}
            <div>
              <Label className="text-lg font-bold">Meal Photo</Label>
              <div className="mt-2 border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-foreground font-bold mb-2">Click to upload your photo</p>
                <p className="text-sm text-muted-foreground">Make it look as chaotic as possible</p>
              </div>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Or drop an image URL for now"
                className="mt-3"
              />
            </div>

            {/* Author */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="authorName" className="text-lg font-bold">Creator Name</Label>
                <Input
                  id="authorName"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="authorHandle" className="text-lg font-bold">Handle</Label>
                <Input
                  id="authorHandle"
                  value={authorHandle}
                  onChange={(e) => setAuthorHandle(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="avatar" className="text-lg font-bold">Avatar URL</Label>
                <Input
                  id="avatar"
                  value={authorAvatar}
                  onChange={(e) => setAuthorAvatar(e.target.value)}
                  className="mt-2"
                />
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
              disabled={createRemixMutation.isPending || createMealMutation.isPending || updateRemixMutation.isPending}
              className="w-full bg-gradient-struggle border-0 hover:opacity-90 font-black text-xl h-16"
            >
              {createRemixMutation.isPending || createMealMutation.isPending || updateRemixMutation.isPending ? (
                <>
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Shuffle className="w-6 h-6 mr-2" />
                  Post Your Remix
                </>
              )}
            </Button>
          </form>
        </Card>
        )}

        {/* Latest Meals */}
        <section className="mt-12">
          <div className="flex items-center gap-3 mb-4">
            <Flame className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-2xl font-black text-foreground">Latest Meals</h2>
              <p className="text-muted-foreground text-sm">
                Snapshot of the home leaderboard so you can riff instantly.
              </p>
            </div>
          </div>
          {recentMealsLoading && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="h-80 rounded-xl border-2 border-dashed border-border animate-pulse bg-card/50" />
              ))}
            </div>
          )}
          {recentMealsError && (
            <Card className="p-6 border-destructive text-destructive">
              <p className="font-bold mb-4">Couldn&apos;t load the feed. Try again?</p>
              <Button variant="outline" onClick={() => refetchRecentMeals()}>
                Retry
              </Button>
            </Card>
          )}
          {!recentMealsLoading && !recentMealsError && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recentMeals.slice(0, 4).map((meal) => (
                <div key={meal.id} className="relative">
                  <MealCard meal={meal} />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="font-bold"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSearchParams((params) => {
                          params.set("editMeal", meal.id);
                          params.delete("edit");
                        });
                        setShowForm(true);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <Pencil className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="font-bold"
                      disabled={deleteMealMutation.isPending}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!confirm(`Delete ${meal.title}?`)) return;
                        deleteMealMutation.mutate(meal.id, {
                          onSuccess: () => {
                            refetchRecentMeals();
                            toast({ title: "Meal deleted", description: `${meal.title} left the board.` });
                            if (editingMealId === meal.id) {
                              setSearchParams((params) => {
                                params.delete("editMeal");
                                params.delete("edit");
                              });
                              resetForm();
                              setShowForm(false);
                            }
                          },
                          onError: () =>
                            toast({ title: "Delete failed", description: "Supabase said nope—try again later." }),
                        });
                      }}
                    >
                      <Trash className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Latest Remixes */}
        <section className="mt-12">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-black text-foreground">Fresh Remixes</h2>
          </div>
          {latestLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="h-40 rounded-xl border-2 border-dashed border-border animate-pulse bg-card/50" />
              ))}
            </div>
          )}
          {!latestLoading && latestRemixes.length === 0 && (
            <Card className="p-6 text-center text-muted-foreground border-dashed border-2">
              No remixes yet. Be the first chaos chef to submit one.
            </Card>
          )}
          {!latestLoading && latestRemixes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {latestRemixes.map((remix) => (
                <Card key={remix.id} className="p-5 flex flex-col gap-4">
                  <div className="flex gap-4">
                    <img
                      src={remix.image ?? fallbackImage}
                      alt={remix.title}
                      className="w-20 h-20 object-cover rounded-lg border border-border"
                      onError={(event) => {
                        event.currentTarget.src = fallbackImage;
                        event.currentTarget.onerror = null;
                      }}
                    />
                    <div className="flex-1">
                      <p className="text-lg font-black text-foreground">{remix.title}</p>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        @{remix.author.name} • {new Date(remix.createdAt).toLocaleDateString()}
                      </p>
                      {remix.description && (
                        <p className="text-sm text-muted-foreground mt-2">{remix.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3 flex-wrap text-xs text-muted-foreground">
                    <div>
                      <span className="font-semibold text-foreground">Tools:</span> {remix.tools.join(", ")}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-primary text-primary font-black">
                        {remix.ingredients.length} items • {remix.timeInMinutes} min
                      </Badge>
                      <a
                        href={remix.image ?? fallbackImage}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-primary underline"
                      >
                        Image URL
                      </a>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border text-xs"
                        onClick={() => {
                          if (typeof window !== "undefined") {
                            sessionStorage.removeItem(`remix-draft-edit-${remix.id}`);
                          }
                          setSearchParams((params) => {
                            params.set("edit", remix.id);
                            params.delete("editMeal");
                          });
                          setShowForm(true);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        <Pencil className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="text-xs"
                        disabled={deleteRemixMutation.isPending}
                        onClick={() => {
                          if (!confirm(`Delete remix ${remix.title}?`)) return;
                          deleteRemixMutation.mutate(remix.id, {
                            onSuccess: () => {
                              refetchLatest();
                              toast({ title: "Remix deleted", description: `${remix.title} removed.` });
                              if (editingRemixId === remix.id) {
                                setSearchParams((params) => {
                                  params.delete("edit");
                                  params.delete("editMeal");
                                });
                                resetForm();
                                setShowForm(false);
                              }
                            },
                            onError: () =>
                              toast({ title: "Delete failed", description: "Could not delete remix right now." }),
                          });
                        }}
                      >
                        <Trash className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Remix;
