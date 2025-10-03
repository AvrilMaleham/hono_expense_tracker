import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatsSection() {
  return (
    <Card className="p-8 border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">
          Platform Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-sky-primary mb-2">100%</div>
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
      </CardContent>
    </Card>
  );
}
