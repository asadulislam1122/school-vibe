import '../styles/globals.css'
import AuthProvider from '../context/AuthContext'
import ContentProvider from '../context/ContentContext'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ContentProvider>
        <Component {...pageProps} />
      </ContentProvider>
    </AuthProvider>
  )
}
