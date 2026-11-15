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
│   │   ├── components/                  # Reusable UI & Layout Components
│   │   │   ├── meeting/                 # In-meeting room components
│   │   │   │   ├── ChatDrawer.tsx       # Real-time in-meeting chat drawer
│   │   │   │   ├── ControlBar.tsx       # Floating bottom controls (Mic, Cam, Chat, Participants, Leave)
│   │   │   │   ├── ParticipantsDrawer.tsx # Participants list side drawer
│   │   │   │   └── VideoGrid.tsx        # Dynamic responsive video layout (1-4 columns)
│   │   │   ├── Footer.tsx               # Glassmorphic application footer
│   │   │   ├── Loader.tsx               # Loading spinner component
│   │   │   ├── Navbar.tsx               # Top navigation bar with active links & user dropdown
│   │   │   ├── ProtectedLayout.tsx      # Main layout wrapper with Navbar & Footer
│   │   │   └── ProtectedRoutes.tsx      # Authentication route guard
│   │   ├── context/                     # React Context providers
│   │   │   └── AuthContext.tsx          # Custom authentication state & user management
│   │   ├── hooks/                       # Custom React Hooks
│   │   │   ├── index.ts                 # Barrel exports for hooks
│   │   │   ├── useClickOutside.ts       # Detect outside clicks for dropdowns & popups
│   │   │   └── useWebRTC.tsx            # MediaStream, camera/mic toggle & WebRTC management
│   │   ├── pages/                       # Application Views / Route Pages
│   │   │   ├── Dashboard.tsx            # Dashboard with meeting generator & join meeting form
│   │   │   ├── Login.tsx                # Dual-mode authentication page (Login / Register)
│   │   │   ├── MeetingRoom.tsx          # Real-time meeting room interface container
│   │   │   ├── Pricing.tsx              # Subscription plans & pricing tiers
│   │   │   └── Session.tsx              # Meeting session logs & history
│   │   ├── types/                       # Centralized TypeScript definitions
│   │   │   ├── index.ts                 # Barrel export of all types
│   │   │   ├── session.types.ts         # Meeting, participant, chat & session interfaces
│   │   │   └── user.types.ts            # User profile & stats interfaces
│   │   ├── App.tsx                      # Root router configuration (Public & Protected routes)
│   │   ├── index.css                    # Tailwind CSS v4 styling rules
│   │   └── main.tsx                     # Application entry point with AuthProvider & Router
│   ├── package.json                     # Frontend dependencies & build scripts
│   ├── tsconfig.json                    # TypeScript compiler configuration
│   └── vite.config.ts                   # Vite configuration with Tailwind CSS plugin
├── .gitignore                           # Git ignore rules
└── README.md                            # Project documentation
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
