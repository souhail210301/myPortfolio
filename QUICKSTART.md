# Quick Start Guide - Enhanced Portfolio

## 🚀 Getting Started

### Run Locally
```powershell
# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ✨ What's New?

### 1. Timeline Section
Your experience and education displayed beautifully between About and Projects sections.

### 2. Smart Project Search
- Type to search projects by name or description
- Click tech tags to filter by technology
- See live results count

### 3. Back-to-Top Button
Floating button appears when you scroll down - click to return to top instantly.

### 4. Toast Notifications
Get visual feedback when submitting the contact form.

### 5. Page Loader
Professional loading animation on first visit.

### 6. Scrollspy Navigation  
Header links highlight the current section as you scroll.

### 7. Mobile Menu
Full mobile-friendly hamburger menu with smooth animations.

## 📝 Customize Your Content

### Update Timeline
Edit `src/components/Timeline.tsx`:
- Add your real work experience
- Update education details
- Modify descriptions

### Modify Projects
Already set up in `src/data/projects.ts` - your 5 projects are ready!

### Replace CV
Put your PDF at: `public/assets/Abdennebi_Souhail_CV.pdf`

## 🎨 Theme & Colors

Current theme: **Sky Blue** (#0ea5e9)

To change colors, edit `tailwind.config.js`:
```js
colors: {
  primary: {
    DEFAULT: '#your-color',
    // ... other shades
  }
}
```

## 📱 Mobile Responsive

All features work perfectly on:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🌐 Deploy

### Vercel (Recommended)
1. Push code to GitHub
2. Import in Vercel
3. Deploy automatically

### Netlify
1. Push code to GitHub
2. Connect repo in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

Or drag-and-drop the `dist` folder to Netlify.

## 🎯 Features at a Glance

| Feature | Status | File |
|---------|--------|------|
| Hero Section | ✅ | `Hero.tsx` |
| About Me | ✅ | `About.tsx` |
| Timeline | ✅ **NEW** | `Timeline.tsx` |
| Projects w/ Search | ✅ **ENHANCED** | `ProjectsEnhanced.tsx` |
| Skills Grid | ✅ | `Skills.tsx` |
| Contact Form | ✅ **ENHANCED** | `Contact.tsx` |
| Dark/Light Mode | ✅ | `ThemeContext.tsx` |
| Scrollspy | ✅ **NEW** | `useScrollSpy.ts` |
| Back-to-Top | ✅ **NEW** | `BackToTop.tsx` |
| Toast System | ✅ **NEW** | `ToastProvider.tsx` |
| Mobile Menu | ✅ **ENHANCED** | `Header.tsx` |
| Page Loader | ✅ **NEW** | `App.tsx` |

## 🔥 Pro Tips

1. **Search Projects**: Start typing in the search box to instantly filter
2. **Filter by Tech**: Click any technology tag to see related projects
3. **Quick Nav**: Click any header link to jump to that section
4. **Mobile Menu**: Tap the hamburger icon on mobile for full menu
5. **Back to Top**: Look for the floating arrow when scrolling down
6. **Dark Mode**: Toggle anytime with the sun/moon icon
7. **Download CV**: Click the CV button in header

## 📊 Performance

- **First Load**: ~800ms (with loader animation)
- **Build Time**: ~17 seconds
- **Bundle Size**: 315KB (gzipped: 104KB)
- **Lighthouse Score**: Ready for 90+

## 🛠️ Tech Stack

- ⚛️ React 18
- ⚡ Vite 5
- 🎨 Tailwind CSS 3
- 🎭 Framer Motion 11
- 🎯 TypeScript
- 📱 React Icons

## 📖 Documentation

- Full features list: `FEATURES.md`
- Main README: `README.md`
- This guide: `QUICKSTART.md`

## 🆘 Need Help?

### Dev server won't start?
```powershell
# Kill any process using port 5173
# Then restart
npm run dev
```

### Build fails?
```powershell
# Clean install
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json -Force
npm install
npm run build
```

### Port already in use?
Vite will automatically use the next available port (5174, 5175, etc.)

## ✅ Pre-Deployment Checklist

- [ ] Replace CV file with your actual resume
- [ ] Update Timeline with real experience
- [ ] Verify all project links work
- [ ] Test contact form submission
- [ ] Check mobile responsiveness
- [ ] Test dark/light mode toggle
- [ ] Verify all sections scroll smoothly
- [ ] Run `npm run build` successfully

## 🎉 You're All Set!

Your enhanced portfolio is ready to impress recruiters and showcase your skills professionally.

**Current Status**: ✅ Build passing | 🚀 Ready to deploy
