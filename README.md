# 🎵 iTunes Media Search App

A full-stack web application that allows users to search, explore, and manage media content from the iTunes Store. The app integrates the iTunes Search API, providing a clean and responsive interface for browsing music, movies, podcasts, and more, with user authentication and favourites management.

---

## 🚀 Features

### Front-end (React)
- Built with React for a responsive and interactive user experience.
- Media search functionality based on keyword and selected media type.
- Clean and attractive UI with cards to display results.
- Ability to add/remove media items to/from a favourites list.
- Favourites list is stored temporarily in memory (not persisted after app closes).

### Back-end (Node.js + Express)
- Express server serves the React front-end and handles API requests.
- Custom /api/search route that fetches data from the iTunes API using user-provided query and media type.
- JWT authorization used to secure API requests (no user login required).

---

## 🧰 Technologies Used

### Front-end

- React
- JavaScript (ES6+)
- HTML5 & CSS3
- Fetch API
- Axios (Calls Express API)

### Backend
- Node.js
- Express.js
- JSON Web Tokens (JWT)
- Middleware for authorization and validation
- Axios (Calls iTunes Search API)

---

## 🛠️ How to Install and Run the App Locally

### Prerequisites
- Node.js and npm installed on your local machine.

```bash
1. Clone or Download the Project
- git clone https://github.com/your-username/itunes-search-app.git
- cd itunes-search-app

2. Install Dependencies

# For the client (React front-end)
- cd client
- npm install

# For the server (Node/Express back-end)
- cd server
- npm instal

3. Create .env File in server
- JWT_SECRET=your_jwt_secret_key

4. Start the Application

# Start the server
- cd server
- node index.js

# In a new terminal, start the client
- cd client
- npm start
