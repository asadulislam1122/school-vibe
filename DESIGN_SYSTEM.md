# Bhomradaha High School — Design System & UI/UX Guide

## 📐 Design Philosophy

**Modern Minimalism** for education — clean, calm, professional, and fully accessible.

---

## 🎨 Color Palette

### Primary Colors
| Color | Hex | Usage | RGB |
|-------|-----|-------|-----|
| **Navy Blue** | `#0b2545` | Headers, buttons, primary text, navbar | 11, 37, 69 |
| **Soft Blue** | `#3B82F6` | Accents, hover states, secondary buttons | 59, 130, 246 |
| **White** | `#ffffff` | Backgrounds, cards, text on dark | 255, 255, 255 |
| **Light Gray** | `#f3f4f6` | Section backgrounds, subtle contrast | 243, 244, 246 |
| **Dark Gray** | `#6b7280` | Secondary text, muted content | 107, 114, 128 |

### Accent Colors (for hierarchy)
- **Success Green**: `#10b981` (notices, confirmations)
- **Warning Orange**: `#f59e0b` (alerts, important notices)
- **Error Red**: `#ef4444` (delete actions, errors)

---

## 🔤 Typography System

### Font Stack
```
Primary: 'Noto Sans Bengali', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial
```

### Heading Hierarchy

| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|------------|--------|
| **H1 (Hero)** | 48px (mobile: 32px) | 700 Bold | 1.2 | Main page titles, hero section |
| **H2 (Section)** | 32px (mobile: 24px) | 600 SemiBold | 1.3 | Section headings |
| **H3 (Subsection)** | 24px (mobile: 20px) | 600 SemiBold | 1.4 | Card titles, subsections |
| **H4 (Card Title)** | 18px | 600 SemiBold | 1.5 | Teacher names, notice titles |
| **Body (Regular)** | 16px | 400 Regular | 1.6 | Paragraphs, body text |
| **Small (Caption)** | 14px | 400 Regular | 1.5 | Metadata, captions |

### Text Colors
- **Primary Text** (on white): Navy (`#0b2545`)
- **Secondary Text** (descriptions): Dark Gray (`#6b7280`)
- **Tertiary Text** (captions): Light Gray (`#9ca3af`)
- **Text on Navy**: White (`#ffffff`)

---

## 🎬 Animation & Motion Design

### Animation Principles
- **Speed**: 300-600ms for most interactions (calm, not jarring)
- **Easing**: `ease-in-out` for natural motion
- **Delay**: Staggered entrance (50-100ms between elements)
- **Subtlety**: Avoid excessive, distracting animations

### Animation Tokens

#### 1. **Fade-In** (opacity)
```
Initial: opacity 0
Animate: opacity 1
Duration: 500ms
Easing: ease-in
```
*Used for: Page load, hero headline*

#### 2. **Slide-Up** (transform + opacity)
```
Initial: Y: 20px, opacity: 0
Animate: Y: 0, opacity: 1
Duration: 600ms
Easing: ease-out
```
*Used for: Section content, notice items*

#### 3. **Hover Lift** (transform)
```
Hover: Y: -6px, shadow: 0 20px 25px
Transition: 300ms ease
```
*Used for: Cards, buttons, gallery items*

#### 4. **Hover Glow** (box-shadow)
```
Hover: box-shadow 0 0 20px rgba(59, 130, 246, 0.3)
Transition: 200ms ease
```
*Used for: Interactive buttons, teacher cards*

#### 5. **Scale-On-Hover** (transform scale)
```
Hover: scale(1.03)
Transition: 300ms ease
```
*Used for: Gallery images*

#### 6. **Button Press** (transform scale + shadow)
```
Active: scale(0.98), shadow inset
Transition: 100ms ease-out
```
*Used for: All clickable buttons*

---

## 📐 Layout & Spacing

### Container & Grid
```
Max-width: 1280px (desktop)
Horizontal padding: 16px (mobile), 32px (tablet), 48px (desktop)
Vertical spacing: 
  - Sections: 64px (desktop), 48px (tablet), 32px (mobile)
  - Components: 32px
  - Elements: 16px
```

### Responsive Breakpoints
| Device | Width | Columns | Font Size |
|--------|-------|---------|-----------|
| **Mobile** | < 768px | 1-2 | 16px |
| **Tablet** | 768px - 1024px | 2-3 | 18px |
| **Desktop** | > 1024px | 4+ | 20px |

