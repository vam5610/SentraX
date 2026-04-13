import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import OverviewCards from "@/components/analytics/OverviewCards"
import ActivityChart from "@/components/analytics/ActivityChart"
import DistributionChart from "@/components/analytics/DistributionChart"
import TopUsersTable from "@/components/analytics/TopUsersTable"
import { ChartPie } from "lucide-react"
import { apiRequest } from "@/lib/api"
import { getToken } from "@/utils/auth"

function AnalyticsPage() {
  const [overview, setOverview] = useState({
    total: 0,
    blocked: 0,
    users: 0,
    distribution: [],
  })
  const [activityData, setActivityData] = useState([])
  const [distributionData, setDistributionData] = useState([])
  const [userData, setUserData] = useState([])
  const [warning, setWarning] = useState("")

  useEffect(() => {
    let cancelled = false
    const token = getToken()
    if (!token) {
      setWarning("Login to view analytics insights")
      return () => {
        cancelled = true
      }
    }
    async function load() {
      try {
        const [overviewPayload, activityPayload, usersPayload] = await Promise.all([
          apiRequest("/analytics/overview"),
          apiRequest("/analytics/activity"),
          apiRequest("/analytics/users"),
        ])
        if (cancelled) return
        setOverview(overviewPayload)
        setActivityData(activityPayload)
        setDistributionData(
          overviewPayload.distribution?.length ? overviewPayload.distribution : [],
        )
        setUserData(usersPayload)
        setWarning("")
      } catch (error) {
        if (!cancelled) {
          console.error("Analytics failed", error)
          setWarning("Unable to load analytics at the moment")
        }
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

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

        {warning && (
          <div className="mt-4 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-xs text-amber-100">
            {warning}
          </div>
        )}
        <div className="mt-8 space-y-6">
          <OverviewCards stats={overview} />
          <ActivityChart data={activityData} />
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
