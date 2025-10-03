import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Welcome to Your
            <span className="text-primary"> Personal Hub</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A comprehensive platform to manage your personal life, track
            expenses, and stay organized. Everything you need in one place.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" variant="transport">
              <Link to="/expenses">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/expenses">Manage Expenses</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-sky-secondary rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-sky-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <CardTitle>Expense Tracking</CardTitle>
              <CardDescription>
                Monitor your spending, categorize expenses, and gain insights
                into your financial habits.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="transport" className="w-full">
                <Link to="/expenses">Manage Expenses</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-secondary rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-indigo-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <CardTitle>Expense Analytics</CardTitle>
              <CardDescription>
                View detailed reports, spending patterns, and financial insights
                with beautiful visualizations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="housing" className="w-full">
                <Link to="/expenses">View Analytics</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-fuchsia-secondary rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-fuchsia-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Fast access to common tasks and shortcuts to boost your
                productivity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="other" className="w-full">
                <Link to="/expenses">Quick Add</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-card rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8 text-card-foreground">
            Platform Overview
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-sky-primary mb-2">
                100%
              </div>
              <div className="text-muted-foreground">Secure & Private</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-primary mb-2">
                24/7
              </div>
              <div className="text-muted-foreground">Always Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-fuchsia-primary mb-2">
                ∞
              </div>
              <div className="text-muted-foreground">Unlimited Features</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to take control of your finances?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who are already managing their expenses
            efficiently.
          </p>
          <Button asChild size="lg" variant="housing">
            <Link to="/expenses">Start Tracking Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
