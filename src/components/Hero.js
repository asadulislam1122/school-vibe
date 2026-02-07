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
    <section 
      className="relative min-h-[70vh] bg-cover bg-center bg-no-repeat overflow-hidden flex items-center"
      style={{
        backgroundImage: `url('https://i.ibb.co.com/v4VHNpHs/295366678-477350424391186-8583708420477563616-n.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* No color overlay — clear image as requested */}
      <div className="absolute inset-0 bg-transparent"></div>

      {/* Decorative shapes - optional */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full opacity-5 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full opacity-5 blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="container relative z-10 text-center py-20 sm:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight"
            style={{
              textShadow: '4px 4px 12px rgba(2,6,23,0.7)'
            }}
          >
            {SITE.name}
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl sm:text-2xl text-blue-50 font-medium max-w-2xl mx-auto"
            style={{
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
            }}
          >
            {SITE.tagline}
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
          >
            <a 
              href="/about" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-white shadow-lg transform transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(90deg,#06b6d4 0%,#7c3aed 100%)',
                boxShadow: '0 10px 25px rgba(124,58,237,0.18)'
              }}
            >
              ভর্তি তথ্য
            </a>

            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-white shadow-md transform transition-all hover:scale-105 border border-white/20"
              style={{
                background: 'linear-gradient(90deg,#fb7185 0%,#f59e0b 100%)',
                boxShadow: '0 8px 20px rgba(245,158,11,0.12)'
              }}
            >
              যোগাযোগ করুন
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
