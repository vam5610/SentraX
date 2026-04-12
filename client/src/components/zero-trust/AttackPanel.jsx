import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  ShieldCheck,
  Skull,
  Bomb,
  Zap,
  Play,
  TerminalSquare,
} from "lucide-react"

function AttackPanel({ onAction }) {
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
        <Button size="sm" className="bg-sky-500/20 text-sky-200">
          Run Custom Query
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-5">
          <button
            className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200 transition hover:border-emerald-400"
            onClick={() => onAction("normal")}
          >
            <ShieldCheck className="h-4 w-4" />
            <div className="text-left">
              <p className="font-medium">Normal Query</p>
              <p className="text-xs text-emerald-300/80">Safe SELECT</p>
            </div>
          </button>
          <button
            className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200 transition hover:border-rose-400"
            onClick={() => onAction("sql")}
          >
            <Skull className="h-4 w-4" />
            <div className="text-left">
              <p className="font-medium">SQL Injection</p>
              <p className="text-xs text-rose-300/80">OR 1=1 Attack</p>
            </div>
          </button>
          <button
            className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200 transition hover:border-amber-400"
            onClick={() => onAction("mass")}
          >
            <Bomb className="h-4 w-4" />
            <div className="text-left">
              <p className="font-medium">Mass Delete</p>
              <p className="text-xs text-amber-300/80">DELETE without WHERE</p>
            </div>
          </button>
          <button
            className="flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-3 text-sm text-purple-200 transition hover:border-purple-400"
            onClick={() => onAction("privilege")}
          >
            <TerminalSquare className="h-4 w-4" />
            <div className="text-left">
              <p className="font-medium">Privilege Esc.</p>
              <p className="text-xs text-purple-300/80">Access Admin Data</p>
            </div>
          </button>
          <button
            className="flex items-center gap-2 rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-3 text-sm text-sky-200 transition hover:border-sky-400"
            onClick={() => onAction("brute")}
          >
            <Zap className="h-4 w-4" />
            <div className="text-left">
              <p className="font-medium">Brute Force</p>
              <p className="text-xs text-sky-300/80">Login Attempts</p>
            </div>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3">
          <Input
            placeholder="Custom query input"
            className="max-w-xs bg-zinc-950/50 border-zinc-800 text-zinc-200"
          />
          <Button size="sm" variant="outline" className="border-zinc-700">
            <Play className="mr-2 h-3.5 w-3.5" />
            Run Query
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AttackPanel
