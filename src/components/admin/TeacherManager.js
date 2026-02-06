import { useState } from 'react'
import { useContent } from '../../hooks/useContexts'

export default function TeacherManager() {
  const { teachers, saveTeachers } = useContent()
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [image, setImage] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({ name: '', subject: '', image: '' })

  const handleAdd = () => {
    if (name.trim() && subject.trim()) {
      saveTeachers([...teachers, { name, subject, image: image || '/images/teacher1.svg' }])
      setName('')
      setSubject('')
      setImage('')
    }
  }

  const handleDelete = (index) => {
    saveTeachers(teachers.filter((_, i) => i !== index))
  }

  const handleEdit = (index) => {
    setEditingId(index)
    setEditData({ ...teachers[index] })
  }

  const handleSaveEdit = (index) => {
    const updated = [...teachers]
    updated[index] = editData
    saveTeachers(updated)
    setEditingId(null)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-navy mb-4">শিক্ষক যোগ করুন/সম্পাদনা করুন</h2>

      <div className="mb-6 space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="শিক্ষকের নাম"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
        />
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="বিষয়"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="ছবির URL (ছাড়াই বেঠিক)"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
        />
        <button onClick={handleAdd} className="btn-primary">
          যোগ করুন
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teachers.map((teacher, i) => (
          <div key={i} className="p-4 bg-softgray rounded-md">
            {editingId === i ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="w-full p-2 border rounded text-sm"
                />
                <input
                  type="text"
                  value={editData.subject}
                  onChange={(e) => setEditData({ ...editData, subject: e.target.value })}
                  className="w-full p-2 border rounded text-sm"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveEdit(i)}
                    className="btn-primary text-sm px-3 py-1"
                  >
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
                <img src={teacher.image} alt={teacher.name} className="w-20 h-20 rounded-full mb-2" />
                <h4 className="font-semibold text-navy">{teacher.name}</h4>
                <p className="text-gray-600 text-sm">{teacher.subject}</p>
                <div className="mt-3 flex gap-2">
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
