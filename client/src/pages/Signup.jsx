import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { User, Mail, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import api from "@/utils/api"
import { getToken } from "@/utils/auth"

const roles = [
  { label: "User", value: "user" },
  { label: "Admin", value: "admin" },
]

function SignupPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (getToken()) {
      navigate("/dashboard", { replace: true })
    }
  }, [navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.")
      return
    }
    setLoading(true)
    try {
      await api.post("/auth/signup", form)
      toast({
        title: "Account created",
        description: "You can now login with your credentials",
      })
      navigate("/login", { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || "Unable to sign up")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(5,15,45,0.95),_rgba(2,6,23,0.95)_60%)]">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 p-8 shadow-[0_10px_40px_rgba(2,6,23,0.9)]">
        <h1 className="text-3xl font-semibold text-white">Create Account</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Securely onboard to the cyber defenses dashboard
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Name
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2">
              <User className="text-zinc-400" size={16} />
              <Input
                placeholder="Your name"
                className="border-none bg-transparent text-sm text-white"
                value={form.name}
                onChange={handleChange("name")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Email
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2">
              <Mail className="text-zinc-400" size={16} />
              <Input
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange("email")}
                className="border-none bg-transparent text-sm text-white"
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
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange("password")}
                className="border-none bg-transparent text-sm text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Role
            </label>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2">
              <Select onValueChange={(value) => setForm((prev) => ({ ...prev, role: value }))} value={form.role}>
                <SelectTrigger className="border-none bg-transparent text-sm text-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950">
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && <p className="text-sm text-rose-400">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-400 text-white"
            disabled={loading}
          >
            {loading ? "Creating account…" : "Sign Up"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Already registered?{" "}
          <Link to="/login" className="text-sky-400 underline-offset-4 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignupPage
