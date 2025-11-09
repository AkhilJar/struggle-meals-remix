import { useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, Crown, Flame, ArrowUpRight, Share2, Bot } from "lucide-react";
import { MOCK_FRIENDS, MOCK_GEMINI_MATCHUPS } from "@/types/friend";

const Dashboard = () => {
  const rankedFriends = useMemo(
    () => [...MOCK_FRIENDS].sort((a, b) => b.struggleScore - a.struggleScore),
    [],
  );

  const totalVerified = rankedFriends.reduce((sum, friend) => sum + friend.verifiedMeals, 0);
  const totalRemixes = rankedFriends.reduce((sum, friend) => sum + friend.remixes, 0);
  const weeklyWins = rankedFriends.reduce((sum, friend) => sum + friend.weeklyWins, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8 space-y-10">
        {/* Hero */}
        <section className="bg-gradient-hero border-4 border-primary rounded-3xl p-8 text-center shadow-neon">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-struggle text-primary-foreground">
            <Users className="h-8 w-8" />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
            Struggle Partner Mode
          </p>
          <h1 className="mb-4 text-4xl font-black text-foreground md:text-5xl">
            Friend Leaderboard + Gemini Match-Ups
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Track who is carrying the squad, auto-generate duo prompts with Google Gemini, and lock in the
            next chaotic collab.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button className="bg-gradient-struggle text-base font-black text-primary-foreground shadow-neon" size="lg">
              Invite Struggle Partner
            </Button>
            <Button variant="outline" className="border-2 border-primary font-black" size="lg">
              View Remix Tree
            </Button>
          </div>
        </section>

        {/* Team Stats */}
        <section className="grid gap-6 md:grid-cols-3">
          <Card className="border-2 border-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Squad Struggle Score
              </CardTitle>
              <Flame className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-black text-foreground">
                {rankedFriends.reduce((sum, friend) => sum + friend.struggleScore, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Cumulative rating across your partner circle</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Certified Remixes
              </CardTitle>
              <Crown className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-black text-foreground">{totalRemixes}</p>
              <p className="text-sm text-muted-foreground">Total duo remixes that hit the feed</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Weekly Wins
              </CardTitle>
              <Sparkles className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-black text-foreground">{weeklyWins}</p>
              <p className="text-sm text-muted-foreground">{totalVerified} verified collabs this month</p>
            </CardContent>
          </Card>
        </section>

        {/* Leaderboard + Gemini */}
        <section className="grid gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-4 border-primary">
            <CardHeader className="pb-8">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl font-black">Friend Leaderboard</CardTitle>
                  <CardDescription className="text-base font-semibold text-muted-foreground">
                    Ranked by Struggle Score™, verifications, and remix assists
                  </CardDescription>
                </div>
                <Badge className="bg-gradient-struggle text-primary-foreground border-0 px-4 py-1 text-sm font-black">
                  Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {rankedFriends.map((friend, index) => (
                <div
                  key={friend.id}
                  className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card/70 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-struggle font-black text-primary-foreground">
                      #{index + 1}
                    </div>
                    <img src={friend.avatar} alt={friend.name} className="h-12 w-12 rounded-full border-2 border-primary" />
                    <div>
                      <p className="text-lg font-black text-foreground">{friend.name}</p>
                      <p className="text-sm text-muted-foreground">@{friend.handle}</p>
                    </div>
                  </div>

              <div className="flex flex-1 flex-wrap items-center justify-end gap-6 text-sm font-semibold">
                    <div className="text-center">
                      <p className="text-2xl font-black text-foreground">{friend.struggleScore}</p>
                      <p className="text-muted-foreground text-xs uppercase tracking-widest">Score</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-black text-foreground">{friend.verifiedMeals}</p>
                      <p className="text-muted-foreground text-xs uppercase tracking-widest">Verified</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-black text-foreground">{friend.remixes}</p>
                      <p className="text-muted-foreground text-xs uppercase tracking-widest">Remixes</p>
                    </div>
                    <Badge variant="outline" className="border-primary text-xs font-black uppercase tracking-wider">
                      {friend.partnerLevel}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-struggle text-primary-foreground shadow-neon">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-3xl font-black">Gemini Match-Ups</CardTitle>
                  <CardDescription className="text-base text-primary-foreground/80">
                    AI prompts to spark the next chaos cook-off
                  </CardDescription>
                </div>
                <Sparkles className="h-10 w-10" />
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {MOCK_GEMINI_MATCHUPS.map((match) => (
                <div key={match.id} className="rounded-2xl bg-primary-foreground/10 p-4">
                  <p className="text-lg font-black">{match.headline}</p>
                  <p className="text-sm text-primary-foreground/80">{match.pitch}</p>
                  <p className="mt-3 rounded-lg bg-primary-foreground/15 p-3 text-sm font-semibold italic">{match.action}</p>
                  <div className="mt-3 space-y-2">
                    {match.ingredients.map((ingredient) => (
                      <div key={ingredient.friend} className="flex flex-wrap gap-2 text-sm">
                        <Badge className="bg-primary-foreground text-primary font-black">{ingredient.friend}</Badge>
                        {ingredient.items.map((item) => (
                          <Badge key={item} variant="outline" className="border-primary bg-primary-foreground/10 text-primary-foreground">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-widest text-primary-foreground/70">{match.bonus}</p>
                </div>
              ))}
              <div className="flex flex-col gap-3 rounded-2xl border border-primary-foreground/40 p-4">
                <p className="text-sm text-primary-foreground/80">
                  Hook this card up to the Google Gemini API to auto-refresh prompts whenever your friends update
                  their pantry drops in Supabase.
                </p>
                <Button
                  variant="outline"
                  className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 font-black"
                >
                  <Bot className="mr-2 h-4 w-4" />
                  Connect Gemini
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Partner highlights */}
        <section className="grid gap-6 lg:grid-cols-2">
          {rankedFriends.slice(0, 2).map((friend) => (
            <Card key={friend.id} className="border-2 border-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="flex items-center gap-4">
                  <img src={friend.avatar} alt={friend.name} className="h-14 w-14 rounded-full border-2 border-primary" />
                  <div>
                    <CardTitle className="text-2xl font-black">{friend.name}</CardTitle>
                    <CardDescription className="text-base font-semibold">@{friend.handle}</CardDescription>
                  </div>
                </div>
                <Badge className="bg-gradient-struggle text-primary-foreground border-0 px-4 py-1 font-black">
                  {friend.partnerLevel}
                </Badge>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border p-4">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Current specialty</p>
                  <p className="text-lg font-bold text-foreground">{friend.specialty}</p>
                  <p className="mt-2 text-sm text-muted-foreground">Last remix: {friend.lastRemix}</p>
                </div>
                <div className="rounded-2xl border border-border p-4">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Pantry flex</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {friend.pantryHighlights.map((item) => (
                      <Badge key={item} variant="outline" className="border-primary text-foreground">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <div className="flex flex-wrap items-center justify-between gap-4 p-6 pt-0">
                <p className="text-sm text-muted-foreground">Gemini will use these pantry receipts for the next prompt.</p>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-primary font-black">
                    <Share2 className="mr-2 h-4 w-4" />
                    Ping Partner
                  </Button>
                  <Button className="bg-gradient-struggle font-black text-primary-foreground">
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    Queue Remix
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
