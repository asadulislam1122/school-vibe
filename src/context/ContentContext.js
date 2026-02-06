import { createContext, useState, useEffect } from 'react'
import { NOTICES, TEACHERS, GALLERY } from '../data/content'

export const ContentContext = createContext()

export default function ContentProvider({ children }) {
  const [notices, setNotices] = useState(NOTICES)
  const [teachers, setTeachers] = useState(TEACHERS)
  const [gallery, setGallery] = useState(GALLERY)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedNotices = localStorage.getItem('notices')
      const savedTeachers = localStorage.getItem('teachers')
      const savedGallery = localStorage.getItem('gallery')
      if (savedNotices) setNotices(JSON.parse(savedNotices))
      if (savedTeachers) setTeachers(JSON.parse(savedTeachers))
      if (savedGallery) setGallery(JSON.parse(savedGallery))
    }
  }, [])

  const saveNotices = (newNotices) => {
    setNotices(newNotices)
    localStorage.setItem('notices', JSON.stringify(newNotices))
  }

  const saveTeachers = (newTeachers) => {
    setTeachers(newTeachers)
    localStorage.setItem('teachers', JSON.stringify(newTeachers))
  }

  const saveGallery = (newGallery) => {
    setGallery(newGallery)
    localStorage.setItem('gallery', JSON.stringify(newGallery))
  }

  return (
    <ContentContext.Provider value={{ notices, saveNotices, teachers, saveTeachers, gallery, saveGallery }}>
      {children}
    </ContentContext.Provider>
  )
}