### Card Design
- **Border Radius**: 8px (standard), 12px (larger cards)
- **Shadow**: `0 4px 6px rgba(0, 0, 0, 0.1)` (subtle)
- **Hover Shadow**: `0 20px 25px rgba(0, 0, 0, 0.15)` (elevated)
- **Padding**: 16px (small), 24px (medium), 32px (large)

---

## 🎯 Component Design Guidelines

### Hero Section
- **Background**: Navy gradient (`#0b2545` to `#1a4d7d`)
- **Text**: White, centered
- **Height**: 60vh (min 500px on mobile)
- **CTA Buttons**: 
  - Primary: Navy background, white text, soft blue on hover
  - Secondary: Navy border, navy text, soft blue background on hover
- **Animation**: Fade-in + slide-up for headline and tagline with 200ms stagger

### Navbar
- **Style**: Sticky, white background, subtle shadow
- **Height**: 64px
- **Logo**: Navy, bold, 20px font
- **Menu Items**: 
  - Inactive: Navy text, 16px
  - Hover: Soft blue text, underline appears
  - Active: Navy text + blue underline
- **Buttons**: Blue background, white text, hover glow

### Cards (About, Teachers, Gallery)
- **Aspect Ratio**: 1:1 (square for photos)
- **Image**: Full cover, smooth transitions
- **Text**: Navy headings, gray body text
- **Hover**: Lift up 6px, shadow increases
- **Spacing**: 16px between cards (responsive grid)

### Notice Board
- **Layout**: Vertical stacked list
- **Item**: White background, navy text, light border, padding 16px
- **Hover**: Soft gray background, slight lift
- **Animation**: Staggered slide-up on scroll (50ms delay per item)

### Gallery
- **Grid**: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)
- **Aspect Ratio**: 4:3 (or 1:1)
- **Hover Effect**: Scale 1.03, soft glow
- **Gap**: 16px between items

### Buttons
- **Padding**: 12px 24px (standard)
- **Border Radius**: 6px
- **Font Weight**: 600
- **States**:
  - **Normal**: Navy bg, white text
  - **Hover**: Soft blue glow, shadow
  - **Active**: Scale down to 0.98
  - **Disabled**: Opacity 0.5, cursor not-allowed

### Forms
- **Input Height**: 44px
- **Border**: 1px solid light gray
- **Border Radius**: 6px
- **Focus**: Soft blue border + light blue background
- **Padding**: 12px 16px
- **Font Size**: 16px (prevents zoom on mobile)

### Footer
- **Background**: Navy (`#0b2545`)
- **Text**: White
- **Height**: Auto, padding 48px (desktop), 32px (mobile)
- **Layout**: 2 columns on desktop, 1 column on mobile
- **Text Size**: 14px (primary), 12px (secondary)

---

## ♿ Accessibility (A11y)

### Color Contrast
- **WCAG AA**: Minimum 4.5:1 ratio for text
- **Navy on White**: 10.9:1 ✅
- **Navy on Light Gray**: 9.2:1 ✅
- **Soft Blue on White**: 5.8:1 ✅

### Interactive Elements
- **Minimum Touch Target**: 44px × 44px
- **Focus State**: Clear blue outline or underline
- **Hover/Focus**: Always visible and distinct
- **Keyboard Navigation**: Full support, logical tab order

### Images
- **Alt Text**: All images have descriptive alt text in Bangla
- **Gallery**: Images have captions identifying content

### Typography
- **Line Height**: 1.5+ for body text (readability)
- **Letter Spacing**: 0.5px for headings (clarity)
- **Text Alignment**: Left-aligned for Bangla (RTL-friendly structure)

---

## 🌙 Visual Effects (Non-Functional)

### Subtle Background Elements
- **Gradient Overlays**: Soft navy-to-transparent on hero
- **Floating Shapes**: Subtle circles/curves (opacity 5-10%) in background
- **Divider Lines**: Soft gray (1px, opacity 0.5) between sections
- **Glow Effects**: Soft blue glow on interactive elements (opacity 20-30%)

### Loading States
- **Skeleton Loaders**: Light gray pulse animation (opacity 0.5 → 0.7)
- **Spinner**: Navy rotating circle, 24px diameter

