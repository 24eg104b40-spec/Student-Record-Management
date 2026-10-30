# Student Record Management System

Simple React and Spring Boot CRUD application for managing college student records.

## Prerequisites

- Java 17 or later
- Maven
- Node.js and npm
- No separate database installation is required; the backend uses H2.

## Database setup

The backend uses a file-backed H2 database stored in `backend/data/`, so no database server, username, or password configuration is required. Hibernate creates or updates the `students` table automatically. The database files are created after the backend starts and are ignored by Git.

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