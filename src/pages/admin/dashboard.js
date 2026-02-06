import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../hooks/useContexts'
import NoticeManager from '../../components/admin/NoticeManager'
import TeacherManager from '../../components/admin/TeacherManager'
import GalleryManager from '../../components/admin/GalleryManager'

export default function AdminDashboard() {
  const { isLoggedIn, logout, loading } = useAuth()
  const router = useRouter()
  const [tab, setTab] = useState('notices')

  if (loading) return <div className="text-center py-20">লোড হচ্ছে...</div>

  if (!isLoggedIn) {
    router.push('/admin/login')
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/admin/login')
  }

  const handleBackToWebsite = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-softgray">
      <header className="bg-navy text-white p-6 shadow">
        <div className="container flex items-center justify-between">
          <h1 className="text-2xl font-bold">অ্যাডমিন ড্যাশবোর্ড</h1>
          <div className="flex gap-3">
            <button onClick={handleBackToWebsite} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
              ওয়েবসাইটে ফিরুন
            </button>
            <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
              লগআউট
            </button>
          </div>
        </div>
      </header>

      <div className="container py-6">
        <div className="flex gap-4 mb-6 border-b border-gray-300">
          <button
            onClick={() => setTab('notices')}
            className={`px-4 py-2 font-medium ${
              tab === 'notices' ? 'border-b-2 border-navy text-navy' : 'text-gray-700'
            }`}
          >
            নোটিশ
          </button>
          <button
            onClick={() => setTab('teachers')}
            className={`px-4 py-2 font-medium ${
              tab === 'teachers' ? 'border-b-2 border-navy text-navy' : 'text-gray-700'
            }`}
          >
            শিক্ষকবৃন্দ
          </button>
          <button
            onClick={() => setTab('gallery')}
            className={`px-4 py-2 font-medium ${
              tab === 'gallery' ? 'border-b-2 border-navy text-navy' : 'text-gray-700'
            }`}
          >
            গ্যালারি
          </button>
        </div>

        {tab === 'notices' && <NoticeManager />}
        {tab === 'teachers' && <TeacherManager />}
        {tab === 'gallery' && <GalleryManager />}
      </div>
    </div>
  )
}
