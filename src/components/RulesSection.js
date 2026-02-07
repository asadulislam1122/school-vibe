import { motion } from 'framer-motion'

export default function RulesSection(){
  const variants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={variants}>
          <h3 className="text-2xl font-bold text-navy dark:text-blue-400 mb-4">Rules & Regulations / নীতিমালা</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>ভর্তি সংক্রান্ত নিয়ম:</strong> নির্ধারিত ভর্তি ফরম ও প্রয়োজনীয় কাগজপত্র জমা দিতে হবে।</li>
            <li><strong>উপস্থিতি ও সময়ানুবর্তিতা:</strong> পাঠদিবসের সময় রক্ষণাবেক্ষণ করে নিয়মিত স্কুলে উপস্থিত থাকতে হবে।</li>
            <li><strong>স্কুল ইউনিফর্ম:</strong> নিদিষ্ট ইউনিফর্ম পরিধান বাধ্যতামূলক; পরিচ্ছন্ন রাখা প্রয়োজন।</li>
            <li><strong>আচরণবিধি:</strong> শিক্ষকদের ও সহপাঠীদের প্রতি ভদ্রতা বজায় রাখতে হবে; হেনস্থা ও সহিংসতা নিষিদ্ধ।</li>
            <li><strong>পরীক্ষা ও মূল্যায়ন:</strong> পরীক্ষায় সততা বজায় রাখতে হবে; মূল্যায়ন প্রতিষ্ঠানের নীতিমালা অনুসরণ করবে।</li>
            <li><strong>মোবাইল ফোন:</strong> শ্রেণিকক্ষে মোবাইল ব্যবহার নিষিদ্ধ; জরুরি ক্ষেত্রে অফিসের মাধ্যমে অনুমতি নেবেন।</li>
            <li><strong>শাস্তিমূলক ব্যবস্থা:</strong> নিয়মভঙ্গের ক্ষেত্রে সতর্কতা, অভিভাবককে জানানো ও উপযুক্ত ব্যবস্থা গ্রহণ করা হবে।</li>
            <li><strong>অভিভাবকদের দায়িত্ব:</strong> সন্তানকে নিয়মিত স্কুলে পাঠানো, স্কুল নীতিমালা মেনে চলা ও শিক্ষকের সাথে যোগাযোগ রাখা।</li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
