# Admin Dashboard Notice System - Complete Documentation

## Overview

A complete school notice management system with auto-updating navbar notifications, localStorage persistence, and admin dashboard management. The system automatically syncs notice updates across all components.

**Key Features:**
- ✅ Add/Edit/Delete notices from admin dashboard
- ✅ Auto-updating navbar notification bell with unread badge
- ✅ Mark notices as read (individually or bulk)
- ✅ LocalStorage persistence (survives page refresh)
- ✅ Real-time updates across components
- ✅ Responsive mobile/desktop UI
- ✅ Framer Motion animations
- ✅ Pure HTML/CSS/JS with comments
- ✅ Bengali (বাংলা) language support

---

## Architecture Overview

```
┌─────────────────────────────────────────┐
│      NoticeContext (src/context/)       │
│  - State: notices[], unreadCount        │
│  - localStorage persistence             │
│  - Functions: add, delete, update, etc  │
└────────┬────────────────────────────────┘
         │
    ┌────┴────┬───────────┬──────────────┐
    │          │           │              │
    ▼          ▼           ▼              ▼
┌────────┐ ┌───────┐ ┌──────────┐ ┌────────────┐
│Navbar  │ │Notice │ │ _app.js  │ │ Dashboard  │
│(Panel) │ │Panel  │ │(Provider)│ │(Manager)   │
└────────┘ └───────┘ └──────────┘ └────────────┘
```

---

## File Structure

```
src/
├── context/
│   ├── NoticeContext.js          # Notice state management & localStorage
│   ├── AuthContext.js            # (existing)
│   ├── ContentContext.js         # (existing)
│   └── ThemeContext.js           # (existing)
├── components/
│   ├── Navbar.js                 # Updated: includes NoticePanel
│   ├── NoticePanel.js            # New: navbar bell with dropdown
│   ├── admin/
│   │   ├── NoticeManager.js      # Updated: admin dashboard UI
│   │   ├── TeacherManager.js     # (existing)
│   │   └── GalleryManager.js     # (existing)
├── hooks/
│   └── useContexts.js            # Updated: added useNotices()
└── pages/
    ├── _app.js                   # Updated: wrapped with <NoticeProvider>
    └── admin/
        └── dashboard.js          # (existing)
```

---

## Component Details

### 1. NoticeContext.js
**Purpose:** Central state management for notices with localStorage sync

**Key Functions:**
```javascript
// Add new notice
addNotice(title, body) → notice object

// Delete notice by ID
deleteNotice(id) → void

// Update notice content
updateNotice(id, title, body) → void

// Mark single notice as read
markAsRead(id) → void

// Mark all as read
markAllAsRead() → void

// Clear all notices
clearAllNotices() → void
```

**Data Structure:**
```javascript
{
  id: number,              // Unique ID (Date.now() + Math.random())
  title: string,           // Notice title (বাংলা supported)
  body: string,            // Notice content (বাংলা supported)
  timestamp: number,       // Created time (milliseconds)
  unread: boolean          // Read status
}
```

**localStorage Key:** `school_notices_v2`

**Default Notice:** One sample notice seeded on first load

---

### 2. NoticePanel.js
**Purpose:** Navbar bell icon with notice dropdown

**Features:**
- 🔔 Bell icon with unread count badge
- 📋 Scrollable notice list (max-height: 400px)
- ⏱️ Relative time display ("2 minutes ago")
- ✨ Framer Motion animations
- 📱 Responsive: full-width on mobile, fixed on desktop
- ♿ Accessibility: ARIA labels, keyboard support (Escape to close)

**Displays:**
- Notice title and preview (truncated)
- Timestamp with human-readable format
- "New" badge for unread notices
- Action buttons: Mark as read, Delete

**Quick Actions:**
- Bell click: Opens/closes panel
- "Mark all read" button: Bulk mark as read
- Click outside: Auto-closes panel
- Escape key: Closes panel

---

### 3. NoticeManager.js
**Purpose:** Admin dashboard UI for notice management

**Features:**
- ➕ Add new notice form (title + body)
- ✏️ Edit existing notices
- ❌ Delete with confirmation
- 📊 Stats: Total notices, Unread count
- 🗑️ Clear all with confirmation dialog
- ⬆️ Character counters (title: 100, body: 500)
- 🎨 Visual states: Edit mode (blue), Unread (yellow)

