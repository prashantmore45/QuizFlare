# 📝 QuizMaster: Full-Stack Examination Platform

A dynamic, full-stack quiz application designed for seamless assessment creation and participation. Built with the **MERN Stack**, this platform features secure user authentication, real-time score calculation, and a mobile-responsive interface for learning on the go.

## 🔴 Live Demo
[Comming Soon]

## ⚙️ Backend API
[Comming Soon]

---

## 🚀 Key Features

- **Secure Authentication**: Full JWT-based Login and Registration system to protect user data and quiz history.
- **Dynamic Quiz Creation**: Intuitive interface for users to build custom quizzes with multiple-choice questions.
- **Interactive Examination UI**: A **"One Question at a Time"** focus mode to improve user concentration and UX.
- **Instant Analytics**: Real-time result calculation upon submission, providing immediate feedback to the learner.
- **Responsive Design**: Fully optimized for desktops, tablets, and smartphones.

---

## 🛠️ Technical Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React.js, CSS3 (Flexbox/Grid) |
| Backend  | Node.js, Express.js |
| Database | MongoDB Atlas (NoSQL) |
| Security | JSON Web Tokens (JWT), Bcrypt.js |

---

## 📂 Project Architecture

The application follows a clean **Client–Server** architecture to ensure scalability and ease of maintenance:

- **Frontend**: React components manage the state of the quiz and handle API calls via Axios/Fetch.
- **Backend**: Express REST APIs handle business logic, such as validating quiz answers and managing user sessions.
- **Database**: MongoDB stores user profiles, quiz metadata, and examination results.

---

## ⚙️ Local Development Setup

### 1) Prerequisites
- Node.js (**v18+**)
- MongoDB Atlas connection string
- A Windows 11/Linux development environment (HP Victus or similar)

### 2) Installation

```bash
# Clone the repository
git clone https://github.com/prashantmore45/online-quiz-maker.git
cd online-quiz-maker

# Setup Backend
cd backend
npm install
# Create a .env file with: MONGO_URI, JWT_SECRET, PORT
npm run dev

# Setup Frontend
cd ../frontend
npm install
npm start
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## 📜 Internship & Attribution

This project was developed as a **Level 2 Task** during my **Web Development Internship at CodSoft (Jan–Feb 2026)**.  
It demonstrates core competencies in Full-Stack development, CRUD operations, and Secure API design.

---

## 👤 Author

**Prashant Maruti More**  
Computer Engineering Student @ SPPU  

- LinkedIn: https://www.linkedin.com/in/prashantmore45/
- GitHub: https://github.com/prashantmore45
