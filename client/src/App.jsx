import './App.css'
import { Routes, Route } from 'react-router-dom'
import DashboardLayout from '@/layouts/DashboardLayout'
import DashboardPage from '@/pages/DashboardPage'
import AttackLabPage from '@/pages/AttackLabPage'
import LiveMonitorPage from '@/pages/LiveMonitorPage'
import PolicyEnginePage from '@/pages/PolicyEnginePage'
import AnalyticsPage from "@/pages/AnalyticsPage"

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/attack-lab" element={<AttackLabPage />} />
        <Route path="/live-monitor" element={<LiveMonitorPage />} />
        <Route path="/policy-engine" element={<PolicyEnginePage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Route>
    </Routes>
  )
}

export default App
