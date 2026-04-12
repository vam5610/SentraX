import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "Low", value: 60, color: "#22c55e" },
  { name: "Medium", value: 25, color: "#f59e0b" },
  { name: "High", value: 15, color: "#ef4444" },
]

function RiskChart() {
  const total = data.reduce((acc, item) => acc + item.value, 0)
  const segments = data.map((item) => ({
    ...item,
    dash: `${(item.value / total) * 100} ${(100 - (item.value / total) * 100)}`
  }))

  return (
    <Card className="border-zinc-800 bg-zinc-950/70">
      <CardHeader>
        <CardTitle className="text-base text-white">Risk Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="flex h-48 w-full items-center justify-center">
          <svg viewBox="0 0 120 120" className="h-40 w-40">
            <g transform="rotate(-90 60 60)">
              {segments.map((segment, index) => (
                <circle
                  key={segment.name}
                  cx="60"
                  cy="60"
                  r="34"
                  fill="transparent"
                  stroke={segment.color}
                  strokeWidth="14"
                  strokeDasharray={segment.dash}
                  strokeDashoffset={segments
                    .slice(0, index)
                    .reduce(
                      (acc, curr) => acc - (curr.value / total) * 100,
                      0
                    )}
                />
              ))}
            </g>
            <circle cx="60" cy="60" r="24" fill="#0b0f1a" />
            <text
              x="60"
              y="57"
              textAnchor="middle"
              className="fill-zinc-100 text-xs"
            >
              Total
            </text>
            <text
              x="60"
              y="74"
              textAnchor="middle"
              className="fill-white text-sm font-semibold"
            >
              12,458
            </text>
          </svg>
        </div>
        <div className="space-y-2 text-sm text-zinc-300">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="w-20">{entry.name}</span>
              <span className="text-zinc-400">{entry.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default RiskChart
