import { Wind, CloudRain, Gauge, Sun, ArrowDown, ArrowUp, ExternalLink } from "lucide-react"

const overviewData = [
  {
    label: "Wind Speed",
    value: "12km/h",
    icon: Wind,
    change: "2km/h",
    trend: "down" as const,
  },
  {
    label: "Rain Chanse",
    value: "24%",
    icon: CloudRain,
    change: "10%",
    trend: "up" as const,
  },
  {
    label: "Pressure",
    value: "720 hpa",
    icon: Gauge,
    change: "32 hpa",
    trend: "up" as const,
  },
  {
    label: "Uv Index",
    value: "2,3",
    icon: Sun,
    change: "0,3",
    trend: "down" as const,
  },
]

export default function OverviewCards() {
  return (
    <section>
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-lg font-bold text-foreground">Today overview</h2>
        <button className="flex items-center gap-1.5 text-sm font-medium text-[#4a6cf7] hover:underline">
          More detail
          <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {overviewData.map((card) => (
          <div
            key={card.label}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
              <card.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">{card.label}</p>
              <p className="text-2xl font-bold tracking-tight text-foreground">{card.value}</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium">
              {card.trend === "down" ? (
                <ArrowDown className="h-3 w-3 text-[#ef4444]" />
              ) : (
                <ArrowUp className="h-3 w-3 text-[#4a6cf7]" />
              )}
              <span
                className={
                  card.trend === "down" ? "text-[#ef4444]" : "text-[#4a6cf7]"
                }
              >
                {card.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
