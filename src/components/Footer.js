import { SITE } from '../data/content'
import { motion } from 'framer-motion'

export default function Footer(){
  const socialLinks = [
    { icon: '📞', label: 'Phone', href: `tel:${SITE.phone}` },
    { icon: '📧', label: 'Email', href: `mailto:${SITE.email}` },
    { icon: 'https://img.icons8.com/fluency/24/ffffff/facebook-new.png', label: 'Facebook', href: SITE.social.facebook, isImg: true },
    { icon: 'https://img.icons8.com/fluency/24/ffffff/linkedin.png', label: 'LinkedIn', href: SITE.social.linkedin, isImg: true },
    { icon: 'https://img.icons8.com/fluency/24/ffffff/discord.png', label: 'Discord', href: SITE.social.discord, isImg: true }
  ]

  return (
    <footer className="bg-navy dark:bg-gray-950 text-white py-12 border-t-4 border-blue-600">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* School Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <img 
                src="https://img.icons8.com/emoji/36/school-emoji.png" 
                alt="School" 
                className="w-8 h-8"
              />
              {SITE.name}
            </h3>
            <p className="text-blue-100 text-sm mb-4">আধুনিক শিক্ষা এবং ছাত্রদের সার্বিক উন্নয়নে নিবেদিত।</p>
            <p className="text-blue-200 text-xs">© {new Date().getFullYear()} {SITE.name}। সর্বস্বত্ব সংরক্ষিত।</p>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">যোগাযোগ তথ্য</h4>
            <div className="space-y-2 text-blue-100 text-sm">
              <p>📍 {SITE.address}</p>
              <a href={`tel:${SITE.phone}`} className="flex items-center gap-2 hover:text-white transition">
                <span>📞</span> {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-white transition">
                <span>📧</span> {SITE.email}
              </a>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">আমাদের সাথে যুক্ত হন</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  title={link.label}
                  className="w-10 h-10 bg-blue-700 hover:bg-blue-600 rounded-lg flex items-center justify-center text-lg transition-colors"
                >
                  {link.isImg ? (
                    <img src={link.icon} alt={link.label} className="w-5 h-5" />
                  ) : (
                    link.icon
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-blue-600 pt-6 flex flex-col sm:flex-row items-center justify-between origin-left"
        >
          <p className="text-blue-200 text-sm mb-3 sm:mb-0">
            পরিচালনায়: <span className="font-semibold text-white">{SITE.contactPerson}</span>
          </p>
          <p className="text-blue-300 text-xs">
            ডিজিটালি নির্মিত আধুনিক প্রযুক্তিতে
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
