# 🔔 Admin Dashboard Notice System - Quick Start Guide

## What's Included?

A complete notice management system for your school website that:
- Admins can add/edit/delete notices from `/admin/dashboard`
- Navbar shows a bell icon with unread count badge
- Notices persist in localStorage (survives page refresh)
- Real-time updates across all components
- Fully responsive (mobile + desktop)
- Bengali language support
- Animated with Framer Motion

---

## Installation

### Step 1: Files Already Created ✅

The following new files have been created in your project:

```
✅ src/context/NoticeContext.js          →  Notice state & localStorage
✅ src/components/NoticePanel.js          →  Navbar bell dropdown
✅ src/components/admin/NoticeManager.js  →  Admin dashboard UI
✅ ADMIN_DASHBOARD_NOTICE_SYSTEM.md       →  Full documentation
✅ QUICK_START.md                         →  This file
```

### Step 2: Files Already Updated ✅

```
✅ src/components/Navbar.js               →  Added NoticePanel integration
✅ src/hooks/useContexts.js               →  Added useNotices() hook
✅ src/pages/_app.js                      →  Wrapped with NoticeProvider
```

### Step 3: Test Installation

Run the dev server and navigate to:
1. **View notices:** Click bell icon (🔔) in navbar
2. **Add notices:** Go to `/admin/dashboard` → "নোটিশ" tab
3. **Test persistence:** Add notice, refresh page, notice should remain

---

## Quick Usage

### Admin Dashboard

**URL:** `http://localhost:3000/admin/dashboard`

**Steps to add a notice:**
```
1. Login to admin dashboard
2. Click "নোটিশ" tab
3. Fill in:
   - Title: "পরীক্ষা সূচী" (max 100 chars)
   - Body: "আগামী সপ্তাহে পরীক্ষা হবে।" (max 500 chars)
4. Click "নোটিশ যোগ করুন"
5. Notice appears immediately in navbar bell
```

### Navbar Bell (For Users)

**Location:** Top right of navbar (all pages)

**Actions:**
- 🔔 Click bell → Opens notice dropdown
- 📝 Notice shows title, preview, time
- ✅ Click "পড়া হিসেবে চিহ্নিত" → Mark as read
- ❌ Click "মুছুন" → Delete notice
- 🔴 Red badge shows unread count

---

## Code Examples

### Add Notice Programmatically

```javascript
import { useNotices } from '../hooks/useContexts'

export default function MyPage() {
  const { addNotice } = useNotices()

  const handleClick = () => {
    addNotice('শিরোনাম', 'বিষয়বস্তু')
  }

  return <button onClick={handleClick}>নোটিশ যোগ করুন</button>
}
```

### Display Unread Count

```javascript
import { useNotices } from '../hooks/useContexts'

export default function Badge() {
  const { unreadCount } = useNotices()

  return (
    <div>
      <p>অপঠিত নোটিশ: {unreadCount}</p>
    </div>
  )
}
```

### Get All Notices

```javascript
import { useNotices } from '../hooks/useContexts'

export default function List() {
  const { notices } = useNotices()

  return (
    <div>
      {notices.map(n => (
        <div key={n.id}>
          <h4>{n.title}</h4>
          <p>{n.body}</p>
          <small>{new Date(n.timestamp).toLocaleString('bn-BD')}</small>
          {n.unread && <span>📍 অপঠিত</span>}
        </div>
      ))}
    </div>
  )
}
```

### Bulk Actions

```javascript
const { markAllAsRead, clearAllNotices } = useNotices()

// Mark all as read
markAllAsRead()

// Clear all notices
clearAllNotices()
```

---

## Component Hierarchy

```
App (_app.js)
└─ ThemeProvider
   └─ AuthProvider
      └─ ContentProvider
         └─ NoticeProvider ← New!
            └─ Navbar
               └─ NoticePanel ← Shows bell icon
            └─ Pages
               └─ Admin Dashboard
                  └─ NoticeManager ← Edit notices
```

---

## Data Structure

Each notice in localStorage looks like:

```javascript
{
  id: 1710000000123,           // Unique ID
  title: "পরীক্ষা সূচী",         // Title
  body: "আগামী সপ্তাহে...",      // Content
  timestamp: 1710000000000,    // Created time
  unread: true                // Read status
}
```

---

## Features Explained

### 🔔 Notification Bell

- **Location:** Navbar (visible on all pages)
- **Shows:** Unread count in red badge
- **Click:** Opens dropdown with all notices
- **Dark mode:** Fully compatible

### 📋 Notice Dropdown

- **Max height:** 400px with scroll
- **Time display:** "2 মিনিট আগে" (2 minutes ago)
- **Actions:** Mark as read, Delete
- **Close:** Click outside, ESC key, or click bell again

### ✏️ Dashboard Manager

- **Location:** `/admin/dashboard` → "নোটিশ" tab
- **Add:** Form with title + body
- **Edit:** Click "সম্পাদনা" to inline edit
- **Delete:** Confirmation required
- **Bulk:** Mark all read, Clear all

### 💾 localStorage

- **Key:** `school_notices_v2`
- **Format:** JSON array
- **Auto-save:** Every change
- **Survives:** Page refresh, browser restart

---

## Customization Options

### Change localStorage Key

In `src/context/NoticeContext.js`:
```javascript
const STORAGE_KEY = 'your_custom_key_here'
```

### Change Character Limits

In `src/components/admin/NoticeManager.js`:
```javascript
// Title max length
<input maxLength="150" />  {/* Change 100 to 150 */}

// Body max length
<textarea maxLength="800" />  {/* Change 500 to 800 */}
```

