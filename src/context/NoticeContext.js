import { createContext, useState, useEffect, useCallback } from 'react'

// NoticeContext - manages school notices with localStorage persistence
// Features: auto-update unread count, mark as read, clear all, in-place updates
export const NoticeContext = createContext()

export function NoticeProvider({ children }) {
  // State management for notices
  const [notices, setNotices] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  // Storage key (localStorage key name)
  const STORAGE_KEY = 'school_notices_v2'

  // Load notices from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setNotices(parsed)
        // Calculate unread count
        const count = parsed.filter(n => n.unread).length
        setUnreadCount(count)
      } else {
        // Seed with default notices if first time
        const defaultNotices = [
          {
            id: Date.now() + 1,
            title: '২০२६ সালের বার্ষিক ক্রীড়া প্রতিযোগিতা',
            body: 'আগামী ১৫ই মার্চ।',
            timestamp: Date.now(),
            unread: true
          },
          {
            id: Date.now() + 2,
            title: 'শীতকালীন ছুটি ঘোষণা',
            body: '১লা জানুয়ারি থেকে ১৫ই জানুয়ারি পর্যন্ত।',
            timestamp: Date.now() + 1000,
            unread: true
          },
          {
            id: Date.now() + 3,
            title: 'নতুন ভবন উদ্বোধন অনুষ্ঠান',
            body: '২০শে ফেব্রুয়ারি।',
            timestamp: Date.now() + 2000,
            unread: true
          }
        ]
        setNotices(defaultNotices)
        setUnreadCount(3)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultNotices))
      }
    } catch (error) {
      console.error('Failed to load notices from localStorage:', error)
      setNotices([])
      setUnreadCount(0)
    }
  }, [])

  // Save notices to localStorage
  const saveToLocalStorage = useCallback((noticeList) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(noticeList))
    } catch (error) {
      console.error('Failed to save notices to localStorage:', error)
    }
  }, [])

  // Add new notice
  const addNotice = useCallback((title, body) => {
    const newNotice = {
      id: Date.now() + Math.random(),
      title: title.trim(),
      body: body.trim(),
      timestamp: Date.now(),
      unread: true
    }
    const updated = [newNotice, ...notices]
    setNotices(updated)
    setUnreadCount(prev => prev + 1)
    saveToLocalStorage(updated)
    return newNotice
  }, [notices, saveToLocalStorage])

  // Delete notice by id
  const deleteNotice = useCallback((id) => {
    const notice = notices.find(n => n.id === id)
    const updated = notices.filter(n => n.id !== id)
    setNotices(updated)

    // Adjust unread count
    if (notice && notice.unread) {
      setUnreadCount(prev => Math.max(0, prev - 1))
    }

    saveToLocalStorage(updated)
  }, [notices, saveToLocalStorage])

  // Update notice (title/body)
  const updateNotice = useCallback((id, title, body) => {
    const updated = notices.map(n =>
      n.id === id ? { ...n, title: title.trim(), body: body.trim() } : n
    )
    setNotices(updated)
    saveToLocalStorage(updated)
  }, [notices, saveToLocalStorage])

  // Mark single notice as read
  const markAsRead = useCallback((id) => {
    const notice = notices.find(n => n.id === id)
    if (notice && notice.unread) {
      const updated = notices.map(n =>
        n.id === id ? { ...n, unread: false } : n
      )
      setNotices(updated)
      setUnreadCount(prev => Math.max(0, prev - 1))
      saveToLocalStorage(updated)
    }
  }, [notices, saveToLocalStorage])

  // Mark all notices as read
  const markAllAsRead = useCallback(() => {
    const updated = notices.map(n => ({ ...n, unread: false }))
    setNotices(updated)
    setUnreadCount(0)
    saveToLocalStorage(updated)
  }, [notices, saveToLocalStorage])

  // Clear all notices
  const clearAllNotices = useCallback(() => {
    setNotices([])
    setUnreadCount(0)
    saveToLocalStorage([])
  }, [saveToLocalStorage])

  // Get notices sorted by newest first
  const getSortedNotices = useCallback(() => {
    return [...notices].sort((a, b) => b.timestamp - a.timestamp)
  }, [notices])

  // Context value object
  const value = {
    notices: getSortedNotices(),
    unreadCount,
    addNotice,
    deleteNotice,
    updateNotice,
    markAsRead,
    markAllAsRead,
    clearAllNotices
  }

  return (
    <NoticeContext.Provider value={value}>
      {children}
    </NoticeContext.Provider>
  )
}
