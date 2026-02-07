import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ContentContext } from '../context/ContentContext'
import { NoticeContext } from '../context/NoticeContext'

export function useAuth() {
  return useContext(AuthContext)
}

export function useContent() {
  return useContext(ContentContext)
}

export function useNotices() {
  return useContext(NoticeContext)
}
