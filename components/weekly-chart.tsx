"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceDot,
  Label,
} from "recharts"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { toast } from "sonner"

const data = [
  { week: "Week 1", temp: 10 },
  { week: "Week 2", temp: 14 },
  { week: "Week 3", temp: 23 },
  { week: "Week 4", temp: 18 },
]

export default function WeeklyChart() {
  const [location, setLocation] = useState("Nagpur, Maharashtra")

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation)
    toast.success(`Location changed to ${newLocation}`)
  }

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-lg font-bold text-foreground">
          Average Weekly Temperature
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-[#4a6cf7] transition-colors hover:bg-secondary">
              {location}
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {["Nagpur, Maharashtra", "Mumbai, Maharashtra", "Pune, Maharashtra", "Delhi, NCR"].map((loc) => (
              <DropdownMenuItem key={loc} onClick={() => handleLocationChange(loc)}>
                {loc}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4a6cf7" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#4a6cf7" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
              dy={8}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}\u00b0`}
              domain={[8, 30]}
              ticks={[10, 15, 20, 25, 30]}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                fontSize: 13,
                padding: "8px 14px",
                backgroundColor: "#ffffff",
                color: "#1a1d2e",
              }}
              formatter={(value: number) => [`${value}\u00b0C`, "Temperature"]}
            />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#4a6cf7"
              strokeWidth={2.5}
              fill="url(#tempGradient)"
              dot={{
                r: 4,
                fill: "#4a6cf7",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: "#4a6cf7",
                stroke: "#ffffff",
                strokeWidth: 3,
              }}
            />
            <ReferenceDot x="Week 3" y={23} r={6} fill="#4a6cf7" stroke="#ffffff" strokeWidth={3}>
              <Label
                value="23° C"
                position="top"
                offset={12}
                style={{ fontSize: 12, fontWeight: 600, fill: "#4a6cf7" }}
              />
            </ReferenceDot>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