**Form Fields:**
- Title input (max 100 chars)
- Body textarea (max 500 chars)
- Add/Save buttons with validation

**List Display:**
- Unread notices highlighted (yellow background)
- Most recent first
- Edit mode inline
- Scrollable (max-height: 600px)

---

### 4. Updated Navbar Integration
**Changes to Navbar.js:**
- Import NoticePanel component
- Add `<NoticePanel />` to desktop menu (after theme toggle)
- Add `<NoticePanel />` to mobile controls
- NoticePanel auto-updates when notices change

**Display:** Always visible, accessible from any page

---

## Usage Guide

### For Admins (Dashboard)

**Access:** `/admin/dashboard` → "নোটিশ" tab

**Add Notice:**
1. Fill title & body
2. Click "নোটিশ যোগ করুন"
3. Notice appears immediately in navbar bell

**Edit Notice:**
1. Click "সম্পাদনা" button
2. Modify text
3. Click "সংরক্ষণ"

**Delete Notice:**
1. Click "মুছুন" button
2. Confirm deletion

**Bulk Operations:**
- "সবাইকে পড়া হিসেবে চিহ্নিত করুন" → Mark all as read
- "সব মুছুন" → Clear all (with confirmation)

---

### For Users (Navbar Bell)

**View Notices:**
1. Click 🔔 bell icon in navbar (desktop or mobile)
2. Panel opens with all notices
3. Unread notices show "নতুন" badge
4. Most recent at the top

**Mark as Read:**
- Click "পড়া হিসেবে চিহ্নিত" on individual notice
- Or click "সব পড়া হিসেবে চিহ্নিত করুন" at bottom

**Delete Notice:**
- Click "মুছুন" button with confirmation

**Close Panel:**
- Click bell icon again
- Click ✕ button
- Click outside the panel
- Press Escape key

---

## Data Persistence

### localStorage
**Key:** `school_notices_v2`
**Format:** JSON array of notice objects
**Survives:** Page refresh, browser restart

**Example stored data:**
```javascript
[
  {
    "id": 1710000000123,
    "title": "পরীক্ষা সূচী ঘোষণা",
    "body": "আগামী সপ্তাহে বার্ষিক পরীক্ষা অনুষ্ঠিত হবে।",
    "timestamp": 1710000000000,
    "unread": true
  },
  {
    "id": 1710000001456,
    "title": "স্কুল খোলা সম্পর্কিত বিজ্ঞপ্তি",
    "body": "আগামী সোমবার থেকে নিয়মিত ক্লাস শুরু হবে।",
    "timestamp": 1710000001000,
    "unread": false
  }
]
```

### Auto-sync
- Changes in NoticeContext automatically save to localStorage
- Page refresh loads from localStorage
- All subscribers (Navbar, Panel, Manager) update in real-time via React state

---

## Implementation Notes

### Auto-Update Mechanism
1. **Admin adds notice** → NoticeContext updates state
2. **Save to localStorage** → useCallback ensures persistence
3. **Unread count updates** → Badge on navbar bell updates
4. **All components re-render** → React context subscribers

### Character Limits
- Title: 100 characters (preview in list)
- Body: 500 characters (preview in panel)
- Enforced by `maxLength` attributes in form inputs

### Time Display (Bengali)
- "এখনই" = Just now
- "5 মিনিট আগে" = 5 minutes ago
- "2 ঘণ্টা আগে" = 2 hours ago
- "3 দিন আগে" = 3 days ago
- Date format otherwise (e.g., "১ জানুয়ারি ২০২৪")

### Responsive Behavior
- **Mobile:** 92vw wide, centered, max-height 60vh
- **Desktop:** 384px (w-96) wide, positioned top-right
- **Theme:** Dark mode compatible (dark:bg-gray-50, etc.)

---

## Code Examples

### Using useNotices Hook (Any Component)

```javascript
import { useNotices } from '../hooks/useContexts'

export default function MyComponent() {
  const {
    notices,           // Array of notice objects
    unreadCount,       // Number of unread
    addNotice,         // Function to add
    markAsRead,        // Function to mark read
    deleteNotice       // Function to delete
  } = useNotices()

  return (
    <div>
      <p>Unread: {unreadCount}</p>
      <button onClick={() => addNotice('Title', 'Body')}>
        Add Notice
      </button>
    </div>
  )
}
```

### Accessing Current Notice State

