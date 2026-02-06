import { motion } from 'framer-motion'
import { useContent } from '../hooks/useContexts'
import TeacherCard from './TeacherCard'

export default function AboutSection(){
  const { teachers } = useContent()
  return (
    <section className="py-16">
      <div className="container">
        <motion.h2 initial={{opacity:0, y:10}} whileInView={{opacity:1, y:0}} className="text-2xl font-semibold text-navy">আমাদের সম্পর্কে</motion.h2>
        <motion.p className="mt-4 text-gray-700" initial={{opacity:0}} whileInView={{opacity:1}}>বিদ্যালয়ের ইতিহাস: ভোমরাদহ উচ্চ বিদ্যালয় অবস্থান করে একটি শান্ত গ্রামে, যেটি শিক্ষার জন্য পরিচিত।</motion.p>
        <motion.h3 className="mt-6 text-xl font-medium text-navy">লক্ষ্য ও উদ্দেশ্য</motion.h3>
        <motion.p className="mt-2 text-gray-700">মানসম্মত শিক্ষার মাধ্যমে শিক্ষার্থীদের সার্বিক উন্নতি সাধন।</motion.p>

        <motion.h3 id="teachers" className="mt-8 text-xl font-semibold text-navy">শিক্ষকবৃন্দ</motion.h3>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {teachers.map((t) => (
            <TeacherCard key={t.name} name={t.name} subject={t.subject} image={t.image} />
          ))}
        </div>
      </div>
    </section>
  )
}
