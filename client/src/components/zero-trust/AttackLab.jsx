import { useMemo, useState } from "react"
import { Target, Zap, ShieldCheck, TriangleAlert, Bomb } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

const delay = () => 500 + Math.random() * 300

function AttackLab() {
  const { toast } = useToast()
  const [logs, setLogs] = useState([])
  const [query, setQuery] = useState("")

  const addLog = (entry) => {
    setLogs((prev) => [entry, ...prev].slice(0, 6))
  }

  const runWithDelay = (action, toastConfig) => {
    setTimeout(() => {
      action()
      toast(toastConfig)
    }, delay())
  }

  const runNormalQuery = () =>
    runWithDelay(
      () =>
        addLog({
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          action: "Normal Query",
          status: "ALLOWED",
          risk: "LOW",
        }),
      { title: "Query executed successfully", description: "Safe query executed." }
    )

  const runSqlInjection = () =>
    runWithDelay(
      () =>
        addLog({
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          action: "SQL Injection",
          status: "BLOCKED",
          risk: "CRITICAL",
        }),
      { title: "Blocked malicious query 🚨", description: "Attack Blocked." }
    )

  const runMassDelete = () =>
    runWithDelay(
      () =>
        addLog({
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          action: "Mass Delete Attempt",
          status: "BLOCKED",
          risk: "CRITICAL",
        }),
      { title: "Blocked unsafe operation", description: "Dangerous operation blocked." }
    )

  const runBruteForce = () =>
    runWithDelay(
      () =>
        addLog({
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          action: "Brute Force Simulation",
          status: "BLOCKED",
          risk: "HIGH",
        }),
      { title: "Rate limit triggered", description: "Suspicious activity detected." }
    )

  const runCustomQuery = () => {
    if (!query.trim()) return
    runWithDelay(
      () =>
        addLog({
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          action: "Custom Query",
          status: "ALLOWED",
          risk: "LOW",
        }),
      { title: "Custom query executed", description: query }
    )
    setQuery("")
  }

  const logPreview = useMemo(
    () =>
      logs.map((log) => (
        <div
          key={`${log.time}-${log.action}`}
          className="flex items-center justify-between text-xs text-zinc-400"
        >
          <span>{log.time}</span>
          <span className="text-zinc-200">{log.action}</span>
          <span
            className={
              log.risk === "CRITICAL"
                ? "text-rose-300"
                : log.risk === "HIGH"
                ? "text-amber-300"
                : "text-emerald-300"
            }
          >
            {log.status}
          </span>
        </div>
      )),
    [logs]
  )

  return (
    <div className="flex min-h-[calc(100vh-84px)] items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_rgba(2,6,23,0.9)_45%,_rgba(2,6,23,0.98)_70%)] p-6">
      <Card className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-[0_0_40px_rgba(15,23,42,0.8)]">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-3 text-white">
            <Target className="h-9 w-9 text-rose-500 drop-shadow-[0_0_12px_rgba(244,63,94,0.7)]" />
            <h2 className="text-3xl font-bold">Attack Lab</h2>
          </div>
          <p className="text-sm text-zinc-400">
            Simulate and test different attack scenarios.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Button
            onClick={runNormalQuery}
            className="h-12 w-full rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-500 text-white shadow-[0_0_18px_rgba(16,185,129,0.35)] transition duration-200 hover:scale-[1.01]"
          >
            <ShieldCheck className="mr-2 h-4 w-4" /> Run Normal Query ✅
          </Button>
          <Button
            onClick={runSqlInjection}
            className="h-12 w-full rounded-xl bg-gradient-to-r from-rose-700 to-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.45)] transition duration-200 hover:scale-[1.01]"
          >
            <TriangleAlert className="mr-2 h-4 w-4" /> SQL Injection Attack 🚨
          </Button>
          <Button
            onClick={runMassDelete}
            className="h-12 w-full rounded-xl bg-gradient-to-r from-rose-900 to-rose-600 text-white shadow-[0_0_20px_rgba(244,63,94,0.35)] transition duration-200 hover:scale-[1.01]"
          >
            <Bomb className="mr-2 h-4 w-4" /> Mass Delete Attempt 💣
          </Button>
          <Button
            onClick={runBruteForce}
            className="h-12 w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 shadow-[0_0_18px_rgba(251,191,36,0.4)] transition duration-200 hover:scale-[1.01]"
          >
            <Zap className="mr-2 h-4 w-4" /> Brute Force Simulation ⚡
          </Button>
        </div>

        <div className="mt-8">
          <p className="mb-3 text-sm text-zinc-400">Custom Query</p>
          <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-800/60 p-2">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Enter your custom SQL query..."
              className="border-none bg-transparent text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-0"
            />
            <Button
              onClick={runCustomQuery}
              className="rounded-md bg-zinc-700 text-zinc-100 hover:bg-zinc-600"
            >
              Run Query
            </Button>
          </div>
        </div>

        {logs.length > 0 && (
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
              Recent Activity
            </p>
            <div className="space-y-2">{logPreview}</div>
          </div>
        )}
      </Card>
    </div>
  )
}

export default AttackLab
