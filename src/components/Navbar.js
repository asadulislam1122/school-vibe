import Link from 'next/link'
import { useRouter } from 'next/router'
import { MENU, SITE } from '../data/content'
import { useState } from 'react'
import { useAuth } from '../hooks/useContexts'
import { useTheme } from '../context/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { isLoggedIn, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  // Framer Motion variants
  const headerVariants = {
    hidden: { y: -80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  const menuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
        ease: 'easeOut'
      }
    })
  }

  const mobileMenuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  }

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: 'easeOut'
      }
    })
  }

  const handleThemeToggle = () => {
    // GSAP animation for smooth spin effect
    const themeBtn = document.querySelector('[data-theme-btn]')
    if (themeBtn) {
      gsap.to(themeBtn, {
        rotation: 360,
        duration: 0.6,
        ease: 'back.out'
      })
    }
    toggleTheme()
  }

  const handleMenuHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.2,
      ease: 'power2.out'
    })
  }

  const handleMenuHoverEnd = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out'
    })
  }

  return (
    <>
      {/* Top Info Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden sm:block bg-navy dark:bg-gray-950 text-white py-2 border-b border-blue-700"
      >
        <div className="container flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-4 flex-wrap">
            <a href={`tel:${SITE.phone}`} className="flex items-center gap-1 hover:text-blue-300 transition">
              <span>📞</span>
              <span>{SITE.phone}</span>
            </a>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-1 hover:text-blue-300 transition">
              <span>📧</span>
              <span>{SITE.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition" title="ফেসবুক" aria-label="Facebook">
              <img src="https://img.icons8.com/fluency/24/000000/facebook-new.png" alt="Facebook" className="w-5 h-5" />
            </a>
            <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition" title="লিঙ্কডইন" aria-label="LinkedIn">
              <img src="https://img.icons8.com/fluency/24/000000/linkedin.png" alt="LinkedIn" className="w-5 h-5" />
            </a>
            <a href={SITE.social.discord} target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition" title="ডিসকর্ড" aria-label="Discord">
              <img src="https://img.icons8.com/fluency/24/000000/discord.png" alt="Discord" className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.div>
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md dark:shadow-lg dark:shadow-gray-800"
    >
      <div className="container flex items-center justify-between py-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition"
            title="ভোমরাদহ উচ্চ বিদ্যালয়"
          >
            <img 
              src="https://img.icons8.com/emoji/48/school-emoji.png" 
              alt="School" 
              className="w-10 h-10"
            />
            <span className="text-navy dark:text-blue-400 font-bold text-lg hidden sm:inline">স্কুল</span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <motion.nav className="hidden md:flex space-x-8 items-center">
          {MENU.map((m, i) => (
            <motion.div
              key={m.href}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={menuItemVariants}
              onMouseEnter={handleMenuHover}
              onMouseLeave={handleMenuHoverEnd}
            >
              <Link
                href={m.href}
                className="text-gray-700 dark:text-gray-300 hover:text-navy dark:hover:text-blue-400 font-medium transition-colors border-b-2 border-transparent hover:border-blue-600 dark:hover:border-blue-400 py-1"
              >
                {m.label}
              </Link>
            </motion.div>
          ))}

          {isLoggedIn ? (
            <>
              <motion.div
                custom={MENU.length}
                initial="hidden"
                animate="visible"
                variants={menuItemVariants}
                onMouseEnter={handleMenuHover}
                onMouseLeave={handleMenuHoverEnd}
              >
                <Link href="/admin/dashboard" className="btn-navbar">
                  ড্যাশবোর্ড
                </Link>
              </motion.div>
              <motion.button
                custom={MENU.length + 1}
                initial="hidden"
                animate="visible"
                variants={menuItemVariants}
                onClick={handleLogout}
                className="btn-danger-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                লগআউট
              </motion.button>
            </>
          ) : (
            <motion.div
              custom={MENU.length}
              initial="hidden"
              animate="visible"
              variants={menuItemVariants}
              onMouseEnter={handleMenuHover}
              onMouseLeave={handleMenuHoverEnd}
            >
              <Link href="/admin/login" className="btn-navbar">
                অ্যাডমিন
              </Link>
            </motion.div>
          )}

          {/* Theme Toggle Desktop */}
          <motion.button
            custom={MENU.length + 2}
            initial="hidden"
            animate="visible"
            variants={menuItemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleThemeToggle}
            data-theme-btn
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-yellow-500 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition animate-glow"
            aria-label="toggle theme"
            title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </motion.button>
        </motion.nav>

        {/* Mobile Controls */}
        <motion.div className="md:hidden flex items-center gap-4">
          {/* Theme Toggle Mobile */}
          <motion.button
            onClick={handleThemeToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            data-theme-btn
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-yellow-500 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition animate-glow"
            aria-label="toggle theme"
            title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setOpen(!open)}
            className="text-navy dark:text-blue-400 font-bold text-lg"
            aria-label="toggle menu"
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <motion.div
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {open ? '✕' : '☰'}
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="md:hidden bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="container py-4 flex flex-col space-y-3">
              {MENU.map((m, i) => (
                <motion.div
                  key={m.href}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={mobileItemVariants}
                >
                  <Link
                    href={m.href}
                    className="text-gray-700 dark:text-gray-300 hover:text-navy dark:hover:text-blue-400 font-medium py-2 transition block"
                    onClick={() => setOpen(false)}
                  >
                    {m.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                className="border-t border-gray-300 dark:border-gray-700 pt-3 space-y-2 origin-top"
              >
                {isLoggedIn ? (
                  <>
                    <motion.div
                      custom={MENU.length}
                      initial="hidden"
                      animate="visible"
                      variants={mobileItemVariants}
                    >
                      <Link
                        href="/admin/dashboard"
                        className="block btn-navbar w-full text-center"
                        onClick={() => setOpen(false)}
                      >
                        ড্যাশবোর্ড
                      </Link>
                    </motion.div>
                    <motion.button
                      custom={MENU.length + 1}
                      initial="hidden"
                      animate="visible"
                      variants={mobileItemVariants}
                      onClick={() => {
                        handleLogout()
                        setOpen(false)
                      }}
                      className="w-full btn-danger-sm"
                    >
                      লগআউট
                    </motion.button>
                  </>
                ) : (
                  <motion.div
                    custom={MENU.length}
                    initial="hidden"
                    animate="visible"
                    variants={mobileItemVariants}
                  >
                    <Link
                      href="/admin/login"
                      className="block btn-navbar w-full text-center"
                      onClick={() => setOpen(false)}
                    >
                      অ্যাডমিন
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
    </>
  )
}
