import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Trophy, Sparkles, Clock, Calendar } from "lucide-react";

const Challenge = () => {
  const currentChallenge = {
    title: "Crispy, Creamy, and Under $5",
    description: "Create a meal that combines crunchy and creamy textures. Must use at least one dairy product and cost less than $5 total.",
    endsIn: "3 days",
    prize: "Top 3 get Certified Struggle badge",
    submissions: 24
  };

  const topSubmissions = [
    {
      id: 1,
      title: "Crushed Dorito Mac n' Cheese",
      author: "chip_master_3000",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
      votes: 127
    },
    {
      id: 2,
      title: "Cream Cheese Ramen Crunch",
      author: "noodle_ninja",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80",
      votes: 98
    },
    {
      id: 3,
      title: "Yogurt & Granola Quesadilla",
      author: "breakfast_rebel",
      image: "https://images.unsplash.com/photo-1626790680787-de5e9a07bcf2?w=800&q=80",
      votes: 76
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-struggle p-4 rounded-full mb-4">
            <Trophy className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-gradient-struggle bg-clip-text mb-4">
            Challenge of the Week
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compete with the community to create the best struggle meal based on this week's theme
          </p>
        </div>

        {/* Current Challenge */}
        <Card className="p-8 mb-12 border-4 border-primary shadow-neon">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <Badge className="bg-gradient-struggle border-0 text-primary-foreground mb-4 text-lg px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Active Challenge
              </Badge>
              <h2 className="text-4xl font-black text-foreground mb-4">
                {currentChallenge.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {currentChallenge.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-card border-2 border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-xs font-bold text-muted-foreground uppercase">Time Left</span>
              </div>
              <p className="text-2xl font-black text-foreground">{currentChallenge.endsIn}</p>
            </div>

            <div className="bg-card border-2 border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-primary" />
                <span className="text-xs font-bold text-muted-foreground uppercase">Prize</span>
              </div>
              <p className="text-lg font-black text-foreground">{currentChallenge.prize}</p>
            </div>

            <div className="bg-card border-2 border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-xs font-bold text-muted-foreground uppercase">Submissions</span>
              </div>
              <p className="text-2xl font-black text-foreground">{currentChallenge.submissions}</p>
            </div>
          </div>

          <Button 
            size="lg" 
            className="w-full bg-gradient-struggle border-0 hover:opacity-90 font-black text-xl h-16"
          >
            Submit Your Entry
          </Button>
        </Card>

        {/* Top Submissions */}
        <div className="mb-12">
          <h2 className="text-3xl font-black text-foreground mb-6 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-primary" />
            Leading Entries
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topSubmissions.map((submission, idx) => (
              <Card key={submission.id} className="overflow-hidden border-border hover:shadow-neon transition-all duration-300">
                {/* Rank Badge */}
                <div className="absolute top-4 left-4 z-10 bg-gradient-struggle text-primary-foreground font-black text-xl w-10 h-10 rounded-full flex items-center justify-center shadow-neon">
                  #{idx + 1}
                </div>

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={submission.image} 
                    alt={submission.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-xl font-black text-foreground mb-2">
                    {submission.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    by @{submission.author}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary text-primary-foreground font-bold text-lg">
                      {submission.votes} votes
                    </Badge>
                    <Button variant="outline" size="sm" className="font-bold">
                      Vote
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <Card className="p-8 bg-gradient-hero">
          <h2 className="text-3xl font-black text-foreground mb-6 text-center">
            How Challenges Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gradient-struggle text-primary-foreground font-black text-3xl w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="font-black text-foreground mb-2">Create</h3>
              <p className="text-muted-foreground">
                Make a meal that fits the weekly theme and requirements
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-struggle text-primary-foreground font-black text-3xl w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="font-black text-foreground mb-2">Submit</h3>
              <p className="text-muted-foreground">
                Upload your photo, ingredients list, and steps
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-struggle text-primary-foreground font-black text-3xl w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="font-black text-foreground mb-2">Win</h3>
              <p className="text-muted-foreground">
                Get votes from the community and earn badges
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Challenge;
