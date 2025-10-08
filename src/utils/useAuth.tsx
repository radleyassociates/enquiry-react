import { useState } from 'react'

export function useAuth() {
  const [isAuthenticated] = useState<boolean>(true)
  return { isAuthenticated }
}
