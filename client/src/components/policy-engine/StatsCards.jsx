import { Card } from "@/components/ui/card"
import { ShieldCheck, ShieldAlert, Layers } from "lucide-react"

function StatsCards({ stats }) {
  const cards = [
    {
      label: "Allowed Requests",
      value: stats.allowed,
      icon: ShieldCheck,
      tone: "bg-emerald-500/20 text-emerald-200",
    },
    {
      label: "Blocked Requests",
      value: stats.blocked,
      icon: ShieldAlert,
      tone: "bg-rose-500/20 text-rose-200",
    },
    {
      label: "Total Evaluated",
      value: stats.total,
      icon: Layers,
      tone: "bg-sky-500/20 text-sky-200",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <Card
          key={card.label}
          className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5 shadow-[0_0_20px_rgba(59,130,246,0.12)]"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-400">{card.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {card.value}
              </p>
            </div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.tone}`}
            >
              <card.icon className="h-5 w-5" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default StatsCards