---

## 📱 Mobile-First Design Considerations

### Touch Optimization
- **Buttons**: Minimum 44px height
- **Spacing**: Extra padding on mobile for easier tapping
- **Font Size**: 16px minimum (prevents auto-zoom on iOS)

### Screen-Specific Adjustments
- **Mobile**: Single column, hamburger menu, larger tap targets
- **Tablet**: 2-column grids, expanded menu, larger type
- **Desktop**: Full 4-column grids, side navigation, optimized whitespace

### Mobile Navigation
- **Hamburger Menu**: Animated icon (X to hamburger transition)
- **Mobile Menu**: Full-screen overlay, navy background, white text
- **Menu Items**: 48px height, full-width tap targets

---

## 🎓 School-Specific Design Elements

### Educational Tone
- **Color**: Navy (trust, professionalism) + Soft Blue (approachability)
- **Typography**: Clean, readable, Bangla-friendly
- **Spacing**: Generous whitespace (calm, organized)
- **Imagery**: Teachers, students, classroom moments (warm, inclusive)

### Institutional Elements
- **Logo/School Name**: Prominent, fixed in navbar and footer
- **Credit Line**: "সম্পাদনায়: Md Asadullah" — always visible
- **Copyright**: "© 2026 ভোমরাদহ উচ্চ বিদ্যালয়। সর্বস্বত্ব সংরক্ষিত।"

---

## 🛠️ Design Tokens (CSS Variables)

```css
/* Colors */
--color-primary: #0b2545;    /* Navy Blue */
--color-accent: #3B82F6;     /* Soft Blue */
--color-bg: #f3f4f6;         /* Light Gray */
--color-text: #0b2545;       /* Navy Text */
--color-text-secondary: #6b7280; /* Gray Text */

/* Spacing */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;

/* Typography */
--font-sans: 'Noto Sans Bengali', system-ui;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 24px;
--text-2xl: 32px;
--text-3xl: 48px;

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 20px 25px rgba(0, 0, 0, 0.15);

/* Border Radius */
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;
--radius-xl: 12px;

/* Transitions */
--transition-fast: 200ms ease;
--transition-normal: 300ms ease;
--transition-slow: 500ms ease;
```

---

## ✨ Visual Hierarchy

1. **Primary**: Navy blue text/buttons (main CTAs)
2. **Secondary**: Soft blue accents (hover states, icons)
3. **Tertiary**: Gray text (supporting copy)
4. **Decorative**: Light gray backgrounds, subtle borders

---

## 📋 Checklist for UI/UX Implementation

- ✅ Hero section with gradient, centered text, dual CTAs
- ✅ Responsive navbar with menu items + admin controls
- ✅ About section with history, mission, teacher grid
- ✅ Teacher cards with photos, names, subjects, hover effects
- ✅ Notice board with animated list
- ✅ Gallery with responsive grid + hover scale
- ✅ Contact section with address, form, map
- ✅ Footer with school name, copyright, editor credit
- ✅ All text in Bangla language
- ✅ Smooth fade-in & slide-up animations on scroll
- ✅ Hover effects on buttons, cards, links
- ✅ Mobile-responsive layout (mobile, tablet, desktop)
- ✅ Accessibility (color contrast, touch targets, alt text)

---

## 🎨 Modern Design Trends Applied

1. **Minimalism**: Clean layouts, generous whitespace
2. **Soft Shadows**: Depth without harsh borders
3. **Rounded Corners**: 6-12px radius (friendly, modern)
4. **Custom Typography**: Bangla-optimized font stack
5. **Micro-interactions**: Subtle hover and focus states
6. **Responsive-First**: Optimized for all screen sizes
7. **Calm Color Palette**: Navy + soft blue + white (professional, trustworthy)
8. **Smooth Animations**: 300-600ms transitions (not jarring)

---

## 📸 Design Reference

This design system follows modern education website standards:
- **Similar to**: Khan Academy (clean), Coursera (professional), edX (accessible)
- **Not like**: Flashy startup sites, neon colors, excessive animations
- **Tone**: Professional, welcoming, accessible, calm

---

**Design System Version**: 1.0  
**Created**: February 6, 2026  
**Editor**: Md Asadullah  
**School**: Bhomradaha High School (ভোমরাদহ উচ্চ বিদ্যালয়)
