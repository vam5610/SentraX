import { Card } from "@/components/ui/card"
import { ChartLine, ShieldAlert, Users } from "lucide-react"

function OverviewCards({ stats }) {
  const cards = [
    {
      label: "Total Queries",
      value: stats.total,
      change: "+12.5%",
      changeTone: "text-emerald-400",
      icon: <ChartLine className="h-6 w-6 text-emerald-300" />,
      tone: "bg-gradient-to-r from-emerald-800/60 to-emerald-500/20",
    },
    {
      label: "Blocked Queries",
      value: stats.blocked,
      change: "-11.8%",
      changeTone: "text-rose-400",
      icon: <ShieldAlert className="h-6 w-6 text-rose-300" />,
      tone: "bg-gradient-to-r from-rose-800/60 to-rose-500/20",
    },
    {
      label: "Users Monitored",
      value: stats.users,
      change: "+5.4%",
      changeTone: "text-sky-300",
      icon: <Users className="h-6 w-6 text-sky-300" />,
      tone: "bg-gradient-to-r from-sky-800/60 to-sky-500/20",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <Card
          key={card.label}
          className={`rounded-2xl border border-zinc-800 bg-zinc-950/70 px-5 py-4 shadow-[0_0_30px_rgba(15,23,42,0.75)] transition duration-200 hover:scale-[1.01] ${card.tone}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
                {card.label}
              </p>
              <p className="mt-2 text-3xl font-semibold text-white">{card.value}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              {card.icon}
              <span className={`text-xs font-medium ${card.changeTone}`}>
                {card.change}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default OverviewCards
