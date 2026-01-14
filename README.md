# iTunes Media Search App

This is a Capstone Project web application that allows users to search for various media types (music, movies, audiobooks, etc.) using the official [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Introduction/Introduction.html). The app also allows users to manage a favourites list locally while they use the application.

---

## Features

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

## Technologies Used

- React
- Node.js
- Express
- JWT (jsonwebtoken)
- Axios
- iTunes Search API

---

## How to Install and Run the App Locally

### Prerequisites
- Node.js and npm installed on your local machine.

### 1. Clone or Download the Project
```bash
git clone https://github.com/your-username/itunes-search-app.git
cd itunes-search-app

### 2. Install Dependencies

# For the client (React front-end)
cd client
npm install

# For the server (Node/Express back-end)
cd ../server
npm instal

### 3. Create .env File in server

JWT_SECRET=your_jwt_secret_key

### 4. Start the Application

# Start the server
cd server
node index.js

# In a new terminal, start the client
cd ../client
npm start