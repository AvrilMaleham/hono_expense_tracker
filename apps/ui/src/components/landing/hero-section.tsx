import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold text-foreground mb-6">
        Welcome to Your
        <span className="text-primary"> Personal Hub</span>
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        A comprehensive platform to manage your personal life, track expenses,
        and stay organized. Everything you need in one place.
      </p>
      <div className="flex gap-4 justify-center">
        <Button asChild size="lg" variant="sky">
          <Link to="/expenses">Get Started</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/expenses">Manage Expenses</Link>
        </Button>
      </div>
    </div>
  );
}
