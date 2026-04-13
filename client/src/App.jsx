import "./App.css"
import { Routes, Route, Navigate } from "react-router-dom"
import DashboardLayout from "@/layouts/DashboardLayout"
import DashboardPage from "@/pages/DashboardPage"
import AttackLabPage from "@/pages/AttackLabPage"
import LiveMonitorPage from "@/pages/LiveMonitorPage"
import PolicyEnginePage from "@/pages/PolicyEnginePage"
import AnalyticsPage from "@/pages/AnalyticsPage"
import LoginPage from "@/pages/Login"
import SignupPage from "@/pages/Signup"
import LandingPage from "@/pages/LandingPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/attack-lab" element={<AttackLabPage />} />
        <Route path="/live-monitor" element={<LiveMonitorPage />} />
        <Route path="/policy-engine" element={<PolicyEnginePage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
