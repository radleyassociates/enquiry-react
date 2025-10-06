import React from 'react'
import type { Asset } from '../types'

export default function AssetList({ items }: { items: Asset[] }) {
  if (!items.length) return <div className="text-sm text-slate-500">No results</div>

  return (
    <ul className="space-y-2">
      {items.map(a => (
        <li key={a.id} className="p-3 border rounded flex justify-between items-center">
          <div>
            <div className="font-medium">{a.name}</div>
            <div className="text-sm text-slate-500">{a.location}</div>
          </div>
          <div className="text-sm text-slate-600">{a.id}</div>
        </li>
      ))}
    </ul>
  )
}
