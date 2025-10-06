import React, { useState } from 'react'

export default function Login() {
  const [customer, setCustomer] = useState('')
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Replace with real auth flow later
    console.log('login', { customer, user, password })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-blue-700">PROMS</div>
            <div className="text-sm text-slate-500">Login</div>
          </div>
          <div className="text-xs text-slate-400">Version enquiry-reactive (3222471)</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded shadow-sm">
          <div className="border-b px-4 py-3">
            <nav className="flex items-center">
              <button className="px-4 py-2 rounded-t text-sm font-medium bg-white">Login</button>
            </nav>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4 items-end">
              <label className="col-span-1 text-sm text-slate-700">Customer:</label>
              <div className="col-span-3">
                <input
                  value={customer}
                  onChange={e => setCustomer(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                  placeholder=""
                  aria-label="Customer"
                />
              </div>

              <label className="col-span-1 text-sm text-slate-700">User:</label>
              <div className="col-span-3">
                <input
                  value={user}
                  onChange={e => setUser(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                  placeholder=""
                  aria-label="User"
                />
              </div>

              <label className="col-span-1 text-sm text-slate-700">Password:</label>
              <div className="col-span-3 flex items-center gap-2">
                <input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                  type="password"
                  aria-label="Password"
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                >
                  Log In
                </button>
              </div>

              <div className="col-span-12 mt-4">
                <hr />
                <div className="mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-700 text-white rounded text-sm"
                    onClick={() => console.log('SAML Login')}
                  >
                    SAML LogIn
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
