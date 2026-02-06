import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../hooks/useContexts'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (login(password)) {
      router.push('/admin/dashboard')
    } else {
      setError('পাসওয়ার্ড ভুল। চেষ্টা করুন।')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-softgray">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-navy text-center">অ্যাডমিন লগইন</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">পাসওয়ার্ড</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="পাসওয়ার্ড দিন"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" className="w-full btn-primary">
            লগইন করুন
          </button>
        </form>
      </div>
    </div>
  )
}