```javascript
const { notices } = useNotices()

notices.forEach(notice => {
  console.log(notice.title)
  console.log(notice.body)
  console.log(notice.unread)
  console.log(new Date(notice.timestamp))
})
```

### Triggering Actions

```javascript
const { addNotice, markAllAsRead, deleteNotice } = useNotices()

// Add a notice
addNotice('পরীক্ষা সূচী', 'আগামী সপ্তাহে পরীক্ষা হবে।')

// Mark all as read
markAllAsRead()

// Delete notice by ID
deleteNotice(1710000000123)
```

---

## CSS Classes Used

**Tailwind CSS:**
- `bg-red-500`, `text-white` → Badge styling
- `max-h-[400px] overflow-y-auto` → Scrollable list
- `dark:bg-gray-50` → Dark mode support
- `btn-primary`, `btn-danger-sm` → Custom buttons from globals.css

**Custom Animations:**
- Framer Motion: panelVariants, noticeVariants
- Bounce: badge pulsing effect
- Slide: panel entrance/exit

---

## Troubleshooting

### Notices not persisting?
- Check browser's localStorage (DevTools > Application > localStorage)
- Verify `school_notices_v2` key exists
- Clear localStorage and reload (hard refresh)

### Unread count not updating?
- Ensure NoticeProvider wraps entire app in `_app.js`
- Check that NoticePanel is imported in Navbar
- Verify useNotices() hook is imported from useContexts

### Panel not opening?
- Check console for errors
- Verify NoticePanel.js is in `src/components/`
- Ensure Navbar imports NoticePanel

### Character limit not enforced?
- Confirm `maxLength` attribute on input/textarea
- Check if user submitted form with validation bypass

---

## Future Enhancements

**Potential additions:**
1. **Attach files** → Upload images/PDFs to notices
2. **Categories** → Tag notices (Academic, Events, etc.)
3. **Scheduled notices** → Post at specific time
4. **Notification sounds** → Audio alert on new notice
5. **Email notifications** → Send to parent contacts
6. **Expire notices** → Auto-remove after X days
7. **Admin roles** → Restrict who can edit/delete
8. **Revision history** → Track notice edits
9. **Search/Filter** → Find notices by keyword
10. **Export** → Download notices as PDF/CSV

---

## Files Modified

1. ✅ Created: `src/context/NoticeContext.js`
2. ✅ Created: `src/components/NoticePanel.js`
3. ✅ Updated: `src/components/admin/NoticeManager.js`
4. ✅ Updated: `src/components/Navbar.js`
5. ✅ Updated: `src/hooks/useContexts.js`
6. ✅ Updated: `src/pages/_app.js`

---

## Testing Checklist

- [ ] Add notice from dashboard
- [ ] Notice appears in navbar bell with unread badge
- [ ] Badge count updates correctly
- [ ] Edit notice in dashboard
- [ ] Delete notice with confirmation
- [ ] Mark single notice as read
- [ ] Mark all notices as read (bulk)
- [ ] Clear all notices with confirmation
- [ ] Reload page - notices persist
- [ ] Mobile responsive - panel adjusts width
- [ ] Dark mode - styles apply correctly
- [ ] Navbar bell closes on outside click
- [ ] Navbar bell closes on Escape key
- [ ] Time display in Bengali
- [ ] Character limit prevents overfill

---

## Bengali Labels Reference

```javascript
// Common labels used in the system
'নোটিশ বোর্ড' = Notice Board
'নতুন' = New
'অপঠিত' = Unread
'পড়া হিসেবে চিহ্নিত' = Mark as read
'সংরক্ষণ' = Save
'সম্পাদনা' = Edit
'মুছুন' = Delete
'যোগ করুন' = Add
'নোটিশ যোগ করুন' = Add Notice
'সব মুছুন' = Clear All
'সবাইকে পড়া হিসেবে চিহ্নিত করুন' = Mark all as read
'মোট নোটিশ' = Total Notices
'এখনই' = Just now
'মিনিট আগে' = minutes ago
'ঘণ্টা আগে' = hours ago
'দিন আগে' = days ago
```

---

## License & Credits

Created for Vomradah High School website.
Built with Next.js, React, Tailwind CSS, Framer Motion, and localStorage.

---

## Support Notes

For questions or issues:
1. Check browser console for JavaScript errors
2. Verify all imports in component files
3. Ensure NoticeProvider wraps the app
4. Check localStorage for persisted data
5. Test in incognito mode (no cache issues)

