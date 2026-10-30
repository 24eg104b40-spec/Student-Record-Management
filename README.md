# Student Record Management System

Simple React and Spring Boot CRUD application for managing college student records.

## Prerequisites

- Java 17 or later
- Maven
- Node.js and npm
- MySQL

## MySQL setup

Create the database in MySQL:

```sql
CREATE DATABASE student_db;
```

Open `backend/src/main/resources/application.properties` and replace `YOUR_USERNAME` and `YOUR_PASSWORD` with your local MySQL credentials. Hibernate creates or updates the `students` table automatically.

## Start the backend

```bash
cd student-management/backend
mvn spring-boot:run
```

The API runs at `http://localhost:8080`.

## Start the frontend

Open a second terminal:

```bash
cd student-management/frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

## Test CRUD operations

1. Fill in all required fields and click **Add Student**.
2. Confirm the new row appears in the table.
3. Click **Edit**, change a value, and click **Update Student**.
4. Click **Delete** and confirm the prompt.
5. Try an existing roll number or invalid email to verify error validation.