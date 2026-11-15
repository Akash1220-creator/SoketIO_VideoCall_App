# 🎥 Socket.IO Video Calling Application

A modern, real-time video conferencing application built with **React**, **TypeScript**, **Tailwind CSS**, and **Socket.IO**. Designed for seamless peer-to-peer video calls, meeting room management, and collaborative sessions.

---

## 🚀 Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router DOM v7 (Nested & Protected Routes)
- **Real-time Engine:** Socket.IO / WebRTC
- **UI & Feedback:** React Hot Toast

---

## ✨ Features (Planned & In-Progress)

- 🔐 **Authentication & Protected Routing:** Secure authentication flow with public/private route guards.
- 📹 **Real-time Video Calling:** Low-latency video and audio streaming via WebRTC & Socket.IO.
- 👥 **Meeting Rooms:** Create or join dynamic rooms with custom meeting IDs.
- 📊 **Interactive Dashboard:** View past session history, active call statistics, and meeting summaries.
- 🎨 **Responsive Modern UI:** Clean, glassmorphic design built with Tailwind CSS.

---

## 📁 Project Structure

```bash
soket_project/
├── vite-project-frontend/               # Frontend Application (React 19 + Vite + TypeScript)
│   ├── src/
│   │   ├── assets/                      # Static assets & typed mock data
│   │   │   ├── assets.ts                # Mock users, sessions, participants & chat data
│   │   │   └── ...                      # Icons & media assets
│   │   ├── components/
│   │   │   ├── meeting/
│   │   │   │   ├── ChatDrawer.tsx
│   │   │   │   ├── ControlBar.tsx
│   │   │   │   ├── ParticipantsDrawer.tsx
│   │   │   │   └── VideoGrid.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProtectedLayout.tsx
│   │   │   └── ProtectedRoutes.tsx
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── hooks/
│   │   │   ├── index.ts
│   │   │   ├── useClickOutside.ts
│   │   │   └── useWebRTC.tsx
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── MeetingRoom.tsx
│   │   │   ├── Pricing.tsx
│   │   │   └── Session.tsx
│   │   ├── types/
│   │   │   ├── index.ts
│   │   │   ├── session.types.ts
│   │   │   └── user.types.ts
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── .gitignore
└── README.md
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Akash1220-creator/SoketIO_VideoCall_App.git
   cd SoketIO_VideoCall_App
   ```

2. **Navigate to the frontend directory:**
   ```bash
   cd vite-project-frontend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## 👤 Author

**Akash Chauhan**  
- GitHub: [@Akash1220-creator](https://github.com/Akash1220-creator)
