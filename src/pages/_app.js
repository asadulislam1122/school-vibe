import '../styles/globals.css'
import AuthProvider from '../context/AuthContext'
import ContentProvider from '../context/ContentContext'
import { ThemeProvider } from '../context/ThemeContext'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ContentProvider>
          <Component {...pageProps} />
        </ContentProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
