import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const actions = ["SELECT", "UPDATE", "DELETE"]

function RolePermissions({ policies, onToggle }) {
  return (
    <Card className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5 shadow-[0_0_20px_rgba(59,130,246,0.12)]">
      <div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-3">
        <p className="text-sm font-semibold text-zinc-200">Role Permissions</p>
        <Badge className="bg-sky-500/10 text-sky-300 border border-sky-500/30">
          Access Matrix
        </Badge>
      </div>
      <div className="grid gap-3">
        <div className="grid grid-cols-[140px_repeat(3,minmax(0,1fr))] gap-3 text-xs uppercase text-zinc-500">
          <span>Role</span>
          {actions.map((action) => (
            <span key={action} className="text-center">
              {action}
            </span>
          ))}
        </div>
        {Object.entries(policies).map(([role, perms]) => (
          <div
            key={role}
            className="grid grid-cols-[140px_repeat(3,minmax(0,1fr))] items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-3 text-sm text-zinc-200"
          >
            <span className="font-medium capitalize">{role}</span>
            {actions.map((action) => {
              const enabled = perms[action]
              return (
                <button
                  key={action}
                  onClick={() => onToggle(role, action, !enabled)}
                  className={`mx-auto flex h-8 w-14 items-center rounded-full border transition ${
                    enabled
                      ? "border-emerald-500/60 bg-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.35)]"
                      : "border-zinc-700 bg-zinc-800/70"
                  }`}
                >
                  <span
                    className={`h-6 w-6 rounded-full transition ${
                      enabled
                        ? "translate-x-7 bg-emerald-400"
                        : "translate-x-1 bg-zinc-600"
                    }`}
                  />
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </Card>
  )
}

export default RolePermissions
