import React, { useState } from 'react'
import AssetList from './AssetList'
import type { Asset } from '../types'

const MOCK: Asset[] = [
  { id: '1', name: 'Laptop - Dell XPS 13', location: 'Office A' },
  { id: '2', name: 'Monitor - LG UltraFine', location: 'Office B' },
  { id: '3', name: 'Phone - iPhone 14', location: 'Office A' },
]

export default function AssetSearch() {
  const [query, setQuery] = useState('')

  const results = MOCK.filter(a =>
    `${a.name} ${a.location}`.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search assets by name or location"
          className="flex-1 border rounded px-3 py-2"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
      </div>
      <AssetList items={results} />
    </div>
  )
}
