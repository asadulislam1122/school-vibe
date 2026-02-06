import Link from 'next/link'
import { useRouter } from 'next/router'
import { MENU } from '../data/content'
import { useState } from 'react'
import { useAuth } from '../hooks/useContexts'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { isLoggedIn, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-navy font-bold text-xl hover:text-blue-600 transition">ভোমরাদহ উচ্চ বিদ্যালয়</Link>
        
        <nav className="hidden md:flex space-x-8 items-center">
          {MENU.map((m) => (
            <Link 
              key={m.href} 
              href={m.href} 
              className="text-gray-700 hover:text-navy font-medium transition-colors border-b-2 border-transparent hover:border-blue-600"
            >
              {m.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <>
              <Link 
                href="/admin/dashboard" 
                className="btn-primary text-sm"
              >
                ড্যাশবোর্ড
              </Link>
              <button 
                onClick={handleLogout} 
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm"
              >
                লগআউট
              </button>
            </>
          ) : (
            <Link href="/admin/login" className="btn-primary text-sm">
              অ্যাডমিন
            </Link>
          )}
        </nav>

        <button 
          className="md:hidden text-navy font-bold text-lg" 
          onClick={() => setOpen(!open)} 
          aria-label="toggle menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200">
          <div className="container py-4 flex flex-col space-y-3">
            {MENU.map((m) => (
              <Link 
                key={m.href} 
                href={m.href} 
                className="text-gray-700 hover:text-navy font-medium py-2 transition"
                onClick={() => setOpen(false)}
              >
                {m.label}
              </Link>
            ))}
            <div className="border-t border-gray-300 pt-3 space-y-2">
              {isLoggedIn ? (
                <>
                  <Link 
                    href="/admin/dashboard" 
                    className="block btn-primary text-center text-sm"
                    onClick={() => setOpen(false)}
                  >
                    ড্যাশবোর্ড
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout()
                      setOpen(false)
                    }} 
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm"
                  >
                    লগআউট
                  </button>
                </>
              ) : (
                <Link 
                  href="/admin/login" 
                  className="block btn-primary text-center text-sm"
                  onClick={() => setOpen(false)}
                >
                  অ্যাডমিন
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
