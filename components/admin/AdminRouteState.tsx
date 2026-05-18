import { AlertTriangle } from "lucide-react";
import type { ReactElement } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminRouteStateProps {
  description: string;
  message: string;
  title: string;
  variant?: "crimson" | "outline";
}

export default function AdminRouteState({
  description,
  message,
  title,
  variant = "outline",
}: AdminRouteStateProps): ReactElement {
  return (
    <div className="mx-auto max-w-4xl">
      <Card className={variant === "crimson" ? "border-[#a83d3d]/30 bg-[#a83d3d]/10" : undefined}>
        <CardHeader>
          <Badge variant={variant}>{title}</Badge>
          <CardTitle className="mt-4 flex items-center gap-3">
            <AlertTriangle className={variant === "crimson" ? "h-6 w-6 text-[#f2a7a7]" : "h-6 w-6 text-gold-light"} />
            {message}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed text-dicon-muted">
            The admin session is active, but this section could not load the underlying data right now.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}