import { motion } from 'framer-motion'
import { useContent } from '../hooks/useContexts'

export default function GalleryGrid(){
  const { gallery } = useContent()

  const containerVariants = {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <motion.h3 
          initial={{opacity:0,y:10}} 
          whileInView={{opacity:1,y:0}} 
          className="text-3xl font-bold text-navy mb-12"
        >
          গ্যালারি
        </motion.h3>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {gallery.map((src, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -8 }}
              className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow group"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={src} 
                  alt={`gallery-${i}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              {/* Overlay effect on hover */}
              <div className="absolute inset-0 bg-navy/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-semibold text-lg">ছবি {i + 1}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
