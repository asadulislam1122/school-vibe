import { useState } from 'react'
import { useContent } from '../../hooks/useContexts'

export default function GalleryManager() {
  const { gallery, saveGallery } = useContent()
  const [imageUrl, setImageUrl] = useState('')

  const handleAdd = () => {
    if (imageUrl.trim()) {
      saveGallery([...gallery, imageUrl])
      setImageUrl('')
    }
  }

  const handleDelete = (index) => {
    saveGallery(gallery.filter((_, i) => i !== index))
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-navy mb-4">গ্যালারি ছবি যোগ করুন/মুছুন</h2>

      <div className="mb-6">
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="ছবির URL দিন"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
        />
        <button onClick={handleAdd} className="mt-2 btn-primary">
          যোগ করুন
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gallery.map((img, i) => (
          <div key={i} className="relative group">
            <img src={img} alt={`gallery-${i}`} className="w-full h-40 object-cover rounded-md" />
            <button
              onClick={() => handleDelete(i)}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition"
            >
              মুছুন
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
