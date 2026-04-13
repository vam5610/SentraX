import { useEffect, useState } from "react"
import { Shield } from "lucide-react"
import { Card } from "@/components/ui/card"
import RolePermissions from "@/components/policy-engine/RolePermissions"
import RulesList from "@/components/policy-engine/RulesList"
import AddRuleForm from "@/components/policy-engine/AddRuleForm"
import StatsCards from "@/components/policy-engine/StatsCards"
import DecisionsTable from "@/components/policy-engine/DecisionsTable"
import api from "@/utils/api"
import { getToken, getUserRole } from "@/utils/auth"

const initialPolicies = {
  admin: { SELECT: true, UPDATE: true, DELETE: true },
  user: { SELECT: true, UPDATE: false, DELETE: false },
}

const initialRules = [
  { id: 1, label: "Block SQL Injection", enabled: true, updated: "1 day ago" },
  { id: 2, label: "Block DELETE without WHERE", enabled: true, updated: "3 hours ago" },
  { id: 3, label: "Rate Limit Login Attempts", enabled: true, updated: "1 hour ago" },
]

const initialLogs = [
  { time: "10:17 PM", role: "user", action: "DELETE", decision: "BLOCKED", reason: "No WHERE clause" },
  { time: "10:15 PM", role: "user", action: "SELECT", decision: "ALLOWED", reason: "Valid query" },
]

function PolicyEnginePage() {
  const [policies, setPolicies] = useState(initialPolicies)
  const [rules, setRules] = useState(initialRules)
  const [logs, setLogs] = useState(initialLogs)
  const [formState, setFormState] = useState({
    role: "user",
    action: "DELETE",
    effect: "DENY",
  })
  const [stats, setStats] = useState({
    allowed: 1200,
    blocked: 45,
    total: 1245,
  })
  const isAuthenticated = Boolean(getToken())
  const role = getUserRole()
  const canAccess = isAuthenticated && role === "admin"

  useEffect(() => {
    if (!canAccess) return
    let mounted = true
    api
      .get("/policies")
      .then((data) => {
        if (!mounted) return
        const normalized = data.reduce((acc, policy) => {
          const role = policy.role.toLowerCase()
          acc[role] = acc[role] || {}
          acc[role][policy.action] = policy.effect === "ALLOW"
          return acc
        }, {})
        setPolicies((prev) => ({ ...prev, ...normalized }))
      })
      .catch((error) => {
        console.error("Failed to load policies", error)
      })
    return () => {
      mounted = false
    }
  }, [canAccess])

  const updatePolicy = async (role, action, allowed) => {
    setPolicies((prev) => ({
      ...prev,
      [role]: { ...prev[role], [action]: allowed },
    }))
    setLogs((prev) => [
      {
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        role,
        action,
        decision: allowed ? "ALLOWED" : "BLOCKED",
        reason: allowed ? "Policy updated" : "Permission revoked",
      },
      ...prev,
    ])
    try {
      await api.post("/policies/update", { role, action, allowed })
    } catch (error) {
      console.error("Policy update failed", error)
    }
  }

  const toggleRule = (id) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    )
  }

  const addRule = async () => {
    const payload = {
      role: formState.role,
      action: formState.action,
      effect: formState.effect,
    }
    setRules((prev) => [
      {
        id: Date.now(),
        label: `${payload.effect} ${payload.action} for ${payload.role}`,
        enabled: true,
        updated: "just now",
      },
      ...prev,
    ])
    setStats((prev) => ({
      allowed: prev.allowed + (payload.effect === "ALLOW" ? 1 : 0),
      blocked: prev.blocked + (payload.effect === "DENY" ? 1 : 0),
      total: prev.total + 1,
    }))
    try {
      await api.post("/policies/add", payload)
    } catch (error) {
      console.error("Add rule failed", error)
    }
  }

  if (!canAccess) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),_rgba(2,6,23,0.95)_50%,_rgba(2,6,23,0.98)_70%)] p-6">
        <Card className="w-full max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 text-center shadow-[0_0_40px_rgba(59,130,246,0.2)]">
          <Shield className="mx-auto mb-4 h-10 w-10 text-sky-400 drop-shadow-[0_0_14px_rgba(56,189,248,0.6)]" />
          <h2 className="text-3xl font-bold text-white">Policy Engine</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Administrative policy controls are restricted to admins only.
          </p>
          <p className="mt-4 text-xs text-amber-200">
            Please sign in as an administrator to continue.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),_rgba(2,6,23,0.95)_50%,_rgba(2,6,23,0.98)_70%)] p-6">
      <Card className="w-full max-w-6xl rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-[0_0_40px_rgba(59,130,246,0.2)]">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-3 text-white">
            <Shield className="h-10 w-10 text-sky-400 drop-shadow-[0_0_14px_rgba(56,189,248,0.6)]" />
            <h2 className="text-3xl font-bold">Policy Engine</h2>
          </div>
          <p className="text-sm text-zinc-400">
            Manage access rules and security policies dynamically
          </p>
          {!isAuthenticated && (
            <div className="mt-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-xs text-amber-200">
              Login to sync with the backend policy store
            </div>
          )}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <RolePermissions policies={policies} onToggle={updatePolicy} />
            <RulesList rules={rules} onToggle={toggleRule} />
            <AddRuleForm
              formState={formState}
              onChange={(field, value) =>
                setFormState((prev) => ({ ...prev, [field]: value }))
              }
              onSubmit={addRule}
            />
          </div>
          <div className="space-y-6">
            <StatsCards stats={stats} />
            <DecisionsTable logs={logs} />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default PolicyEnginePage
