# ⚡ QuizFlare 

![QuizFlare Banner](https://via.placeholder.com/1000x300/1e293b/8b5cf6?text=QuizFlare+-+The+Ultimate+Online+Quiz+Platform)

> A modern, premium, full-stack examination and quiz platform built with the MERN stack. Designed with a sleek glassmorphic UI, robust role-based access control, and dynamic progress analytics.

**[🔴 Live Demo](https://quizflare.vercel.app/)** | **[⚙️ Backend API](https://quizflare.onrender.com/)**

---

## ✨ Key Features

### 🛡️ For Administrators
- **Dashboard Overview**: Monitor total users, active quizzes, and system metrics at a glance.
- **Quiz Management**: Create, edit, and delete quizzes with unlimited custom questions and options.
- **User Management**: View registered users, track their progress, and oversee platform activity.

### 🎓 For Users
- **Progress Tracking**: Visualize your learning journey with a dedicated analytics dashboard showing your scores, average accuracy, and history.
- **Focus Mode Examination**: A distraction-free, one-question-at-a-time interface for taking quizzes.
- **Instant Results**: Get immediate feedback, scores, and correct answers upon quiz submission.

### 🎨 Design & UX
- **Premium Glassmorphism**: Frosted glass effects, subtle gradients, and modern drop shadows.
- **Dark/Light Mode**: Fully integrated theme toggling that persists across sessions.
- **Responsive Architecture**: Flawless experience across desktops, tablets, and mobile devices with a smart sidebar and hamburger navigation.
- **Custom Aesthetics**: Polished custom scrollbars and smooth micro-animations.

---

## 🛠️ Technology Stack

**Frontend Architecture:**
- React.js (v18)
- React Router DOM (v6)
- Lucide React (Iconography)
- Axios (HTTP Client)
- Custom Vanilla CSS3 (Variables, Grid, Flexbox, Media Queries)
- Hosted on **Vercel**

**Backend Architecture:**
- Node.js & Express.js
- MongoDB & Mongoose (Database & ODM)
- JSON Web Tokens (JWT) for stateless authentication
- Bcrypt.js for secure password hashing
- Hosted on **Render**

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v16 or higher)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account and connection string.

### 1. Clone the repository
```bash
git clone https://github.com/prashantmore45/quizflare.git
cd quizflare
```

### 2. Setup the Backend
Open a new terminal and navigate to the backend directory:
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```
Start the backend server:
```bash
npm run dev
```

### 3. Setup the Frontend
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` folder:
```env
REACT_APP_API_URL=http://localhost:5000/api
```
Start the frontend development server:
```bash
npm start
```

Your app will be running at `http://localhost:3000`.

---

## 🔗 API Endpoints Overview

| Route | Method | Description | Access |
|-------|--------|-------------|---------|
| `/api/auth/register` | POST | Register a new user | Public |
| `/api/auth/login` | POST | Authenticate user & get token | Public |
| `/api/auth/me` | GET | Get current logged-in user | Private |
| `/api/quizzes` | GET | Get all available quizzes | Private |
| `/api/quizzes` | POST | Create a new quiz | Private (Admin) |
| `/api/quizzes/:id` | GET | Get a specific quiz | Private |
| `/api/results` | POST | Submit quiz answers | Private |
| `/api/results/my-results`| GET | Get logged-in user's history | Private |
| `/api/results/leaderboard`| GET | Get top performers | Public |
| `/api/stats` | GET | Get platform statistics | Public |
| `/api/contact` | POST | Submit a contact form | Public |

---

## 👨‍💻 Author

**Prashant Maruti More**  
Computer Engineering Student @ SPPU  

- 🔗 LinkedIn: [prashantmore45](https://www.linkedin.com/in/prashantmore45/)
- 💻 GitHub: [prashantmore45](https://github.com/prashantmore45)

*This project was initiated as a Level 2 Task during a Web Development Internship at CodSoft (Jan–Feb 2026) and was significantly expanded into a full-scale application.*
