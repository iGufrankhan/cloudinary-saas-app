# 🎬 VidStream — Explore, Upload & Download Videos Seamlessly

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Clerk Auth](https://img.shields.io/badge/Auth-Clerk-purple?logo=clerk)](https://clerk.com/)
[![TailwindCSS](https://img.shields.io/badge/Styled_with-TailwindCSS-38BDF8?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> 🚀 A powerful cloud-based platform to **upload, explore, and download videos** — built with **Next.js 14**, **TypeScript**, and **Clerk Authentication**.  
> Elegant UI. Smooth animations. Secure uploads.

---

## 🌐 Live Demo

🔗 **Live Project:** [https://vidstream-demo.vercel.app](https://vidstream-demo.vercel.app)

_(Replace with your deployed link once you deploy on [Vercel](https://vercel.com))_

---

## 🚀 Features

✅ **Video Uploads** – Upload videos with title & description (up to 70MB).  
🎥 **Explore Videos** – Browse videos in a modern responsive grid layout.  
⬇️ **Instant Download** – Download any uploaded video with one click.  
👤 **User Authentication** – Secure login & registration powered by Clerk.  
🌈 **Modern Design** – Beautiful UI using TailwindCSS + Framer Motion.  
📱 **Fully Responsive** – Works perfectly on all screen sizes.

---

## 🧠 Tech Stack

| Technology | Description |
|-------------|-------------|
| **Next.js 14 (App Router)** | Framework for frontend and API routes |
| **TypeScript** | Type-safe, scalable development |
| **Clerk** | User authentication & profile management |
| **Axios** | Handles API requests |
| **Cloudinary** | Video storage & delivery |
| **Framer Motion** | Animations & transitions |
| **Tailwind CSS** | Modern styling framework |
| **Lucide Icons** | Clean and minimal icon set |

---

## 🛠️ Installation & Setup

### 1️⃣ Clone this repository
```bash
git clone https://github.com/your-username/vidstream.git
cd vidstream
```


2️⃣ Install dependencies
npm install

3️⃣ Setup environment variables

Create a .env.local file in the root directory and add:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

4️⃣ Run the development server
npm run dev

5️⃣ Open in browser
http://localhost:3000

📂 Project Structure
vidstream/
├── app/
│   ├── home/                # Video Explorer Page
│   ├── video-upload/        # Upload Page
│   ├── layout.tsx           # App Layout with Clerk Integration
│   └── page.tsx             # Landing Page
├── components/
│   ├── VideoCard.tsx        # Video Card Component
│   └── Sidebar.tsx          # Sidebar Navigation
├── pages/api/
│   ├── videos.ts            # Fetch All Videos
│   └── video-upload.ts      # Handle Video Upload
├── public/
│   └── assets/              # Static Files
├── styles/
│   └── globals.css
└── README.md

💡 Future Enhancements

🧠 AI-based video tagging and categorization

💬 Comment & Like system

🔍 Search and filtering

📊 Video analytics dashboard

🧑‍💻 Author

Developed by: Your Name

Tech Stack: Next.js • TypeScript • Clerk • TailwindCSS • Cloudinary

🪄 Demo & Preview

🚀 Live Demo: https://vidstream-demo.vercel.app

📸 Preview: Add screenshots or GIFs here after deployment




