import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const roles = ["admin", "user"]
const actions = ["SELECT", "UPDATE", "DELETE"]
const effects = ["ALLOW", "DENY"]

function AddRuleForm({ formState, onChange, onSubmit }) {
  return (
    <Card className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5 shadow-[0_0_20px_rgba(59,130,246,0.12)]">
      <div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-3">
        <p className="text-sm font-semibold text-zinc-200">Add New Rule</p>
        <Button size="sm" className="bg-sky-500/20 text-sky-200">
          Add Rule
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-2 text-xs text-zinc-400">
          Role
          <select
            value={formState.role}
            onChange={(event) => onChange("role", event.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-200"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-xs text-zinc-400">
          Action
          <select
            value={formState.action}
            onChange={(event) => onChange("action", event.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-200"
          >
            {actions.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-xs text-zinc-400">
          Effect
          <select
            value={formState.effect}
            onChange={(event) => onChange("effect", event.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-200"
          >
            {effects.map((effect) => (
              <option key={effect} value={effect}>
                {effect}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          onClick={onSubmit}
          className="bg-emerald-500/20 text-emerald-200"
        >
          Add Rule
        </Button>
      </div>
    </Card>
  )
}

export default AddRuleForm
