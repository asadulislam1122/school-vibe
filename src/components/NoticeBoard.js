import { motion } from 'framer-motion'
import { useContent } from '../hooks/useContexts'

export default function NoticeBoard(){
  const { notices } = useContent()

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  }

  return (
    <section className="py-16 bg-blue-50">
      <div className="container">
        <motion.h3 
          initial={{opacity:0,y:10}} 
          whileInView={{opacity:1,y:0}} 
          className="text-3xl font-bold text-navy mb-8"
        >
          📢 নোটিশ বোর্ড
        </motion.h3>

        <motion.ul 
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {notices.map((n, i) => (
            <motion.li 
              key={i}
              variants={itemVariants}
              whileHover={{ x: 8 }}
              className="p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-600 cursor-pointer"
            >
              <p className="text-gray-800 font-medium">{n}</p>
              <p className="text-blue-500 text-xs mt-2">নোটিশ #{i + 1}</p>
            </motion.li>
          ))}
        </motion.ul>

        {notices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">কোনো নোটিশ নেই</p>
          </div>
        )}
      </div>
    </section>
  )
}
