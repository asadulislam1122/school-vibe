import { motion } from 'framer-motion'

export default function TeacherCard({ name, subject, image }){
  // Handle both old format (URL string) and new format (base64 string)
  const imageSrc = typeof image === 'string' ? image : image?.src || image
  
  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }} 
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900 hover:shadow-xl dark:hover:shadow-gray-700 overflow-hidden p-6 flex flex-col items-center text-center group"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
        className="w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-blue-100 dark:border-gray-700"
      >
        <img 
          src={imageSrc} 
          alt={name} 
          className="w-full h-full object-cover" 
          loading="lazy"
        />
      </motion.div>
      
      <h4 className="text-lg font-semibold text-navy dark:text-blue-400 mb-1">{name}</h4>
      <p className="text-blue-600 dark:text-blue-300 font-medium text-sm">{subject}</p>
      
      <div className="w-12 h-1 bg-blue-400 dark:bg-blue-500 rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  )
}
