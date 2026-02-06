import { useState } from 'react'
import { useContent } from '../../hooks/useContexts'

export default function NoticeManager() {
  const { notices, saveNotices } = useContent()
  const [newNotice, setNewNotice] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  const handleAdd = () => {
    if (newNotice.trim()) {
      saveNotices([...notices, newNotice])
      setNewNotice('')
    }
  }

  const handleDelete = (index) => {
    saveNotices(notices.filter((_, i) => i !== index))
  }

  const handleEdit = (index) => {
    setEditingId(index)
    setEditText(notices[index])
  }

  const handleSaveEdit = (index) => {
    const updated = [...notices]
    updated[index] = editText
    saveNotices(updated)
    setEditingId(null)
    setEditText('')
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-navy mb-4">নোটিশ যোগ করুন/সম্পাদনা করুন</h2>

      <div className="mb-6">
        <textarea
          value={newNotice}
          onChange={(e) => setNewNotice(e.target.value)}
          placeholder="নোটিশ লেখুন"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
          rows="3"
        />
        <button onClick={handleAdd} className="mt-2 btn-primary">
          যোগ করুন
        </button>
      </div>

      <div className="space-y-3">
        {notices.map((notice, i) => (
          <div key={i} className="p-4 bg-softgray rounded-md flex justify-between items-start">
            {editingId === i ? (
              <div className="flex-1">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                  rows="2"
                />
                <div className="flex gap-2">
                  <button onClick={() => handleSaveEdit(i)} className="btn-primary text-sm px-3 py-1">
                    সংরক্ষণ করুন
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 bg-gray-400 text-white rounded text-sm"
                  >
                    বাতিল
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="flex-1">{notice}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(i)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    সম্পাদনা
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                  >
                    মুছুন
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
