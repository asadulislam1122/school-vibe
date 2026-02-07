import '../styles/globals.css'
import AuthProvider from '../context/AuthContext'
import ContentProvider from '../context/ContentContext'
import { ThemeProvider } from '../context/ThemeContext'
import { NoticeProvider } from '../context/NoticeContext'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ContentProvider>
          <NoticeProvider>
            <Component {...pageProps} />
          </NoticeProvider>
        </ContentProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
