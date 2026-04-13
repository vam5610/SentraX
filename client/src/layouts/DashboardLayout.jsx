import { useMemo } from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import { Activity, Bug, ChartPie, ShieldAlert, ShieldCheck, Terminal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import AuthGate from "@/components/zero-trust/AuthGate"
import { getToken, getUserName, getUserRole, logout } from "@/utils/auth"
import avatarImg from "@/assets/avatar.png"

const navLinkBase =
  "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm"

function DashboardLayout() {
  const location = useLocation()
  const token = useMemo(() => getToken(), [location.pathname])
  const roleValue = token ? getUserRole() ?? "user" : null
  const name = token ? getUserName() ?? "Sentra User" : "Guest Visitor"
  const displayRole = token ? roleValue?.toUpperCase() : "GUEST"

  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 border-r border-zinc-800 bg-zinc-950/80 p-6 lg:block">
          <div className="mb-8">
            <p className="text-2xl font-semibold text-white">SENTRAX</p>
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
            {roleValue?.toLowerCase?.() === "admin" && (
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
          <div className="flex items-center justify-end border-b border-zinc-800 bg-zinc-950/60 px-6 py-3">
            {/* <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-2 text-right">
              <img
                src={avatarImg}
                alt="avatar"
                className="h-10 w-10 rounded-full border border-zinc-800 object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-white">{name}</p>
                <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">
                  {displayRole}
                </p>
              </div>
            </div> */}
            {token ? (
              <Button size="sm" variant="outline" className="ml-4" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button size="sm" variant="ghost" className="ml-4 border border-zinc-700 text-white">
                  Login
                </Button>
              </Link>
            )}
          </div>
          <AuthGate />
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
