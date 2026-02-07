import Layout from '../components/Layout'
import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import RulesSection from '../components/RulesSection'

export default function Home(){
  return (
    <Layout>
      <Hero />
      <AboutSection />
      <RulesSection />
    </Layout>
  )
}
