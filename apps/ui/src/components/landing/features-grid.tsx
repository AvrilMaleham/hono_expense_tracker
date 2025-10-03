import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, BarChart3, Zap } from "lucide-react";

export function FeaturesGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="w-12 h-12 bg-sky-secondary rounded-lg flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6 text-sky-primary" />
          </div>
          <CardTitle>Expense Tracking</CardTitle>
          <CardDescription>
            Monitor your spending, categorize expenses, and gain insights into
            your financial habits.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="sky" className="w-full">
            <Link to="/expenses">Manage Expenses</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="w-12 h-12 bg-indigo-secondary rounded-lg flex items-center justify-center mb-4">
            <BarChart3 className="w-6 h-6 text-indigo-primary" />
          </div>
          <CardTitle>Expense Analytics</CardTitle>
          <CardDescription>
            View detailed reports, spending patterns, and financial insights
            with beautiful visualizations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="indigo" className="w-full">
            <Link to="/expenses">View Analytics</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="w-12 h-12 bg-fuchsia-secondary rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-fuchsia-primary" />
          </div>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Fast access to common tasks and shortcuts to boost your
            productivity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="fucshia" className="w-full">
            <Link to="/expenses">Quick Add</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
