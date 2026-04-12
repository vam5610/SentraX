import { Card } from "@/components/ui/card"

function TopUsersTable({ users }) {
  const maxQueries = Math.max(...users.map((user) => user.queries), 1)

  return (
    <Card className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 shadow-[0_0_30px_rgba(15,23,42,0.8)]">
      <p className="text-sm font-semibold text-zinc-200">Top Users by Activity</p>
      <div className="mt-4 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60">
        <table className="w-full text-left text-sm text-zinc-200">
          <thead className="bg-zinc-950/60 text-xs uppercase tracking-[0.2em] text-zinc-500">
            <tr>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Queries</th>
              <th className="px-4 py-3">Blocked</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.username}
                className="border-b border-zinc-800 transition duration-200 hover:bg-zinc-800/50"
              >
                <td className="px-4 py-3">{user.username}</td>
                <td className="px-4 py-3 capitalize text-zinc-400">{user.role}</td>
                <td className="px-4 py-3">
                  <div className="h-2 rounded-full bg-zinc-800">
                    <div
                      className="h-2 rounded-full bg-emerald-500 transition-all duration-200"
                      style={{ width: `${(user.queries / maxQueries) * 100}%` }}
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.blocked > 15
                        ? "bg-rose-600 text-rose-100"
                        : "bg-zinc-800 text-zinc-300"
                    }`}
                  >
                    {user.blocked}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default TopUsersTable
