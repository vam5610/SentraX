import { NavLink, Outlet } from "react-router-dom"
import { Activity, Bug, ChartPie, ShieldAlert, ShieldCheck, Terminal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import AuthGate from "@/components/zero-trust/AuthGate"
import { getUserRole, logout } from "@/utils/auth"

const navLinkBase =
  "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm"

function DashboardLayout() {
  const role = getUserRole()
  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 border-r border-zinc-800 bg-zinc-950/80 p-6 lg:block">
          <div className="mb-8">
            <p className="text-sm font-semibold text-white">ZeroTrust Proxy</p>
            <p className="text-xs text-zinc-500">Secure Data Access Layer</p>
          </div>
          <nav className="space-y-2 text-sm text-zinc-400">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${navLinkBase} ${
                  isActive
                    ? "bg-sky-500/15 text-sky-200"
                    : "text-zinc-400 transition hover:bg-zinc-900/70"
                }`
              }
            >
              <Activity className="h-4 w-4" /> Dashboard
            </NavLink>
            <NavLink
              to="/live-monitor"
              className={({ isActive }) =>
                `${navLinkBase} ${
                  isActive
                    ? "bg-sky-500/15 text-sky-200"
                    : "text-zinc-400 transition hover:bg-zinc-900/70"
                }`
              }
            >
              <ShieldCheck className="h-4 w-4" /> Live Monitor
            </NavLink>
            <NavLink
              to="/attack-lab"
              className={({ isActive }) =>
                `${navLinkBase} ${
                  isActive
                    ? "bg-rose-500/15 text-rose-200"
                    : "text-zinc-400 transition hover:bg-zinc-900/70"
                }`
              }
            >
              <Bug className="h-4 w-4" /> Attack Lab
              <Badge className="ml-auto bg-rose-500/20 text-rose-300">New</Badge>
            </NavLink>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `${navLinkBase} ${
                  isActive
                    ? "bg-sky-500/15 text-sky-200"
                    : "text-zinc-400 transition hover:bg-zinc-900/70"
                }`
              }
            >
              <ChartPie className="h-4 w-4" /> Analytics
            </NavLink>
            {role === "admin" && (
              <NavLink
                to="/policy-engine"
                className={({ isActive }) =>
                  `${navLinkBase} ${
                    isActive
                      ? "bg-sky-500/15 text-sky-200"
                      : "text-zinc-400 transition hover:bg-zinc-900/70"
                  }`
                }
              >
                <Terminal className="h-4 w-4" /> Policy Engine
              </NavLink>
            )}
          </nav>
          <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 text-xs text-zinc-400">
            <p className="mb-2 font-semibold text-zinc-200">System Status</p>
            <p className="text-emerald-400">Healthy</p>
            <p className="mt-3">Uptime: 7d 12h</p>
            <p>Version: 1.0.0</p>
          </div>
        </aside>

        <div className="flex flex-1 flex-col">
          <div className="flex flex-col-reverse gap-3 border-b border-zinc-800 bg-zinc-950/60 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <ShieldAlert className="h-4 w-4 text-emerald-300" />
              Signed in as <span className="font-semibold text-white">{role}</span>
            </div>
            <Button size="sm" variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
          <AuthGate />
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
