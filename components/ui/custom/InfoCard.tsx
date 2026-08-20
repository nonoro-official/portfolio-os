import React from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export function InfoGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
  );
}

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  description?: string;
  link?: string;
}

export function InfoCard({ title, icon, description, link }: InfoCardProps) {
  const TitleContent = link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={title}
      className="hover:underline"
    >
      {title}
    </a>
  ) : (
    title
  );

  return (
    <Card size="sm" className="flex-row items-center gap-3 p-4 rounded-md">
      <div className="flex items-center justify-center size-8 shrink-0 bg-accent text-accent-foreground rounded-sm [&>svg]:size-4">
        {icon}
      </div>
      <div className="flex flex-col justify-center">
        <CardTitle className="text-sm font-semibold">{TitleContent}</CardTitle>
        {description && (
          <CardDescription className="font-mono text-xs mt-1 text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </div>
    </Card>
  );
}
