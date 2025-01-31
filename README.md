# 📝 Note Taking App

A simple and efficient note-taking application built with **TypeScript**, **Node.js**, **Express**, and **MongoDB**. This app allows users to create, update, delete, and retrieve notes effortlessly.

## Disclamer: The database is running on a private mongoDb database so you won't be able to fetch data from backend. 

## 🚀 Features

- ✍️ Create, read, update, and delete (CRUD) notes
- 📁 Organize notes into categories or tags
- 📅 Timestamp for each note
- 🔍 Search and filter functionality
- 🗄️ MongoDB database for persistent storage

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose ORM
- **Environment Variables:** dotenv
- **Frontend:** Typescript

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/note-taking-app.git
   cd note-taking-app
   ```
2. Install dependencies:
   
   **Backend:** 
   ```bash
   cd backend
   npm install
   ```
    **Frontend:** 
   ```bash
   cd frontend
   npm install
   ```
4. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
5. Start the server:
   ```bash
   npm run d
   ```

## 🔧 API Endpoints

| Method | Endpoint        | Description              |
|--------|----------------|--------------------------|
| GET    | `/notes`       | Get all notes            |
| GET    | `/notes/tags`  | Get all tags             |
| GET    | `/notes/:id`   | Get a single note        |
| POST   | `/notes`       | Create a new note        |
| PUT    | `/notes/:id`   | Update a note            |
| DELETE | `/notes/:id`   | Delete a note            |

