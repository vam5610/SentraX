import { Card } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

const colors = ["#ef4444", "#f97316", "#facc15", "#38bdf8"]

function DistributionChart({ data }) {
  return (
    <Card className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 shadow-[0_0_30px_rgba(15,23,42,0.8)]">
      <p className="text-sm font-semibold text-zinc-200">Blocked Query Distribution</p>
      <div className="mt-4 flex flex-col gap-4 md:flex-row">
        <div className="h-48 w-full md:w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                paddingAngle={4}
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex w-full flex-col gap-2 text-sm text-zinc-200">
          {data.map((entry, index) => (
            <div key={entry.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span>{entry.name}</span>
              </div>
              <span className="text-xs text-zinc-400">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default DistributionChart
