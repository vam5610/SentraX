import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function RulesList({ rules, onToggle }) {
  return (
    <Card className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5 shadow-[0_0_20px_rgba(59,130,246,0.12)]">
      <div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-3">
        <p className="text-sm font-semibold text-zinc-200">Active Rules</p>
        <Badge className="bg-sky-500/10 text-sky-300 border border-sky-500/30">
          Enforcement
        </Badge>
      </div>
      <div className="space-y-3">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3"
          >
            <div>
              <p className="text-sm text-zinc-200">{rule.label}</p>
              <p className="text-xs text-zinc-500">{rule.updated}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                className={`border ${
                  rule.enabled
                    ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-200"
                    : "border-zinc-700 bg-zinc-800 text-zinc-400"
                }`}
                variant="outline"
              >
                {rule.enabled ? "Enabled" : "Disabled"}
              </Badge>
              <button
                onClick={() => onToggle(rule.id)}
                className={`flex h-7 w-12 items-center rounded-full border transition ${
                  rule.enabled
                    ? "border-emerald-500/60 bg-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.35)]"
                    : "border-zinc-700 bg-zinc-800/70"
                }`}
              >
                <span
                  className={`h-5 w-5 rounded-full transition ${
                    rule.enabled
                      ? "translate-x-6 bg-emerald-400"
                      : "translate-x-1 bg-zinc-600"
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default RulesList
