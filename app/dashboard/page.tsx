import DashboardHeader from "@/components/dashboard-header"
import OverviewCards from "@/components/overview-cards"
import WeeklyChart from "@/components/weekly-chart"

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <OverviewCards />
      <WeeklyChart />
    </div>
  )
}
