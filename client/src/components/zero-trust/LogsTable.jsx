import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const statusStyles = {
  BLOCKED: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  ALLOWED: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  WARN: "bg-amber-500/15 text-amber-300 border-amber-500/30",
}

const riskStyles = {
  LOW: "text-emerald-300",
  MEDIUM: "text-amber-300",
  HIGH: "text-rose-300",
}

function LogsTable({ logs }) {
  return (
    <Card className="border-zinc-800 bg-zinc-950/70">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base text-white">
          Real-Time Attack Logs
        </CardTitle>
        <Badge className="bg-rose-500/15 text-rose-300 border border-rose-500/30">
          Live
        </Badge>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800">
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Risk</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log, index) => (
              <TableRow key={`${log.time}-${index}`} className="border-zinc-800">
                <TableCell className="text-zinc-300">{log.time}</TableCell>
                <TableCell className="text-zinc-200">{log.user}</TableCell>
                <TableCell className="text-zinc-200">{log.action}</TableCell>
                <TableCell>
                  <Badge
                    className={`border ${statusStyles[log.status]}`}
                    variant="outline"
                  >
                    {log.status}
                  </Badge>
                </TableCell>
                <TableCell className={riskStyles[log.risk]}>
                  {log.risk}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default LogsTable
