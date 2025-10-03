import { DollarSign, BarChart3, Zap } from "lucide-react";
import { FeatureCard } from "./feature-card";

export function FeaturesGrid() {
  const features = [
    {
      icon: DollarSign,
      iconBgColor: "bg-sky-secondary",
      iconColor: "text-sky-primary",
      title: "Expense Tracking",
      description:
        "Monitor your spending, categorize expenses, and gain insights into your financial habits.",
      buttonVariant: "sky" as const,
      buttonText: "Manage Expenses",
      linkTo: "/expenses",
    },
    {
      icon: BarChart3,
      iconBgColor: "bg-indigo-secondary",
      iconColor: "text-indigo-primary",
      title: "Expense Analytics",
      description:
        "View detailed reports, spending patterns, and financial insights with beautiful visualizations.",
      buttonVariant: "indigo" as const,
      buttonText: "View Analytics",
      linkTo: "/expenses",
    },
    {
      icon: Zap,
      iconBgColor: "bg-fuchsia-secondary",
      iconColor: "text-fuchsia-primary",
      title: "Quick Actions",
      description:
        "Fast access to common tasks and shortcuts to boost your productivity.",
      buttonVariant: "fucshia" as const,
      buttonText: "Quick Add",
      linkTo: "/expenses",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  );
}
