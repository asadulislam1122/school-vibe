import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title ? `${title} — ভোমরাদহ উচ্চ বিদ্যালয়` : 'ভোমরাদহ উচ্চ বিদ্যালয়'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
