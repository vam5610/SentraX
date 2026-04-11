import { Card, CardContent } from "@/components/ui/card"

function DashboardCards({ stats }) {
  const cards = [
    {
      label: "Total Queries",
      value: stats.totalQueries.toLocaleString(),
      delta: "+12.5%",
      deltaColor: "text-emerald-400",
    },
    {
      label: "Blocked Queries",
      value: stats.blockedQueries.toLocaleString(),
      delta: "-2.3%",
      deltaColor: "text-rose-400",
    },
    {
      label: "Active Users",
      value: stats.activeUsers.toLocaleString(),
      delta: "+8.7%",
      deltaColor: "text-emerald-400",
    },
    {
      label: "High Risk Events",
      value: stats.highRisk.toLocaleString(),
      delta: "-5.0%",
      deltaColor: "text-rose-400",
    },
    {
      label: "System Health",
      value: `${stats.health}%`,
      delta: "Excellent",
      deltaColor: "text-emerald-400",
    },
  ]
  return (
    <div className="grid gap-4 md:grid-cols-5">
      {cards.map((card) => (
        <Card key={card.label} className="border-zinc-800 bg-zinc-950/70">
          <CardContent className="space-y-2 p-4">
            <p className="text-xs text-zinc-400">{card.label}</p>
            <p className="text-xl font-semibold text-white">{card.value}</p>
            <p className={`text-xs ${card.deltaColor}`}>{card.delta}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default DashboardCards
