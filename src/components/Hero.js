import { motion, AnimatePresence } from 'framer-motion'
import { SITE } from '../data/content'
import { useTheme } from '../context/ThemeContext'

export default function Hero(){
  const { theme } = useTheme()

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
      {/* Theme-aware overlay: animates between light and dark */}
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: theme === 'dark' ? 0.55 : 0.18 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
          style={{ background: theme === 'dark' ? 'rgba(6,7,23,0.8)' : 'rgba(255,255,255,0.18)', backdropFilter: 'saturate(120%) blur(2px)' }}
        />
      </AnimatePresence>

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
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight ${theme === 'dark' ? 'text-blue-200' : 'text-white'}`}
            style={{ textShadow: theme === 'dark' ? '3px 3px 10px rgba(2,6,23,0.85)' : '4px 4px 12px rgba(2,6,23,0.55)' }}
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
                background: theme === 'dark' ? 'linear-gradient(90deg,#0ea5e9 0%,#7c3aed 100%)' : 'linear-gradient(90deg,#06b6d4 0%,#7c3aed 100%)',
                boxShadow: theme === 'dark' ? '0 10px 30px rgba(124,58,237,0.28)' : '0 10px 25px rgba(124,58,237,0.18)'
              }}
            >
              ভর্তি তথ্য
            </a>

            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-white shadow-md transform transition-all hover:scale-105 border border-white/20"
              style={{
                background: theme === 'dark' ? 'linear-gradient(90deg,#ef4444 0%,#f97316 100%)' : 'linear-gradient(90deg,#fb7185 0%,#f59e0b 100%)',
                boxShadow: theme === 'dark' ? '0 8px 24px rgba(249,115,22,0.18)' : '0 8px 20px rgba(245,158,11,0.12)'
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
