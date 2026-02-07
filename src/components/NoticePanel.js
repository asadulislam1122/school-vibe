import { useState, useEffect } from 'react'
import { useNotices } from '../hooks/useContexts'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * NoticePanel Component
 * Features:
 * - Displays notices in a dropdown from navbar notification bell
 * - Shows unread count badge
 * - Mark as read, mark all as read, clear all
 * - Auto-updates when notices change
 * - Responsive mobile/desktop design
 */
export default function NoticePanel() {
  const { notices, unreadCount, markAsRead, markAllAsRead, deleteNotice } = useNotices()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Format timestamp to readable string
  const formatTime = (timestamp) => {
    const now = Date.now()
    const diff = now - timestamp

    // Less than 1 minute
    if (diff < 60000) return 'এখনই'

    // Less than 1 hour
    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000)
      return `${minutes} মিনিট আগে`
    }

    // Less than 1 day
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000)
      return `${hours} ঘণ্টা আগে`
    }

    // Less than 7 days
    if (diff < 604800000) {
      const days = Math.floor(diff / 86400000)
      return `${days} দিন আগে`
    }

    // Otherwise show date
    return new Date(timestamp).toLocaleDateString('bn-BD')
  }

  // Panel animation variants
  const panelVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  }

  // Notice item animation
  const noticeVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 }
  }

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-lg transition-all duration-200 ${
          isOpen
            ? 'bg-blue-100 text-blue-600'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        aria-label="Notices"
        aria-expanded={isOpen}
      >
        {/* Bell icon SVG */}
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {/* Unread count badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 ${
              isMobile ? 'w-full sm:w-80' : 'w-96'
            }`}
          >
            {/* Panel header */}
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">নোটিশ বোর্ড</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Stats */}
              <p className="text-xs text-gray-600">
                মোট: {notices.length} | অপঠিত: {unreadCount}
              </p>
            </div>

            {/* Notices list */}
            <div className="max-h-[400px] overflow-y-auto">
              {notices.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p>কোনো নোটিশ নেই</p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {notices.map((notice) => (
                    <motion.div
                      key={notice.id}
                      variants={noticeVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition ${
                        notice.unread ? 'bg-blue-50' : 'bg-white'
                      }`}
                    >
                      <div className="flex gap-3">
                        {/* Visual indicator for unread */}
                        {notice.unread && (
                          <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                        )}

                        {/* Notice content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className={`font-semibold text-sm truncate ${
                              notice.unread ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notice.title}
                            </h4>
                            {notice.unread && (
                              <span className="inline-block px-2 py-0.5 bg-blue-600 text-white text-xs font-medium rounded flex-shrink-0">
                                নতুন
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                            {notice.body}
                          </p>

                          <p className="text-xs text-gray-500">
                            {formatTime(notice.timestamp)}
                          </p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-1 mt-2 ml-5">
                        {notice.unread && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              markAsRead(notice.id)
                            }}
                            className="flex-1 px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 font-medium transition"
                          >
                            পড়া হিসেবে চিহ্নিত
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            if (window.confirm('এই নোটিশটি মুছে ফেলবেন?')) {
                              deleteNotice(notice.id)
                            }
                          }}
                          className="flex-1 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 font-medium transition"
                        >
                          মুছুন
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Panel footer with bulk actions */}
            {notices.length > 0 && (
              <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="w-full px-3 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 font-medium transition"
                  >
                    সব পড়া হিসেবে চিহ্নিত করুন
                  </button>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
