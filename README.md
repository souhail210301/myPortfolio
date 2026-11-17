# Souhail Abdennebi — Portfolio

A modern, responsive personal portfolio built with React + Vite, Tailwind CSS, and Framer Motion. Ready for deployment on Vercel or Netlify.

## Features

- React + Vite for fast dev/build
- Tailwind CSS styling with dark/light mode toggle
- Smooth scrolling and animations (Framer Motion)
- **Scrollspy navigation** - Active section highlighting in header
- **Mobile-friendly menu** - Responsive hamburger menu for small screens
- Sections: Hero, About, **Timeline**, Projects (with modal), Skills, Contact
- **Enhanced Projects section** with:
  - Live search/filter by project name or description
  - Filter by technology tags
  - Animated project cards with layout transitions
- **Experience & Education Timeline** - Visual timeline with your background
- Project cards open a modal with details and GitHub link
- **Toast notifications** - Success/error feedback for form submissions
- **Back-to-top button** - Appears on scroll with smooth animation
- **Page loader animation** - Professional loading screen on initial load
- CV download button (`/public/assets/Abdennebi_Souhail_CV.pdf`)
- Netlify Forms integration with success page
- Deploy-ready (Vercel/Netlify)

## Getting Started

1. Install dependencies

```powershell
npm install
```

2. Start the dev server

```powershell
npm run dev
```

3. Build for production

```powershell
npm run build
```

4. Preview the build

```powershell
npm run preview
```

## Project Structure

- `src/components`: UI sections and shared components
  - `Header.tsx` - Navigation with scrollspy and mobile menu
  - `Hero.tsx` - Landing section with introduction
  - `About.tsx` - Education and languages
  - `Timeline.tsx` - Experience & education timeline
  - `ProjectsEnhanced.tsx` - Projects with search/filter
  - `Skills.tsx` - Tech stack categorized by domain
  - `Contact.tsx` - Contact form with toast notifications
  - `Footer.tsx` - Footer with back-to-top link
  - `BackToTop.tsx` - Floating back-to-top button
  - `ToastProvider.tsx` - Toast notification system
- `src/hooks`: Custom React hooks
  - `useScrollSpy.ts` - Section intersection observer
- `src/data/projects.ts`: Project list powering the Projects section
- `src/theme/ThemeContext.tsx`: Dark/light mode provider
- `src/styles/index.css`: Tailwind and global styles
- `public/assets/Abdennebi_Souhail_CV.pdf`: CV file (replace with your own)
- `public/success.html`: Netlify Forms success page

## Deploy

### Vercel
- Import the repo into Vercel and select the project
- Framework preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

### Netlify
- New site from Git
- Build command: `npm run build`
- Publish directory: `dist`
- Alternatively, drag-and-drop the `dist` folder to Netlify Deploys

## Customize
- Update `src/data/projects.ts` to change project details
- Replace `public/assets/Abdennebi_Souhail_CV.pdf` with your CV
- Tweak colors in `tailwind.config.js`

## License
This project is provided for personal use by Abdennebi Souhail. You may reference the structure but please do not republish as your own.