import { useMemo, useState } from "react"
import { Target, Zap, ShieldCheck, TriangleAlert, Bomb } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import api from "@/utils/api"
import { getToken } from "@/utils/auth"

const presets = [
  {
    label: "Normal Query",
    description: "Safe SELECT",
    query: "SELECT id, email FROM User WHERE role = 'admin';",
    tone: "from-emerald-700 to-emerald-500",
    icon: ShieldCheck,
  },
  {
    label: "SQL Injection Attack",
    description: "OR 1=1 plus UNION SELECT",
    query: "SELECT * FROM User WHERE email = 'admin' OR 1=1 UNION SELECT password;",
    tone: "from-rose-700 to-rose-500",
    icon: TriangleAlert,
  },
  {
    label: "Mass Delete",
    description: "DELETE without WHERE",
    query: "DELETE FROM User;",
    tone: "from-rose-900 to-rose-600",
    icon: Bomb,
  },
  {
    label: "Brute Force Simulation",
    description: "Flood login attempts",
    query: "SELECT COUNT(*) FROM sessions WHERE attempts > 100;",
    tone: "from-amber-500 to-amber-400",
    icon: Zap,
  },
]

function AttackLab() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [logs, setLogs] = useState([])
  const [customQuery, setCustomQuery] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const addLog = (entry) => {
    setLogs((prev) => [entry, ...prev].slice(0, 6))
  }

  const createEntry = (label, status, risk) => ({
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    action: label,
    status,
    risk,
  })

  const executeQuery = async (payload) => {
    const token = getToken()
    if (!token) {
      toast({
        title: "Login required",
        description: "Sign in to execute queries",
        variant: "destructive",
      })
      navigate("/login", { replace: true })
      return
    }
    setIsProcessing(true)
    try {
      const response = await api.post("/proxy/execute", { query: payload.query })
      const result = response.data
      const entry = createEntry(payload.label, result.status, result.risk)
      addLog(entry)
      toast({
        title: `${payload.label} ${result.status}`,
        description: result.detail || payload.description,
        variant: result.blocked ? "destructive" : "default",
      })
    } catch (error) {
      toast({
        title: "Attack failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
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
    [logs],
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
            Simulate and test different zero-trust attack scenarios.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {presets.map((preset) => (
            <Button
              key={preset.label}
              className={`h-12 w-full rounded-xl bg-gradient-to-r ${preset.tone} text-white shadow-[0_0_18px_rgba(16,185,129,0.35)] transition duration-200 hover:scale-[1.01]`}
              onClick={() => executeQuery(preset)}
              disabled={isProcessing}
            >
              <preset.icon className="mr-2 h-4 w-4" />
              {preset.label}
            </Button>
          ))}
        </div>

        <div className="mt-8">
          <p className="mb-3 text-sm text-zinc-400">Custom Query</p>
          <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-800/60 p-2">
            <Input
              value={customQuery}
              onChange={(event) => setCustomQuery(event.target.value)}
              placeholder="Enter your custom SQL query..."
              className="border-none bg-transparent text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-0"
              disabled={isProcessing}
            />
            <Button
              onClick={() =>
                executeQuery({
                  label: "Custom Query",
                  description: "Custom payload submitted",
                  query: customQuery,
                })
              }
              className="rounded-md bg-zinc-700 text-zinc-100 hover:bg-zinc-600"
              disabled={!customQuery.trim() || isProcessing}
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
