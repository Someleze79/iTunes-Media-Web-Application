# 🎵 iTunes Media Search Application

A full-stack web application that allows users to search for media content using the iTunes API. The app includes secure JWT authentication, a responsive React frontend, and an Express backend.

---

## 🚀 Live Demo
👉 https://itunes-media-web-application-1.onrender.com

---

## 📌 Features

- 🔍 Search for media (music, movies, podcasts, etc.)
- 🎨 Responsive user interface built with React
- 🔐 JWT-based authentication for secure API access
- ⚡ Fast API integration using Axios and Express
- 🗂 Filter results by media type
- ❤️ Add items to favourites (optional feature)

---

## 🛠 Tech Stack

### Frontend
- React
- JavaScript (ES6+)
- HTML5 & CSS3
- Axios

### Backend
- Node.js
- Express.js
- JWT (JSON Web Tokens)
- Axios

### Deployment
- Render (Full-stack deployment)

---

## ⚙️ Installation & Setup
```bash
### 1. Clone the repository
git clone https://github.com/Someleze79/iTunes-Media-Web-Application.git
cd iTunes-Media-Web-Application

### 2. Install dependencies
- Backend
cd backend
npm install

- frontend
cd frontend
npm install

### 3. Environment Variables
- Create .env file in the backend folder:
APP_SECRET=your_secret_key_here

### 4. Run the app locally
- Start backend
cd backend
node server.js

- Start frontend
cd frontend
npm start

### 5. Build for Production
cd frontend
npm run build
- Then move the build folder into the backend
```
---

## 🌍 Deployment
- The application is deployed on Render as a single full-stack service.

### Key Deployment Notes:
- Frontend and backend are served from the same server
- API routes:
  * /api/token
  * /api/search
- React app is served using Express static middleware

---

## 🧠 Challenges & Learnings
- Handling CORS issues in production
- Understanding the difference between localhost vs deployed environments
- Managing React production builds
- Debugging API communication between frontend and backend
- Implementing JWT authentication

---

## 📈 Future Improvements
- Add user accounts & persistent favourites
- Improve UI/UX design
- Add pagination for search results
- Implement error handling UI
- Add loading indicators
