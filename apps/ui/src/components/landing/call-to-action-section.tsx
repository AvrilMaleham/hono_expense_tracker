import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function CallToActionSection() {
  return (
    <div className="text-center mt-16">
      <h2 className="text-3xl font-bold text-foreground mb-4">
        Ready to take control of your finances?
      </h2>
      <p className="text-lg text-muted-foreground mb-8">
        Join thousands of users who are already managing their expenses
        efficiently.
      </p>
      <Button asChild size="lg" variant="indigo">
        <Link to="/expenses">Start Tracking Now</Link>
      </Button>
    </div>
  );
}
