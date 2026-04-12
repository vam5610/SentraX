import { useEffect, useMemo, useState } from "react"
import Navbar from "@/components/zero-trust/Navbar"
import AttackPanel from "@/components/zero-trust/AttackPanel"
import LogsTable from "@/components/zero-trust/LogsTable"
import DashboardCards from "@/components/zero-trust/DashboardCards"
import RiskChart from "@/components/zero-trust/RiskChart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Activity,
  Bug,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

function DashboardPage() {
  const [logs, setLogs] = useState([
    { time: "10:15", user: "admin", action: "SQL Injection", status: "BLOCKED", risk: "HIGH" },
    { time: "10:12", user: "user1", action: "View Users", status: "ALLOWED", risk: "LOW" },
    { time: "10:11", user: "devops", action: "Privilege Esc.", status: "BLOCKED", risk: "HIGH" },
    { time: "10:08", user: "service-bot", action: "Normal Query", status: "ALLOWED", risk: "LOW" },
  ])
  const [stats, setStats] = useState({
    totalQueries: 12458,
    blockedQueries: 342,
    activeUsers: 54,
    highRisk: 18,
    health: 99.9,
  })
  const navigate= useNavigate();

  const activityItems = useMemo(() => logs.slice(0, 5), [logs])

  const addLog = (entry) => {
    setLogs((prev) => [entry, ...prev].slice(0, 12))
    setStats((prev) => ({
      ...prev,
      totalQueries: prev.totalQueries + 1,
      blockedQueries:
        entry.status === "BLOCKED" ? prev.blockedQueries + 1 : prev.blockedQueries,
      highRisk: entry.risk === "HIGH" ? prev.highRisk + 1 : prev.highRisk,
    }))
  }

  const handleAction = (type) => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
    const base = { time, user: "test-user" }
    if (type === "normal") {
      addLog({ ...base, action: "Normal Query", status: "ALLOWED", risk: "LOW" })
    }
    if (type === "sql") {
      addLog({ ...base, action: "SQL Injection", status: "BLOCKED", risk: "HIGH" })
    }
    if (type === "mass") {
      addLog({ ...base, action: "Mass Delete", status: "BLOCKED", risk: "HIGH" })
    }
    if (type === "privilege") {
      addLog({ ...base, action: "Privilege Esc.", status: "BLOCKED", risk: "HIGH" })
    }
    if (type === "brute") {
      addLog({ ...base, action: "Brute Force", status: "WARN", risk: "MEDIUM" })
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
      const random = Math.random()
      if (random < 0.5) {
        addLog({ time, user: "service-bot", action: "Heartbeat Ping", status: "ALLOWED", risk: "LOW" })
      } else if (random < 0.8) {
        addLog({ time, user: "guest", action: "Brute Force", status: "WARN", risk: "MEDIUM" })
      } else {
        addLog({ time, user: "unknown", action: "SQL Injection", status: "BLOCKED", risk: "HIGH" })
      }
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Navbar />
      <main className="flex-1 space-y-6 p-6">
        <AttackPanel onAction={handleAction} />
        <DashboardCards stats={stats} />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-zinc-800 bg-zinc-950/70 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base text-white">
              Real-Time Activity Stream
            </CardTitle>
            <Badge className="bg-rose-500/15 text-rose-300 border border-rose-500/30">
              Live
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {activityItems.map((item, index) => (
              <div key={`${item.time}-${index}`} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                <div className="flex-1">
                  <p className="text-zinc-200">
                    {item.action} <span className="text-zinc-500">by</span> {item.user}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {item.time} · {item.status}
                  </p>
                </div>
                <span
                  className={`text-xs ${
                    item.risk === "HIGH"
                      ? "text-rose-300"
                      : item.risk === "MEDIUM"
                      ? "text-amber-300"
                      : "text-emerald-300"
                  }`}
                >
                  Risk: {item.risk}
                </span>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="text-sky-300" >
              View All Logs →
            </Button>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-950/70 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base text-white">Threat Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-56 rounded-xl bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_60%)]">
              <svg
                viewBox="0 0 600 300"
                className="h-full w-full text-sky-400/30"
                fill="currentColor"
              >
                <path d="M90 170l20-10 30 8 18-12 20 12 30-8 18-20 30 4 25-14 18 8 35 6 35-10 22 8 38 2 22-12 15 8 20-4 10 12 20-2 12 12-15 22-30 6-20 18-45-4-20 10-35 2-35 18-40-6-40-18-30 4-30-12-22-12z" />
              </svg>
              <span className="absolute left-20 top-20 h-3 w-3 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)]" />
              <span className="absolute left-48 top-36 h-3 w-3 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
              <span className="absolute right-24 top-28 h-3 w-3 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)]" />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
              <span>Live Attacks: 7</span>
              <span>Blocked: {stats.blockedQueries}</span>
              <span>Countries: 12</span>
            </div>
          </CardContent>
        </Card>

        <RiskChart />
      </div>

      <LogsTable logs={logs} />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-zinc-800 bg-zinc-950/70">
          <CardHeader>
            <CardTitle className="text-base text-white">
              Query Playground
            </CardTitle>
            <p className="text-xs text-zinc-400">
              Test queries against the proxy
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <pre className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-xs text-emerald-200">
              {`SELECT * FROM users
WHERE role = 'admin'
ORDER BY created_at DESC;`}
            </pre>
            <div className="flex items-center gap-2">
              <Button size="sm" className="bg-sky-500/20 text-sky-200">
                Execute Query
              </Button>
              <Button size="sm" variant="outline" className="border-zinc-700">
                Safe Mode
              </Button>
            </div>
            <div className="text-xs text-zinc-500">
              Response: 3 rows returned · 125ms
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-950/70">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base text-white">
              Top Risky Queries
            </CardTitle>
            <span className="text-xs text-zinc-500">Past 24 hours</span>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              { label: "DELETE FROM users", hits: "45 attempts", tone: "text-rose-300" },
              { label: "DROP TABLE sensitive_data", hits: "12 attempts", tone: "text-rose-300" },
              { label: "UNION SELECT password", hits: "8 attempts", tone: "text-amber-300" },
              { label: "UPDATE users SET role='admin'", hits: "6 attempts", tone: "text-amber-300" },
              { label: "SELECT * FROM financial_records", hits: "5 attempts", tone: "text-emerald-300" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className={item.tone}>{item.label}</span>
                <span className="text-xs text-zinc-500">{item.hits}</span>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="text-sky-300" onClick={() => navigate("/live-monitor")}>
              View All →
            </Button>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-950/70">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base text-white">
              Recent Alerts
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-sky-300">
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            {[
              { title: "High Risk Query Blocked", time: "10:24 AM", icon: ShieldAlert, color: "text-rose-300" },
              { title: "Brute Force Attack Detected", time: "10:23 AM", icon: Activity, color: "text-amber-300" },
              { title: "Policy Violation", time: "10:22 AM", icon: Bug, color: "text-rose-300" },
              { title: "Unusual Data Access Pattern", time: "10:21 AM", icon: ShieldCheck, color: "text-emerald-300" },
            ].map((alert) => (
              <div key={alert.title} className="flex items-center gap-3">
                <alert.icon className={`h-4 w-4 ${alert.color}`} />
                <div>
                  <p className="text-zinc-200">{alert.title}</p>
                  <p className="text-xs text-zinc-500">{alert.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      </main>
    </>
  )
}

export default DashboardPage
