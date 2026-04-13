import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import api from "@/utils/api"
import { setToken, setUserRole, getToken } from "@/utils/auth"

function LoginPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (getToken()) {
      navigate("/dashboard", { replace: true })
    }
  }, [navigate])

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    if (!form.email || !form.password) {
      setError("Email and password are required.")
      return
    }
    setLoading(true)
    try {
      const response = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      })
      const payload = response.data
      setToken(payload.token)
      setUserRole(payload.user?.role)
      toast({
        title: "Welcome back",
        description: "Logged in successfully",
      })
      navigate("/dashboard", { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || "Unable to login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.9),_rgba(2,6,23,0.95)_65%)]">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950/80 p-8 shadow-[0_10px_40px_rgba(2,6,23,0.8)]">
        <h1 className="text-3xl font-semibold text-white">Welcome Back</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Login to access the security dashboard
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Email
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2">
              <Mail className="text-zinc-400" size={16} />
              <Input
                className="border-none bg-transparent text-sm text-white shadow-none ring-0 focus-visible:ring-0"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange("email")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Password
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2">
              <Lock className="text-zinc-400" size={16} />
              <Input
                type="password"
                className="border-none bg-transparent text-sm text-white shadow-none ring-0 focus-visible:ring-0"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange("password")}
              />
            </div>
          </div>

          {error && <p className="text-sm text-rose-400">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Login"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-sky-400 underline-offset-4 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
