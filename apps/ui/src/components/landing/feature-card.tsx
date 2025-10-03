import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  title: string;
  description: string;
  buttonVariant: "sky" | "indigo" | "fucshia";
  buttonText: string;
  linkTo: string;
}

export function FeatureCard({
  icon: Icon,
  iconBgColor,
  iconColor,
  title,
  description,
  buttonVariant,
  buttonText,
  linkTo,
}: FeatureCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div
          className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center mb-4`}
        >
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild variant={buttonVariant} className="w-full">
          <Link to={linkTo}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
