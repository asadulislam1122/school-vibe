import { motion } from 'framer-motion'
import { SITE } from '../data/content'

export default function Hero(){
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  return (
    <section className="relative min-h-[70vh] bg-gradient-to-br from-navy via-blue-900 to-blue-800 overflow-hidden flex items-center">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full opacity-10 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full opacity-10 blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="container relative z-10 text-center py-20 sm:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          >
            {SITE.name}
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl sm:text-2xl text-blue-100 font-medium max-w-2xl mx-auto"
          >
            {SITE.tagline}
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
          >
            <a 
              href="/about" 
              className="btn-primary bg-white text-navy hover:bg-gray-50 hover:text-navy"
            >
              ভর্তি তথ্য
            </a>
            <a 
              href="/contact" 
              className="btn-secondary border-white text-white hover:bg-white hover:text-navy"
            >
              যোগাযোগ করুন
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
