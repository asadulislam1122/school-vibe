import { SITE } from '../data/content'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'loading', 'success', 'error'
  const [message, setMessage] = useState('')

  const contactVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message || 'বার্তা সফলভাবে পাঠানো হয়েছে!')
        setFormData({ name: '', email: '', message: '' })
        // Reset success message after 5 seconds
        setTimeout(() => setStatus(null), 5000)
      } else {
        setStatus('error')
        setMessage(data.message || 'বার্তা পাঠাতে ত্রুটি হয়েছে।')
      }
    } catch (error) {
      setStatus('error')
      setMessage('নেটওয়ার্ক ত্রুটি: ' + error.message)
    }
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={contactVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-navy dark:text-blue-400 mb-4">যোগাযোগ তথ্য</h2>
            <div className="space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">ঠিকানা:</span> {SITE.address}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">মোবাইল:</span>{' '}
                <a href={`tel:${SITE.phone}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                  {SITE.phone}
                </a>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">ইমেইল:</span>{' '}
                <a href={`mailto:${SITE.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                  {SITE.email}
                </a>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">অধ্যক্ষ:</span> {SITE.contactPerson}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-navy dark:text-blue-400 mb-4">বার্তা পাঠান</h2>

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-800 dark:text-green-100 rounded-lg"
              >
                <p className="font-semibold">✓ {message}</p>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-800 dark:text-red-100 rounded-lg"
              >
                <p className="font-semibold">✕ {message}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  নাম *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="আপনার নাম"
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ইমেইল *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="আপনার ইমেইল"
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  বার্তা *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="আপনার বার্তা লিখুন..."
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'পাঠাচ্ছি...' : 'পাঠিয়ে দিন'}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
