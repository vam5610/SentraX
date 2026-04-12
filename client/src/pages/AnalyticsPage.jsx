import { useState } from "react"
import { Card } from "@/components/ui/card"
import OverviewCards from "@/components/analytics/OverviewCards"
import ActivityChart from "@/components/analytics/ActivityChart"
import DistributionChart from "@/components/analytics/DistributionChart"
import TopUsersTable from "@/components/analytics/TopUsersTable"
import { ChartPie } from "lucide-react"

const chartData = [
  { day: "Mon", total: 600, blocked: 400 },
  { day: "Tue", total: 800, blocked: 550 },
  { day: "Wed", total: 900, blocked: 600 },
  { day: "Thu", total: 1000, blocked: 700 },
  { day: "Fri", total: 850, blocked: 650 },
  { day: "Sat", total: 1100, blocked: 850 },
  { day: "Sun", total: 700, blocked: 600 },
]

const distributionData = [
  { name: "SQL Injection", value: 38 },
  { name: "Suspicious DELETE", value: 33 },
  { name: "Unauthorized Access", value: 19 },
  { name: "Other", value: 10 },
]

const userData = [
  { username: "JohnDoe", role: "user", queries: 230, blocked: 24 },
  { username: "JaneSmith", role: "user", queries: 185, blocked: 18 },
  { username: "AdminUser", role: "admin", queries: 173, blocked: 5 },
  { username: "Guest123", role: "guest", queries: 98, blocked: 4 },
]

function AnalyticsPage() {
  const [overview] = useState({
    total: 4872,
    blocked: 352,
    users: 658,
  })

  return (
    <div className="flex flex-1 items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_rgba(2,6,23,0.9)_50%,_rgba(2,6,23,0.98)_70%)] p-6">
      <Card className="w-full max-w-5xl rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-[0_0_40px_rgba(15,23,42,0.75)]">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-3 text-white">
            <ChartPie className="h-10 w-10 text-sky-400 drop-shadow-[0_0_14px_rgba(56,189,248,0.6)]" />
            <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
          </div>
          <p className="text-sm text-zinc-400">
            Security insights and system activity overview
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <OverviewCards stats={overview} />

          <ActivityChart data={chartData} />

          <div className="grid gap-6 lg:grid-cols-2">
            <DistributionChart data={distributionData} />
            <TopUsersTable users={userData} />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default AnalyticsPage
