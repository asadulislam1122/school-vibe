# Bhomradaha High School — Modern School Website

A complete, professional school website built with **Next.js**, **Tailwind CSS**, and **Framer Motion**. All content is in Bangla, with a powerful admin dashboard for managing school information.

---

## 🚀 Quick Start

```bash
cd "C:\Vibe Coding Project\First Vibe Coding"
npm install    # (already done)
npm run dev    # Start development server
```

Visit: **http://localhost:3000**

---

## 📦 Project Contents

### Pages
- **Home** (`/`) — Hero with school info, about section, notice board
- **About** (`/about`) — School history, mission, teacher profiles
- **Gallery** (`/gallery`) — Responsive image grid
- **Contact** (`/contact`) — Contact info, form, embedded map
- **Admin Login** (`/admin/login`) — Secure admin panel
- **Admin Dashboard** (`/admin/dashboard`) — Manage content

### Admin Features
✅ **Notice Management** — Add, edit, delete notices (real-time updates)  
✅ **Teacher Management** — Add/edit/remove teacher profiles with images  
✅ **Gallery Management** — Add/remove gallery images  
✅ **Data Persistence** — All changes saved to localStorage  
✅ **Authentication** — Simple password-protected access

**Admin Password**: `admin2026`

---

## 🎨 Design System

- **Colors**: Navy blue (`#0b2545`), white, soft gray (`#f3f4f6`)
- **Typography**: Google Fonts — Noto Sans Bengali (full Bangla support)
- **Animations**: Framer Motion (fade-in, slide-up, hover effects)
- **Responsive**: Mobile-first, fully adaptive layout

---

## 🗂️ File Structure

```
src/
├── pages/          # Next.js routes
├── components/     # Reusable React components
├── context/        # Auth & Content management contexts
├── hooks/          # Custom hooks (useAuth, useContent)
├── data/           # All Bangla content and configuration
└── styles/         # Global styles + Tailwind

public/images/     # Placeholder SVG images
```

---

## 🔑 Key Features

1. **Fully Bangla** — All text, menus, forms in Bengali
2. **No Backend Required** — Uses localStorage for persistence
3. **Mobile Responsive** — Works perfectly on all devices
4. **Smooth Animations** — Professional Framer Motion animations
5. **Admin Dashboard** — Easy-to-use content management
6. **SEO Ready** — Proper meta tags and structure

---

## 💻 Tech Stack

- **Next.js 14** — React framework with file-based routing
- **Tailwind CSS 3** — Utility-first styling
- **Framer Motion 10** — Animation library
- **React 18** — UI component library
- **PostCSS** — CSS processing

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (stacked, hamburger menu)
- **Tablet**: 768px - 1024px (2-column grid)
- **Desktop**: > 1024px (full layout)

---

## 🔐 Admin Panel Access

1. Navigate to: `http://localhost:3000/admin/login`
2. Enter password: `admin2026`
3. Manage notices, teachers, and gallery images
4. Changes are automatically saved and reflected on the live site

---

## 🎬 Animation Details

All animations use Framer Motion variants:
- **Page Load**: Fade in + slide up
- **Scroll**: Staggered entrance animations
- **Hover**: Lift effect on cards/buttons
- **Transitions**: Smooth color and transform changes

---

## 📝 Content Management

All site content is stored in `src/data/content.js`:
- School name, address, contact info
- Navigation menu items
- Default notices, teachers, gallery
- Customizable colors and text

Changes made via admin panel are saved to browser localStorage.

---

## 🚀 Production Build

```bash
npm run build   # Create optimized production build
npm start       # Run production server
```

---

## 📄 Footer Credit

Every page displays:
```
© 2026 ভোমরাদহ উচ্চ বিদ্যালয়। সর্বস্বত্ব সংরক্ষিত।
সম্পাদনায়: Md Asadullah
```

---

## 🔄 Future Enhancements

- Backend database integration (MongoDB/PostgreSQL)
- Image upload (Cloudinary)
- Email notifications
- Student portal
- Search functionality
- Multi-language support
- Deployment to Vercel/Netlify

---

**Built with ❤️ for Bhomradaha High School**
