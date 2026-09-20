CREATE DATABASE IF NOT EXISTS edueval;
USE edueval;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('teacher', 'student') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS evaluations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id INT NOT NULL,
    student_name VARCHAR(100),
    question TEXT NOT NULL,
    rubric TEXT,
    max_marks DECIMAL(5,2) NOT NULL,
    score DECIMAL(5,2) DEFAULT NULL,
    percentage DECIMAL(5,2) DEFAULT NULL,
    grade VARCHAR(10) DEFAULT NULL,
    confidence DECIMAL(5,2) DEFAULT NULL,
    summary_feedback TEXT,
    strengths TEXT,
    weaknesses TEXT,
    student_answer TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE
);