### Change Panel Width (Mobile)

In `src/components/NoticePanel.js`:
```javascript
className={`... ${
  isMobile ? 'w-full sm:w-96' : 'w-96'  {/* Change w-96 to w-80 or w-full */}
}`}
```

### Change Panel Height

In `src/components/NoticePanel.js`:
```javascript
<div className="max-h-[400px] overflow-y-auto">  {/* Change 400px to 500px */}
```

### Customize Time Format

In `src/components/NoticePanel.js`:
```javascript
function formatTime(timestamp) {
  // Customize the time display strings here
  if (diff < 60000) return 'এখনই'  // Change message
  // ... etc
}
```

---

## Troubleshooting

### Problem: Notices not saving
**Solution:**
1. Open DevTools (F12)
2. Go to Application → localStorage
3. Check for key `school_notices_v2`
4. Clear it and reload page

### Problem: Bell icon not showing
**Solution:**
1. Check that Navbar.js imports NoticePanel
2. Verify `<NoticePanel />` is in navbar JSX
3. Clear browser cache (Ctrl+Shift+Delete)
4. Hard reload (Ctrl+Shift+R)

### Problem: Unread count not updating
**Solution:**
1. Verify NoticeProvider wraps App in _app.js
2. Check console for errors (F12)
3. Ensure useNotices() is from '../hooks/useContexts'
4. Restart dev server (npm run dev)

### Problem: Styles look wrong
**Solution:**
1. Ensure Tailwind CSS is running (npm run dev)
2. Check globals.css is imported in _app.js
3. Verify tailwind.config.cjs exists
4. Clear .next folder: `rm -rf .next` and restart

---

## Testing Checklist

Use this to verify everything works:

```
□ Run: npm run dev
□ Go to http://localhost:3000
□ Click bell icon 🔔 in navbar
□ Panel opens, shows "কোনো নোটিশ নেই" or existing notices
□ Go to /admin/dashboard
□ Click "নোটিশ" tab
□ Add notice with title "টেস্ট" and body "এটি একটি টেস্ট নোটিশ"
□ Click "নোটিশ যোগ করুন"
□ Bell icon shows red badge with count 1
□ Click bell to open, notice appears in list
□ Click "পড়া হিসেবে চিহ্নিত"
□ Notice no longer has "📍 অপঠিত" badge
□ Refresh page (Ctrl+R)
□ Notice still there (localStorage working)
□ Click "মুছুন" on notice
□ Confirm deletion
□ Notice removed from bell
□ Go back to dashboard
□ Notice gone from manager
□ Test on mobile: notice panel responsive
```

---

## API Reference

### useNotices() Hook

```javascript
import { useNotices } from '../hooks/useContexts'

const {
  // State
  notices,              // Array of all notices
  unreadCount,          // Number of unread notices

  // Methods
  addNotice,            // (title, body) → new notice
  deleteNotice,         // (id) → removes notice
  updateNotice,         // (id, title, body) → updates notice
  markAsRead,           // (id) → marks single as read
  markAllAsRead,        // () → marks all as read
  clearAllNotices       // () → deletes all notices
} = useNotices()
```

### Notice Object Structure

```javascript
{
  id: number,                    // Unique identifier
  title: string,                 // Notice title (max 100 chars)
  body: string,                  // Notice content (max 500 chars)
  timestamp: number,             // Creation time (milliseconds since epoch)
  unread: boolean                // Whether notice is unread
}
```

---

## Performance Notes

- **Small impact:** notices array typically < 100 items
- **localStorage safe:** JSON storage ~5MB limit per domain
- **Render efficient:** Only subscribed components re-render
- **No network calls:** All local (no API needed)

---

## Security Notes

- **XSS protection:** NoticePanel escapes HTML (e.g., `escapeHtml()`)
- **localStorage:** Only stored on user's browser (not shared)
- **Admin only:** Only logged-in admins can edit/delete (auth check in dashboard)
- **Validation:** Title and body fields validated (non-empty, max length)

---

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 18+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## File Sizes

- `NoticeContext.js`: ~4 KB
- `NoticePanel.js`: ~6 KB
- `NoticeManager.js`: ~7 KB
- **Total added:** ~17 KB (well-minified in production)

---

## Next Steps

1. **Test the system** with the checklist above
2. **Customize** colors/sizes if needed
3. **Add features** (categories, expiry, etc.) as needed
4. **Train admins** on how to add notices
5. **Share notice URL** with parents/students

---

## Need Help?

Check the full documentation:
- 📖 [ADMIN_DASHBOARD_NOTICE_SYSTEM.md](./ADMIN_DASHBOARD_NOTICE_SYSTEM.md)

Or inspect the code:
- 💻 [src/context/NoticeContext.js](./src/context/NoticeContext.js) - Comments explain each function
- 💻 [src/components/NoticePanel.js](./src/components/NoticePanel.js) - UI with inline comments
- 💻 [src/components/admin/NoticeManager.js](./src/components/admin/NoticeManager.js) - Admin form logic

---

## Summary

✅ **What you get:**
- Fully functional notice system
- Admin dashboard integration
- Navbar auto-updating bell
- localStorage persistence
- Responsive design
- Bengali support
- Animated transitions

✅ **Ready to use:**
- No additional setup required
- All files created and integrated
- Works with existing code

✅ **Easy to customize:**
- Change text, colors, limits
- Add new features
- Extend with additional functionality

🚀 **Go test it now!**

