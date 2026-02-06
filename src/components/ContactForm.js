import { SITE } from '../data/content'

export default function ContactForm(){
  return (
    <section className="py-12 bg-white">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold text-navy">যোগাযোগ তথ্য</h3>
          <p className="mt-3 text-gray-700">ঠিকানা: {SITE.address}</p>
          <p className="mt-1 text-gray-700">মোবাইল: {SITE.phone}</p>
          <p className="mt-1 text-gray-700">ইমেইল: {SITE.email}</p>
          <div className="mt-4">
            <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d0!2d0!3d0" className="w-full h-60 rounded-md border-0" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-navy">মেসেজ পাঠান</h3>
          <form className="mt-3 space-y-3">
            <input className="w-full p-2 border rounded" placeholder="আপনার নাম" />
            <input className="w-full p-2 border rounded" placeholder="ইমেইল" />
            <textarea className="w-full p-2 border rounded" rows="6" placeholder="আপনার বার্তা" />
            <button type="button" className="btn-primary">পাঠিয়ে দিন</button>
          </form>
        </div>
      </div>
    </section>
  )
}
