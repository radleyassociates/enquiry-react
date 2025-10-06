import { useState } from 'react'

// Very small auth helper — replace with real auth later
export function useAuth() {
  const [isAuthenticated] = useState<boolean>(true)
  return { isAuthenticated }
}
