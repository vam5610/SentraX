import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { removeToken } from "@/utils/auth"

const features = [
  {
    title: "Zero Trust Proxy",
    detail: "Every query goes through auth → policy → detection → logging before it touches data.",
  },
  {
    title: "Live Monitoring",
    detail: "See every access attempt, risk rating, and policy response in real time.",
  },
  {
    title: "Policy Engine",
    detail: "Role-backed policies let admins allow or deny highly-sensitive operations instantly.",
  },
  {
    title: "Analytics Focus",
    detail: "Track attackers, peak usage, and blocked traffic without breaking compliance.",
  },
]

function LandingPage() {
  const navigate = useNavigate()

  const handleViewDemo = () => {
    removeToken()
    navigate("/dashboard")
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-950 via-zinc-900 to-black px-4 py-16 text-white">
      <div className="relative w-full max-w-6xl rounded-3xl border border-zinc-800 bg-zinc-900/80 p-10 shadow-2xl shadow-sky-500/10 backdrop-blur">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-4">
            <p className="text-sm uppercase tracking-[0.4em] text-sky-400">SentraX Platform</p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              Defend every database call with Zero Trust verification.
            </h1>
            <p className="text-base text-zinc-300">
              Login to query, monitor, and harden your telemetry. Attack Lab, Live Monitor, Policy Engine,
              and Analytics all work together to show you which access attempts are allowed, blocked, or
              flagged for review.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                className="bg-gradient-to-r from-sky-500 to-blue-600 text-white"
                size="lg"
                onClick={handleViewDemo}
              >
                View demo
              </Button>
              <Link to="/signup">
                <Button variant="ghost" size="lg" className="border border-zinc-700 text-white">
                  Create account
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 space-y-3 rounded-2xl border border-sky-500/40 bg-gradient-to-br from-sky-500/10 to-transparent p-6 text-sm text-zinc-200">
            <p className="text-xs uppercase tracking-[0.35em] text-sky-300">Live status</p>
            <p className="text-lg font-semibold text-white">Gateway ready</p>
            <p>
              Only authenticated, policy-compliant traffic can reach the analytics or attack lab modules.
              Unauthorized calls are blocked, risk-scored, and logged.
            </p>
            <div className="grid gap-3 text-xs text-zinc-400">
              <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/40 px-4 py-3">
                <span>Blocked queries today</span>
                <span className="text-emerald-300">42</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/40 px-4 py-3">
                <span>Admins online</span>
                <span className="text-sky-300">3</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/40 px-4 py-3">
                <span>Avg. risk score</span>
                <span className="text-amber-300">High</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5 text-sm text-zinc-200"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{feature.title}</p>
              <p className="mt-2 text-base text-white">{feature.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LandingPage
