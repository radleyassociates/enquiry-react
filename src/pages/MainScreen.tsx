import React from 'react'
import Header from '../shared/Header'
import AssetSearch from '../shared/AssetSearch'

export default function MainScreen() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="p-6">
        <h2 className="text-xl font-semibold mb-4">Assets</h2>
        <AssetSearch />
      </main>
    </div>
  )
}
