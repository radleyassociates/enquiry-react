import React from 'react'

export default function Header({ logo = '/logo-1.svg' }: { logo?: string }) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="h-8 w-auto" />
          <div className="text-lg font-bold">Enquiry</div>
        </div>
        <div className="text-sm text-slate-600">User</div>
      </div>
    </header>
  )
}
