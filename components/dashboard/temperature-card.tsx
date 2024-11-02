'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThermometerIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TemperatureCardProps {
  temperature: number | null;
  isLoading: boolean;
}

export function TemperatureCard({ temperature, isLoading }: TemperatureCardProps) {
  const getTemperatureColor = (temp: number) => {
    if (temp >= 30) return 'text-red-500';
    if (temp >= 25) return 'text-orange-500';
    if (temp >= 20) return 'text-yellow-500';
    if (temp >= 15) return 'text-green-500';
    return 'text-blue-500';
  };

  return (
    <Card className="backdrop-blur-sm bg-card/50 border-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Current Temperature</CardTitle>
        <ThermometerIcon className={cn(
          "h-5 w-5 transition-colors duration-200",
          temperature ? getTemperatureColor(temperature) : "text-muted-foreground"
        )} />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <div className="animate-pulse h-9 bg-muted rounded" />
            <div className="animate-pulse h-4 w-24 bg-muted rounded" />
          </div>
        ) : (
          <div className="space-y-1">
            <div className={cn(
              "text-3xl font-bold tracking-tighter transition-colors duration-200",
              temperature ? getTemperatureColor(temperature) : ""
            )}>
              {temperature !== null ? `${temperature.toFixed(1)}°C` : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}