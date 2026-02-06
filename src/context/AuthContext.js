import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('adminLoggedIn') === 'true'
      setIsLoggedIn(loggedIn)
      setLoading(false)
    }
  }, [])

  const login = (password) => {
    if (password === 'admin2026') {
      setIsLoggedIn(true)
      localStorage.setItem('adminLoggedIn', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('adminLoggedIn')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
