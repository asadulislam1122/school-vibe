import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ContentContext } from '../context/ContentContext'

export function useAuth() {
  return useContext(AuthContext)
}

export function useContent() {
  return useContext(ContentContext)
}
