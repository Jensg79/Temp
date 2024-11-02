'use client';

import { useTemperature } from "@/hooks/use-temperature";
import { TemperatureCard } from "@/components/dashboard/temperature-card";
import { TemperatureChart } from "@/components/dashboard/temperature-chart";
import { Button } from "@/components/ui/button";
import { RefreshCwIcon, ThermometerIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Home() {
  const { data, history, error, isLoading, refetch } = useTemperature();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <main className="flex min-h-screen flex-col p-4 md:p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <ThermometerIcon className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Temperature Monitor</h1>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => refetch()}
            disabled={isLoading}
            className="relative overflow-hidden transition-all hover:border-primary"
          >
            <RefreshCwIcon className={`h-4 w-4 transition-all duration-500 ${isLoading ? 'animate-spin' : 'hover:scale-110'}`} />
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-8 animate-in slide-in-from-top-2">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <TemperatureCard
            temperature={data?.temperature ?? null}
            isLoading={isLoading}
          />
        </div>

        <TemperatureChart data={history} isLoading={isLoading} />
      </main>
    </div>
  );
}