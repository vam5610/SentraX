import { useEffect, useState } from "react"
import { getToken } from "@/utils/auth"

function AuthGate() {
  const [status, setStatus] = useState("Connecting to backend...")

  useEffect(() => {
    const token = getToken()
    if (token) {
      setStatus("Authenticated")
    } else {
      setStatus("Signed out")
    }
  }, [])

  return (
    <div className="p-2 text-xs text-zinc-400">
      Backend status: <span className="font-semibold text-white">{status}</span>
    </div>
  )
}

export default AuthGate
