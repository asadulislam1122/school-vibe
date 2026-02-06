import { SITE } from '../data/content'

export default function Footer(){
  return (
    <footer className="bg-navy text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* School Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">{SITE.name}</h3>
            <p className="text-blue-100 text-sm mb-4">আধুনিক শিক্ষা এবং ছাত্রদের সার্বিক উন্নয়নে নিবেদিত।</p>
            <p className="text-blue-200 text-xs">© {new Date().getFullYear()} {SITE.name}। সর্বস্বত্ব সংরক্ষিত।</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">যোগাযোগ</h4>
            <div className="space-y-2 text-blue-100 text-sm">
              <p>📍 {SITE.address}</p>
              <p>📞 {SITE.phone}</p>
              <p>📧 {SITE.email}</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-600 pt-6 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-blue-200 text-sm mb-3 sm:mb-0">
            সম্পাদনায়: <span className="font-semibold text-white">Md Asadullah</span>
          </p>
          <p className="text-blue-300 text-xs">
            ডিজিটালি নির্মিত আধুনিক প্রযুক্তিতে
          </p>
        </div>
      </div>
    </footer>
  )
}
