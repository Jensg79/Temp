'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TemperatureResponse } from "@/lib/types";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { format } from "date-fns";

interface TemperatureChartProps {
  data: TemperatureResponse[];
  isLoading: boolean;
}

export function TemperatureChart({ data, isLoading }: TemperatureChartProps) {
  const chartData = data.map(item => ({
    timestamp: format(new Date(item._ts), 'HH:mm'),
    temperature: item.temperature,
  }));

  const minTemp = Math.floor(Math.min(...data.map(d => d.temperature)));
  const maxTemp = Math.ceil(Math.max(...data.map(d => d.temperature)));

  return (
    <Card className="col-span-4 backdrop-blur-sm bg-card/50 border-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Temperature History</span>
          {!isLoading && (
            <span className="text-sm font-normal text-muted-foreground">
              Last 24 hours
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        {isLoading ? (
          <div className="animate-pulse h-full bg-muted rounded" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="timestamp"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[minTemp - 1, maxTemp + 1]}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°C`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-3 shadow-lg">
                        <div className="grid gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Temperature
                            </span>
                            <span className="font-bold text-foreground text-2xl">
                              {payload[0].value}°C
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Time
                            </span>
                            <span className="font-medium text-foreground">
                              {payload[0].payload.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine
                y={20}
                stroke="hsl(var(--muted-foreground))"
                strokeDasharray="3 3"
                label={{ value: "Optimal", position: "right" }}
              />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 8, strokeWidth: 2 }}
                fill="url(#temperatureGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}