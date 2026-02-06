import { motion } from 'framer-motion'

export default function TeacherCard({ name, subject, image }){
  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }} 
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden p-6 flex flex-col items-center text-center"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
        className="w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-blue-100"
      >
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </motion.div>
      
      <h4 className="text-lg font-semibold text-navy mb-1">{name}</h4>
      <p className="text-blue-600 font-medium">{subject}</p>
      
      <div className="w-12 h-1 bg-blue-400 rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  )
}
