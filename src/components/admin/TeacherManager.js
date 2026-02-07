import { useState } from 'react'
import { useContent } from '../../hooks/useContexts'
import { motion } from 'framer-motion'

export default function TeacherManager() {
  const { teachers, saveTeachers } = useContent()
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({ name: '', subject: '', image: null })

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('শুধুমাত্র ছবি ফাইল নির্বাচন করুন')
        return
      }

      // Validate file size (max 3MB)
      if (file.size > 3 * 1024 * 1024) {
        alert('ফাইলের সাইজ ৩ MB এর চেয়ে বেশি হতে পারবে না')
        return
      }

      setPhotoFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setPhotoPreview(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAdd = () => {
    if (name.trim() && subject.trim() && photoFile) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const newTeacher = {
          name,
          subject,
          image: event.target.result
        }
        saveTeachers([...teachers, newTeacher])
        setName('')
        setSubject('')
        setPhotoFile(null)
        setPhotoPreview(null)
      }
      reader.readAsDataURL(photoFile)
    } else {
      alert('সব তথ্য পূরণ করুন এবং ছবি নির্বাচন করুন')
    }
  }

  const handleDelete = (index) => {
    saveTeachers(teachers.filter((_, i) => i !== index))
  }

  const handleEdit = (index) => {
    setEditingId(index)
    setEditData({ ...teachers[index] })
  }

  const handlePhotoEditSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('শুধুমাত্র ছবি ফাইল নির্বাচন করুন')
        return
      }

      if (file.size > 3 * 1024 * 1024) {
        alert('ফাইলের সাইজ ৩ MB এর চেয়ে বেশি হতে পারবে না')
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        setEditData({ ...editData, image: event.target.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveEdit = (index) => {
    if (!editData.name.trim() || !editData.subject.trim()) {
      alert('নাম এবং বিষয় পূরণ করুন')
      return
    }
    const updated = [...teachers]
    updated[index] = editData
    saveTeachers(updated)
    setEditingId(null)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold text-navy dark:text-blue-400 mb-6">শিক্ষক যোগ করুন/সম্পাদনা করুন</h2>

      {/* Add Form */}
      <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold text-navy dark:text-blue-300 mb-4">নতুন শিক্ষক যোগ করুন</h3>
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="শিক্ষকের নাম"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-navy dark:focus:ring-blue-400"
          />
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="বিষয় (যেমন: ইংরেজি, গণিত)"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-navy dark:focus:ring-blue-400"
          />

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              শিক্ষকের ছবি
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoSelect}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-navy dark:focus:ring-blue-400"
            />
            {photoPreview && (
              <div className="mt-3 flex items-center gap-4">
                <img 
                  src={photoPreview} 
                  alt="পূর্বরূপ" 
                  className="w-20 h-20 rounded-full object-cover border-2 border-navy dark:border-blue-400"
                />
                <p className="text-sm text-gray-600 dark:text-gray-300">ছবি নির্বাচিত</p>
              </div>
            )}
          </div>

          <motion.button 
            onClick={handleAdd}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary w-full"
          >
            যোগ করুন
          </motion.button>
        </div>
      </div>

      {/* Teachers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teachers.length > 0 ? (
          teachers.map((teacher, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              {editingId === i ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    placeholder="শিক্ষকের নাম"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={editData.subject}
                    onChange={(e) => setEditData({ ...editData, subject: e.target.value })}
                    placeholder="বিষয়"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ছবি পরিবর্তন করুন
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoEditSelect}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <motion.button
                      onClick={() => handleSaveEdit(i)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 btn-primary text-sm px-3 py-2"
                    >
                      সংরক্ষণ করুন
                    </motion.button>
                    <motion.button
                      onClick={() => setEditingId(null)}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-3 py-2 bg-gray-400 dark:bg-gray-600 text-white rounded text-sm hover:bg-gray-500 dark:hover:bg-gray-500"
                    >
                      বাতিল
                    </motion.button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-3">
                    <img 
                      src={typeof teacher.image === 'string' ? teacher.image : teacher.image} 
                      alt={teacher.name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-navy dark:border-blue-400"
                    />
                    <div>
                      <h4 className="font-semibold text-navy dark:text-blue-300">{teacher.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{teacher.subject}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => handleEdit(i)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-3 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded text-sm hover:bg-blue-700 dark:hover:bg-blue-600"
                    >
                      সম্পাদনা
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(i)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-3 py-2 bg-red-600 dark:bg-red-700 text-white rounded text-sm hover:bg-red-700 dark:hover:bg-red-600"
                    >
                      মুছুন
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 dark:text-gray-400 font-medium">কোন শিক্ষক যুক্ত করা হয়নি</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
