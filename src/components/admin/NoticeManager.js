import { useState } from 'react'
import { useNotices } from '../../hooks/useContexts'

export default function NoticeManager() {
  // Get notice functions from context
  const { notices, unreadCount, addNotice, deleteNotice, updateNotice, markAsRead, markAllAsRead, clearAllNotices } = useNotices()

  // Local state for form inputs
  const [newTitle, setNewTitle] = useState('')
  const [newBody, setNewBody] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  // Handle adding new notice
  const handleAdd = () => {
    if (newTitle.trim() && newBody.trim()) {
      addNotice(newTitle, newBody)
      setNewTitle('')
      setNewBody('')
    } else {
      alert('শিরোনাম এবং বিষয়বস্তু উভয়ই প্রয়োজন')
    }
  }

  // Handle starting edit
  const handleEditStart = (notice) => {
    setEditingId(notice.id)
    setEditTitle(notice.title)
    setEditBody(notice.body)
  }

  // Handle saving edit
  const handleEditSave = () => {
    if (editTitle.trim() && editBody.trim()) {
      updateNotice(editingId, editTitle, editBody)
      setEditingId(null)
      setEditTitle('')
      setEditBody('')
    } else {
      alert('শিরোনাম এবং বিষয়বস্তু উভয়ই প্রয়োজন')
    }
  }

  // Handle cancel edit
  const handleEditCancel = () => {
    setEditingId(null)
    setEditTitle('')
    setEditBody('')
  }

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('এই নোটিশটি মুছে ফেলতে চান?')) {
      deleteNotice(id)
    }
  }

  // Handle clear all with confirmation
  const handleClearAll = () => {
    if (window.confirm('সমস্ত নোটিশ মুছে ফেলবেন? এটি পূর্বাবাস করা যাবে না।')) {
      clearAllNotices()
      setShowClearConfirm(false)
    }
  }

  // Format timestamp to readable string
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('bn-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {/* Header with unread count and action buttons */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-navy">নোটিশ ব্যবস্থাপনা</h2>
            <p className="text-sm text-gray-600 mt-1">মোট নোটিশ: {notices.length} | অপঠিত: {unreadCount}</p>
          </div>
          <div className="flex gap-2">
            {notices.length > 0 && unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium text-sm"
              >
                সবাইকে পড়া হিসেবে চিহ্নিত করুন
              </button>
            )}
            {notices.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium text-sm"
              >
                সব মুছুন
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Add new notice form */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-navy mb-4">নতুন নোটিশ যোগ করুন</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">শিরোনাম *</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="যেমন: পরীক্ষা সূচী ঘোষণা"
              maxLength="100"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
            />
            <p className="text-xs text-gray-500 mt-1">{newTitle.length}/100</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">বিষয়বস্তু *</label>
            <textarea
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              placeholder="নোটিশের বিস্তারিত বিষয়বস্তু লিখুন..."
              rows="4"
              maxLength="500"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy resize-vertical"
            />
            <p className="text-xs text-gray-500 mt-1">{newBody.length}/500</p>
          </div>

          <button
            onClick={handleAdd}
            className="px-6 py-2 bg-navy text-white rounded-md hover:bg-blue-800 font-medium transition"
          >
            নোটিশ যোগ করুন
          </button>
        </div>
      </div>

      {/* Clear all confirmation dialog */}
      {showClearConfirm && (
        <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg">
          <p className="text-red-800 font-medium mb-3">সতর্কতা: সমস্ত নোটিশ মুছে ফেলা হবে এবং পুনরুদ্ধার করা যাবে না।</p>
          <div className="flex gap-2">
            <button
              onClick={handleClearAll}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium text-sm"
            >
              নিশ্চিত, সব মুছুন
            </button>
            <button
              onClick={() => setShowClearConfirm(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 font-medium text-sm"
            >
              বাতিল করুন
            </button>
          </div>
        </div>
      )}

      {/* Notices list */}
      <div>
        <h3 className="text-lg font-semibold text-navy mb-4">
          নোটিশগুলি ({notices.length > 0 ? notices.length : 'কোনটি নেই'})
        </h3>

        {notices.length === 0 ? (
          <div className="p-6 text-center bg-gray-50 rounded-lg text-gray-600">
            <p>এখনও কোনো নোটিশ যোগ করা হয়নি।</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className={`p-4 rounded-lg border-l-4 transition ${
                  editingId === notice.id
                    ? 'bg-blue-50 border-l-blue-600'
                    : notice.unread
                    ? 'bg-yellow-50 border-l-yellow-500'
                    : 'bg-white border-l-gray-300'
                }`}
              >
                {editingId === notice.id ? (
                  // Edit mode
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      maxLength="100"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-navy text-sm"
                    />
                    <textarea
                      value={editBody}
                      onChange={(e) => setEditBody(e.target.value)}
                      maxLength="500"
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-navy text-sm resize-vertical"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleEditSave}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 font-medium transition"
                      >
                        সংরক্ষণ
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="px-3 py-1 bg-gray-400 text-white rounded text-sm hover:bg-gray-500 font-medium transition"
                      >
                        বাতিল
                      </button>
                    </div>
                  </div>
                ) : (
                  // View mode
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{notice.title}</h4>
                        <p className="text-gray-700 mt-1 text-sm">{notice.body}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {formatTime(notice.timestamp)}
                          {notice.unread && <span className="ml-2 inline-block px-2 py-0.5 bg-yellow-200 text-yellow-800 rounded text-xs font-medium">অপঠিত</span>}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-200">
                      {notice.unread && (
                        <button
                          onClick={() => markAsRead(notice.id)}
                          className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 font-medium transition"
                        >
                          পড়া হিসেবে চিহ্নিত
                        </button>
                      )}
                      <button
                        onClick={() => handleEditStart(notice)}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 font-medium transition"
                      >
                        সম্পাদনা
                      </button>
                      <button
                        onClick={() => handleDelete(notice.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 font-medium transition"
                      >
                        মুছুন
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
