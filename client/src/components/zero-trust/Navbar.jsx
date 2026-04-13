import { Search, Bell, ShieldCheck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getToken, getUserName, getUserRole } from "@/utils/auth"
import avatarImg from "@/assets/avatar.png"

function Navbar() {
  return (
    <header className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-6 py-4 backdrop-blur">
      <div>
        <h1 className="text-xl font-semibold text-white">
          Zero Trust Security Simulation
        </h1>
        <p className="text-sm text-zinc-400">
          Real-time attack detection and monitoring
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden w-72 md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            placeholder="Search anything..."
            className="pl-9 bg-zinc-900/60 border-zinc-800 text-zinc-200"
          />
        </div>
        <button className="relative rounded-full border border-zinc-800 bg-zinc-900/60 p-2 text-zinc-300 transition hover:text-white">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-rose-500" />
        </button>
        <div className="flex items-center gap-3 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5">
          <div className="relative">
            <img
              src={avatarImg}
              alt="Profile"
              className="h-8 w-8 rounded-full border border-zinc-800 object-cover"
            />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-zinc-950 bg-emerald-500" />
          </div>
          <div className="text-xs">
            <p className="font-medium text-zinc-100">
              {getToken() ? getUserName() || "Sentra User" : "Guest Visitor"}
            </p>
            <div className="flex items-center gap-1 text-zinc-400">
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
              <span>{getToken() ? getUserRole()?.toUpperCase() : "GUEST"}</span>
            </div>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-400">
            {getToken() ? "Online" : "Offline"}
          </Badge>
        </div>
      </div>
    </header>
  )
}

export default Navbar
