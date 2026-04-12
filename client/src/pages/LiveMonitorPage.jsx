import { useEffect, useMemo, useState } from "react"
import { Target, RefreshCw } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const initialLogs = [
  { id: 1, time: "10:17 PM", user: "admin", action: "Delete Users", status: "BLOCKED", risk: "HIGH" },
  { id: 2, time: "10:15 PM", user: "test_user", action: "SQL Injection", status: "BLOCKED", risk: "HIGH" },
  { id: 3, time: "10:12 PM", user: "user123", action: "Login Attempt", status: "BLOCKED", risk: "MEDIUM" },
  { id: 4, time: "10:10 PM", user: "guest", action: "View Users", status: "ALLOWED", risk: "LOW" },
  { id: 5, time: "10:08 PM", user: "admin", action: "Attempt File Upload", status: "BLOCKED", risk: "MEDIUM" },
]

const riskStyles = {
  HIGH: "bg-rose-500/20 text-rose-200 border-rose-500/40",
  MEDIUM: "bg-amber-500/20 text-amber-200 border-amber-500/40",
  LOW: "bg-emerald-500/20 text-emerald-200 border-emerald-500/40",
}

const statusStyles = {
  BLOCKED: "bg-rose-600 text-white shadow-[0_0_12px_rgba(244,63,94,0.35)]",
  ALLOWED: "bg-emerald-600 text-white",
}

const actions = [
  "API Access",
  "Token Refresh",
  "Firewall Scan",
  "Privilege Check",
  "SQL Injection",
  "Delete Users",
]

function LiveMonitorPage() {
  const [logs, setLogs] = useState(initialLogs)
  const [newRowId, setNewRowId] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const isAdd = Math.random() > 0.45
      if (isAdd) {
        const time = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
        const risk = Math.random() > 0.7 ? "HIGH" : Math.random() > 0.4 ? "MEDIUM" : "LOW"
        const status = risk === "LOW" ? "ALLOWED" : "BLOCKED"
        const entry = {
          id: Date.now(),
          time,
          user: "system",
          action: actions[Math.floor(Math.random() * actions.length)],
          status,
          risk,
        }
        setLogs((prev) => [entry, ...prev].slice(0, 8))
        setNewRowId(entry.id)
        setTimeout(() => setNewRowId(null), 600)
      } else {
        setLogs((prev) => {
          if (prev.length === 0) return prev
          const index = Math.floor(Math.random() * prev.length)
          const updated = [...prev]
          updated[index] = {
            ...updated[index],
            status: "BLOCKED",
            risk: "HIGH",
          }
          return updated
        })
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const tableRows = useMemo(
    () =>
      logs.map((log) => (
        <TableRow
          key={log.id}
          className={`border-zinc-800 transition duration-200 hover:bg-zinc-800/60 ${
            log.status === "BLOCKED" ? "glow-blocked" : ""
          } ${newRowId === log.id ? "fade-in" : ""}`}
        >
          <TableCell className="text-zinc-200">{log.time}</TableCell>
          <TableCell className="text-zinc-200">{log.user}</TableCell>
          <TableCell className="text-zinc-200">{log.action}</TableCell>
          <TableCell>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[log.status]}`}
            >
              {log.status}
            </span>
          </TableCell>
          <TableCell>
            <Badge className={`border ${riskStyles[log.risk]}`} variant="outline">
              {log.risk}
            </Badge>
          </TableCell>
        </TableRow>
      )),
    [logs, newRowId]
  )

  return (
    <div className="flex flex-1 items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_rgba(2,6,23,0.9)_50%,_rgba(2,6,23,0.98)_70%)] p-6">
      <Card className="w-full max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-[0_0_40px_rgba(30,64,175,0.25)]">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-3 text-white">
            <Target className="h-9 w-9 text-sky-400 drop-shadow-[0_0_14px_rgba(56,189,248,0.6)]" />
            <h2 className="text-3xl font-bold">Live Monitor</h2>
          </div>
          <p className="text-sm text-zinc-400">
            Real-time attack detection and activity logs.
          </p>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <p className="text-lg font-semibold text-zinc-200">Attacks</p>
          </div>
          <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950/40">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800">
                  <TableHead className="text-zinc-400">Timestamp</TableHead>
                  <TableHead className="text-zinc-400">User</TableHead>
                  <TableHead className="text-zinc-400">Action</TableHead>
                  <TableHead className="text-zinc-400">Status</TableHead>
                  <TableHead className="text-zinc-400">Risk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{tableRows}</TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs text-zinc-500">
          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
          Auto-refreshing every 3 seconds...
        </div>
      </Card>
    </div>
  )
}

export default LiveMonitorPage
