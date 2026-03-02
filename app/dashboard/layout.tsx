import Sidebar from "@/components/sidebar"
import WeatherPanel from "@/components/weather-panel"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto scrollbar-none px-8 py-6">{children}</div>
        <WeatherPanel />
      </main>
    </div>
  )
}
