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

const decisionStyles = {
  ALLOWED: "bg-emerald-500/20 text-emerald-200 border-emerald-500/40",
  BLOCKED: "bg-rose-500/20 text-rose-200 border-rose-500/40",
}

function DecisionsTable({ logs }) {
  return (
    <Card className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5 shadow-[0_0_20px_rgba(59,130,246,0.12)]">
      <div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-3">
        <p className="text-sm font-semibold text-zinc-200">Recent Decisions</p>
        <span className="text-xs text-zinc-500">View All →</span>
      </div>
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/40">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800">
              <TableHead className="text-zinc-400">Time</TableHead>
              <TableHead className="text-zinc-400">Role</TableHead>
              <TableHead className="text-zinc-400">Action</TableHead>
              <TableHead className="text-zinc-400">Decision</TableHead>
              <TableHead className="text-zinc-400">Reason</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow
                key={`${log.time}-${log.action}`}
                className="border-zinc-800 hover:bg-zinc-800/50"
              >
                <TableCell className="text-zinc-200">{log.time}</TableCell>
                <TableCell className="text-zinc-200">{log.role}</TableCell>
                <TableCell className="text-zinc-200">{log.action}</TableCell>
                <TableCell>
                  <Badge className={`border ${decisionStyles[log.decision]}`}>
                    {log.decision}
                  </Badge>
                </TableCell>
                <TableCell className="text-zinc-400">{log.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}

export default DecisionsTable
