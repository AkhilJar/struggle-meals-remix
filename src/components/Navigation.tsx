import { Home, Trophy, Shuffle } from "lucide-react";
import { NavLink } from "./NavLink";

export const Navigation = () => {
  return (
    <nav className="bg-card border-b-2 border-primary sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink 
            to="/" 
            className="text-2xl md:text-3xl font-black text-transparent bg-gradient-struggle bg-clip-text"
          >
            Struggle Meals
          </NavLink>
          
          <div className="flex items-center gap-6">
            <NavLink 
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold"
              activeClassName="text-primary"
            >
              <Home className="w-5 h-5" />
              <span className="hidden md:inline">Home</span>
            </NavLink>
            
            <NavLink 
              to="/challenge"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold"
              activeClassName="text-primary"
            >
              <Trophy className="w-5 h-5" />
              <span className="hidden md:inline">Challenge</span>
            </NavLink>
            
            <NavLink 
              to="/remix"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold"
              activeClassName="text-primary"
            >
              <Shuffle className="w-5 h-5" />
              <span className="hidden md:inline">Remix</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
