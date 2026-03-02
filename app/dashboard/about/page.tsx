import {
  Leaf,
  CloudSun,
  MapPin,
  BarChart3,
  Bell,
  Shield,
  Globe,
  Zap,
  Heart,
} from "lucide-react"

const features = [
  {
    icon: CloudSun,
    title: "Real-Time Forecasts",
    description:
      "Get accurate weather updates with data refreshed every minute from trusted sources.",
  },
  {
    icon: MapPin,
    title: "Location Tracking",
    description:
      "Save multiple locations and switch between them to view conditions anywhere.",
  },
  {
    icon: BarChart3,
    title: "Visual Analytics",
    description:
      "Explore weekly temperature trends, pressure charts, and UV index graphs at a glance.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description:
      "Receive timely notifications for severe weather, rain forecasts, and UV warnings.",
  },
  {
    icon: Shield,
    title: "Reliable Data",
    description:
      "Powered by leading meteorological APIs ensuring precision and consistency.",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description:
      "Access weather information for any city or region across the globe instantly.",
  },
]

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "190+", label: "Countries" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9", label: "App Rating" },
]

const team = [
  { name: "Anuj Baghele", role: "Founder & CEO", initials: "AB" },
  { name: "Pranavi Baghele", role: "Lead Engineer", initials: "PB" },
  { name: "Vansh Patle", role: "UX Designer", initials: "VP" },
  { name: "Jayant Patle", role: "Data Scientist", initials: "JP" },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-8 overflow-y-auto scrollbar-none pb-8">
      {/* Hero section */}
      <section className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-8 py-10 text-center shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4a6cf7]">
          <Leaf className="h-7 w-7 text-[#ffffff]" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
          About EcoHealth
        </h1>
        <p className="max-w-lg text-sm leading-relaxed text-muted-foreground text-pretty">
          EcoHealth is a premium weather dashboard designed to deliver real-time
          forecasts, intuitive analytics, and location-based insights — all
          wrapped in a clean, modern interface that makes monitoring weather
          conditions effortless.
        </p>
        <div className="mt-2 flex items-center gap-2 rounded-xl bg-[#eef0ff] px-4 py-2 text-sm font-medium text-[#4a6cf7]">
          <Zap className="h-4 w-4" />
          Version 2.4.0
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card py-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="text-2xl font-bold text-[#4a6cf7]">
              {stat.value}
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              {stat.label}
            </span>
          </div>
        ))}
      </section>

      {/* Features */}
      <section>
        <h2 className="pb-4 text-lg font-bold text-foreground">
          Key Features
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef0ff] text-[#4a6cf7]">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section>
        <h2 className="pb-4 text-lg font-bold text-foreground">Our Team</h2>
        <div className="grid grid-cols-4 gap-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card py-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4a6cf7] text-sm font-bold text-[#ffffff]">
                {member.initials}
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">
                  {member.name}
                </p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <section className="flex items-center justify-center gap-1.5 rounded-2xl border border-border bg-card py-5 text-sm text-muted-foreground shadow-sm">
        © 2025 Environment & Health Awareness Platform — Built for community well-being 
      </section>
    </div>
  )
}
