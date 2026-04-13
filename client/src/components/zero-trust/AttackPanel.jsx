import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  ShieldCheck,
  Skull,
  Bomb,
  Zap,
  TerminalSquare,
  Play,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

const presetQueries = [
  {
    key: "normal",
    label: "Normal Query",
    description: "Safe SELECT",
    query: "SELECT id, email, role FROM User WHERE role != 'guest' LIMIT 5;",
    icon: ShieldCheck,
    tone: "text-emerald-200 border-emerald-500/30 bg-emerald-500/10 hover:border-emerald-400",
  },
  {
    key: "sql",
    label: "SQL Injection",
    description: "OR 1=1 Attack",
    query: "SELECT * FROM User WHERE email = 'admin' OR 1=1;",
    icon: Skull,
    tone: "text-rose-200 border-rose-500/30 bg-rose-500/10 hover:border-rose-400",
  },
  {
    key: "mass",
    label: "Mass Delete",
    description: "DELETE without WHERE",
    query: "DELETE FROM User;",
    icon: Bomb,
    tone: "text-amber-200 border-amber-500/30 bg-amber-500/10 hover:border-amber-400",
  },
  {
    key: "privilege",
    label: "Privilege Esc.",
    description: "Access Admin Data",
    query: "SELECT * FROM secrets WHERE owner_role = 'admin';",
    icon: TerminalSquare,
    tone: "text-purple-200 border-purple-500/30 bg-purple-500/10 hover:border-purple-400",
  },
  {
    key: "brute",
    label: "Brute Force",
    description: "Login Attempts",
    query: "SELECT COUNT(*) FROM sessions WHERE attempts > 5;",
    icon: Zap,
    tone: "text-sky-200 border-sky-500/30 bg-sky-500/10 hover:border-sky-400",
  },
]

function AttackPanel({ onExecute }) {
  const { toast } = useToast()
  const [customQuery, setCustomQuery] = useState("")
  const [isExecuting, setIsExecuting] = useState(false)

  const executeQuery = async (query, label, variant) => {
    if (!onExecute) return
    setIsExecuting(true)
    try {
      const result = await onExecute({ query, label })
      toast({
        title: `${label} ${result?.status ?? ""}`.trim(),
        description: result?.detail || variant,
        variant: result?.blocked ? "destructive" : "default",
      })
    } catch (error) {
      toast({
        title: "Proxy failure",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsExecuting(false)
    }
  }

  const handlePreset = (preset) => {
    executeQuery(preset.query, preset.label, preset.description)
  }

  const handleCustom = () => {
    if (!customQuery.trim()) return
    executeQuery(customQuery.trim(), "Custom Query", "Custom payload submitted")
    setCustomQuery("")
  }

  return (
    <Card className="border-zinc-800 bg-zinc-950/70">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base text-white">
            Live Attack Simulation Lab
          </CardTitle>
          <p className="text-xs text-zinc-400">
            Test zero-trust defenses in real time
          </p>
        </div>
        <Button
          size="sm"
          className="bg-sky-500/20 text-sky-200"
          onClick={handleCustom}
          disabled={!customQuery.trim() || isExecuting}
        >
          Run Custom Query
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-5">
          {presetQueries.map((preset) => (
            <button
              key={preset.key}
              className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm transition ${preset.tone}`}
              onClick={() => handlePreset(preset)}
              disabled={isExecuting}
            >
              <preset.icon className="h-4 w-4" />
              <div className="text-left">
                <p className="font-medium">{preset.label}</p>
                <p className="text-xs text-zinc-200/80">{preset.description}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3">
          <Input
            value={customQuery}
            onChange={(event) => setCustomQuery(event.target.value)}
            placeholder="Custom query input"
            className="max-w-xs bg-zinc-950/50 border-zinc-800 text-zinc-200"
            disabled={isExecuting}
          />
          <Button
            size="sm"
            variant="outline"
            className="border-zinc-700"
            onClick={handleCustom}
            disabled={!customQuery.trim() || isExecuting}
          >
            <Play className="mr-2 h-3.5 w-3.5" />
            Run Query
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AttackPanel
