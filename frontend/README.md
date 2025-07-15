# Project Overview
TaskMate is a full-stack task management web application designed to help users efficiently manage their daily tasks with advanced features like authentication, Two-Factor Authentication (2FA), and task tracking.

# Key Features
-- User Registration & Login with JWT Authentication
-- Enable/Verify Two-Factor Authentication (2FA) for enhanced security
-- Task Creation, Viewing, Updating, and Deletion
-- Responsive UI built with React & Bootstrap
-- RESTful API powered by Node.js, Express, and MongoDB

# Step-by-Step Setup Instructions
--Backend Setup (Express.js + MongoDB)
Repositary URL - https://github.com/ThulaniDissanayake/taskmate-app.git
Install dependencies - npm install
Create a .env file in the root folder- PORT=5000
                                       MONGO_URI=mongodb+srv://it22157232:1234@task.pgt3jhz.mongodb.net/?retryWrites=true&w=majority&appName=task
                                       JWT_SECRET=SecurityKeyJWT
Run the backend server- npm run dev

-- Frontend Setup (React.js)
Install dependencies - npm install
Run the frontend app - npm start

# npm start
-- Backend Docker
docker build -t taskmate-backend .
docker run -d -p 5000:5000 --env-file .env taskmate-backend

-- Frontend Docker
docker build -t taskmate-frontend .
docker run -d -p 3000:3000 taskmate-frontend

#  Live Demo 
Frontend Live - https://hchgch.netlify.app/login