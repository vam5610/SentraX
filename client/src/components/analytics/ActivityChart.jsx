import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts"

function ActivityChart({ data }) {
  return (
    <Card className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 shadow-[0_0_30px_rgba(15,23,42,0.8)]">
      <p className="text-sm font-semibold text-zinc-200">Query Activity</p>
      <div className="mt-4 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#1f2937" vertical={false} strokeDasharray="4 4" />
            <XAxis dataKey="day" tick={{ fill: "#94a3b8" }} />
            <YAxis tick={{ fill: "#94a3b8" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#1f2937",
                color: "#f8fafc",
              }}
            />
            <Legend verticalAlign="bottom" wrapperStyle={{ color: "#94a3b8" }} />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 4, stroke: "#16a34a", strokeWidth: 2, fill: "#0f172a" }}
            />
            <Line
              type="monotone"
              dataKey="blocked"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 4, stroke: "#b91c1c", strokeWidth: 2, fill: "#0f172a" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default ActivityChart
