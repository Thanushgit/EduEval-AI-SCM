# EduEval AI

EduEval AI is an AI-powered answer evaluation system that helps teachers evaluate student answers using Artificial Intelligence. The teacher provides a question, marking criteria/rubric, maximum marks, and the student's answer. Google Gemini AI analyses the answer and generates marks, percentage, confidence, feedback, strengths, and weaknesses.

## Features

- Teacher and student login/signup
- Role-based access
- AI-based answer evaluation
- Handwritten answer image upload
- Evaluation based on question and rubric
- Automatic score and percentage
- Feedback, strengths, and weaknesses
- MySQL database for users and evaluations
- REST APIs

## Tech Stack

**Frontend:** React, TypeScript, Vite, HTML, CSS

**Backend:** Node.js, Express.js, TypeScript, REST APIs

**Database:** MySQL 8

**AI:** Google Gemini API

**Source Code Management:** Git and GitHub

## Project Structure

```
EduEval-AI-FIXED/
|-- src/
|   |-- components/
|   |-- views/
|   `-- App.tsx
|-- server.ts
|-- db.ts
|-- package.json
|-- package-lock.json
|-- .gitignore
|-- .env.example
`-- README.md
```

## Database

Database name: `edueval`

### users table

- id
- name
- email
- password
- role
- created_at

### evaluations table

- id
- teacher_id
- question
- rubric
- max_marks
- score
- percentage
- confidence
- summary_feedback
- strengths
- weaknesses
- student_answer
- created_at

## REST APIs

- GET /api/health
- POST /api/auth/signup
- POST /api/auth/login
- POST /api/evaluate
- GET /api/evaluations
- POST /api/generate-practice

## Team

**K Thanush**
- Backend development
- MySQL database
- REST APIs
- Authentication backend
- Evaluation data storage
- Backend testing and debugging

**Vishnupriya N R**
- Frontend development
- UI design
- React components
- User interface and interaction
- Frontend testing

## Version Control

This project uses Git and GitHub for source code management and team collaboration. As part of the SCM project requirements, all changes are tracked through meaningful, descriptive commits.

## GitHub Repository

https://github.com/Thanushgit/EduEval-AI-SCM.git

## Local Setup

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file with your `GEMINI_API_KEY`
4. Run `npm run dev`
5. The app runs on `http://localhost:3000`

## API Testing Examples

### Health Check
GET /api/health

### Login
POST /api/auth/login

Example request:
{
  "email": "teacher@test.com",
  "password": "Test1234"
}

### Signup
POST /api/auth/signup

Example request:
{
  "name": "New Teacher",
  "email": "newteacher@test.com",
  "password": "Test1234",
  "role": "teacher"
}

## Database Setup

Create the MySQL database before starting the application:

CREATE DATABASE edueval;

USE edueval;

The project uses two main tables:

- users - stores teacher and student accounts
- evaluations - stores answer evaluation results

The MySQL connection is configured in db.ts.

## Development Workflow

1. Create or update a feature.
2. Test the changes locally.
3. Check the Git status.
4. Stage the required files.
5. Create a meaningful commit.
6. Push the changes to GitHub.

## Backend API Testing

Tested REST APIs using curl:
- GET /api/health
- GET /api/db-health
- POST /api/auth/signup
- POST /api/auth/login
- POST /api/evaluate
- GET /api/evaluations
- GET /api/evaluations/:id
- DELETE /api/evaluations/:id

All tested APIs returned valid JSON responses during local development.

## Database Design

MySQL is used to store users and evaluation records. The users table manages teacher and student accounts, while the evaluations table stores questions, marks, percentages, feedback, and teacher ownership.

## Authentication

The backend provides signup and login REST APIs. Passwords are stored using bcrypt hashing, and users have teacher or student roles.

## Backend Architecture

The Express backend handles authentication, AI evaluation requests, MySQL database operations, and REST API responses. Gemini is used for answer evaluation and MySQL is used for persistent storage.

## Development Testing Workflow

Backend features are tested locally before pushing changes to GitHub. REST APIs are verified using curl and database results are checked directly in MySQL.
## Frontend Contribution

The frontend provides separate interfaces for teachers and students.

### Teacher Features
- Teacher dashboard
- Dashboard statistics
- Recent evaluation display
- Evaluation creation interface
- Student directory
- Analytics and performance views
- AI evaluation workflow

### Student Features
- Student dashboard
- Evaluation results
- Performance information
- Learning insights

### Frontend Technologies
- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Recharts
## API Health Check

The backend provides a health check endpoint to verify that the EduEval AI server is running correctly.

Endpoint:
`GET /api/health`

## Authentication APIs

The application provides authentication APIs for teachers and students.

- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - Authenticate an existing user
- Supports teacher and student roles
- Passwords are securely hashed before storage
## Database

EduEval AI uses MySQL for storing application data.

The database stores:
- User accounts
- Teacher and student roles
- Evaluation records
- Scores and feedback
- Evaluation timestamps
## Evaluation API

The evaluation API processes student answers and returns AI-based evaluation results.

- `POST /api/evaluate` - Evaluate a student answer
- `GET /api/evaluations` - Fetch teacher evaluations
- `GET /api/evaluations/:id` - Fetch a specific evaluation
- `DELETE /api/evaluations/:id` - Delete an evaluation
## Project Workflow

1. Teacher logs into the application.
2. Teacher creates an evaluation.
3. Student answer is processed by the AI system.
4. Evaluation results are generated.
5. Evaluation data is stored in MySQL.
6. Teacher can view previous evaluations from the dashboard.
