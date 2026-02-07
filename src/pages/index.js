import Layout from '../components/Layout'
import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import RulesSection from '../components/RulesSection'
import NoticeBoard from '../components/NoticeBoard'

export default function Home(){
  return (
    <Layout>
      <Hero />
      <AboutSection />
      <RulesSection />
      <NoticeBoard />
    </Layout>
  )
}
