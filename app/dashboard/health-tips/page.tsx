"use client"

import DashboardHeader from "@/components/dashboard-header"
import HealthTips from "@/components/health-tips"
import { Wind, Gauge, Sun, CloudRain, ExternalLink, TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"

const environmentData = [
  { icon: Wind, label: "Wind Speed", value: "12km/h", change: "2km/h", trend: "down" as const, iconBg: "bg-slate-100" },
  { icon: CloudRain, label: "Rain Chance", value: "24%", change: "10%", trend: "up" as const, iconBg: "bg-blue-50" },
  { icon: Gauge, label: "Pressure", value: "720 hpa", change: "32 hpa", trend: "up" as const, iconBg: "bg-slate-100" },
  { icon: Sun, label: "UV Index", value: "2.3", change: "0.3", trend: "down" as const, iconBg: "bg-amber-50" },
]

export default function HealthTipsPage() {
  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader />

      {/* Today Overview */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Today overview</h2>
          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-sm font-medium text-primary"
          >
            More detail
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {environmentData.map((item) => (
            <Card key={item.label} className="shadow-sm">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-full", item.iconBg)}>
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-xl font-bold">{item.value}</p>
                  </div>
                </div>

                <div className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  item.trend === "up" ? "text-emerald-500" : "text-red-500"
                )}>
                  {item.trend === "up"
                    ? <TrendingUp className="h-3.5 w-3.5" />
                    : <TrendingDown className="h-3.5 w-3.5" />
                  }
                  {item.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Health Tips */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Environment Health Tips</h2>
          <span className="text-sm text-muted-foreground">
            Based on current conditions
          </span>
        </div>
        <HealthTips />
      </section>
    </div>
  )
}