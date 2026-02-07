import { useState } from 'react'
import { useContent } from '../../hooks/useContexts'
import { motion } from 'framer-motion'

export default function GalleryManager() {
  const { gallery, saveGallery } = useContent()
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    
    files.forEach(file => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('শুধুমাত্র ছবি ফাইল নির্বাচন করুন')
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('ফাইলের সাইজ ৫ MB এর চেয়ে বেশি হতে পারবে না')
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const imageData = {
          src: event.target.result,
          name: file.name,
          uploadedAt: new Date().toISOString()
        }
        saveGallery([...gallery, imageData])
      }
      reader.readAsDataURL(file)
    })

    // Reset input
    if (e.target) e.target.value = ''
  }

  const handleDelete = (index) => {
    saveGallery(gallery.filter((_, i) => i !== index))
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold text-navy dark:text-blue-400 mb-6">গ্যালারি ছবি যোগ করুন/মুছুন</h2>

      {/* File Upload Area */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="file"
            id="gallery-upload"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
          <label
            htmlFor="gallery-upload"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                ছবি নির্বাচন করতে ক্লিক করুন বা টেনে ফেলুন
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                PNG, JPG, GIF (Max 5MB)
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Gallery Grid */}
      {gallery.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold text-navy dark:text-blue-400 mb-4">
            আপলোড করা ছবি ({gallery.length})
          </h3>
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            {gallery.map((image, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group"
              >
                <div className="w-full h-40 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <img 
                    src={typeof image === 'string' ? image : image.src} 
                    alt={`gallery-${i}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                {/* Delete Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(i)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  title="মুছুন"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </motion.button>

                {/* Image Info */}
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 rounded-lg transition-colors flex items-end justify-center opacity-0 group-hover:opacity-100 p-2">
                  <p className="text-white text-xs font-semibold text-center">ছবি {i + 1}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 font-medium">এখনো কোন ছবি আপলোড করা হয়নি</p>
        </div>
      )}
    </motion.div>
  )
}
