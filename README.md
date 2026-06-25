# Interview Master

Interview Master is a full-stack web application that helps candidates prepare for technical interviews using AI. Instead of providing generic interview questions, the application analyzes a candidate's resume along with a job description to generate a personalized interview preparation report.

The goal of this project was to build something that combines modern web development with AI in a practical way. It covers authentication, file uploads, PDF processing, API integration, and secure session management in a single application.

---

## Features

* User authentication using JWT Access Tokens and Refresh Tokens
* Secure session management with HTTP-only cookies
* Resume upload (PDF)
* Resume text extraction
* AI-powered interview report generation
* Technical interview questions with expected approach
* Behavioral interview questions
* Resume and job description match score
* Skill gap analysis
* Personalized day-wise preparation plan
* Download AI-generated resume as PDF
* Protected routes with automatic token refresh
* Fully responsive user interface

---

## Tech Stack

### Frontend

* React.js
* React Router
* Axios
* SCSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer
* PDF Parser
* Puppeteer

### AI

* Google Gemini API

### Deployment

* Frontend – Vercel
* Backend – Render
* Database – MongoDB Atlas

---

## Project Structure

```
Frontend/
│
├── src/
│   ├── features/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── styles/

Backend/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   ├── services/
│   └── config/
```

---

## How It Works

1. User creates an account or logs in.
2. A resume PDF is uploaded along with a job description.
3. The backend extracts text from the resume.
4. Resume content, self-description, and job description are sent to Gemini.
5. Gemini returns a structured interview report.
6. The report is stored in MongoDB.
7. Users can revisit previous reports or download the generated resume as a PDF.

---

## Authentication Flow

The application uses a combination of Access Tokens and Refresh Tokens.

* Short-lived Access Token for API requests
* Long-lived Refresh Token stored as an HTTP-only cookie
* Automatic Access Token renewal using Axios interceptors
* Refresh Token blacklisting on logout
* Protected API routes using middleware

---

## Environment Variables

Backend

```
PORT=

MONGODB_URI=

JWT_SECRET=

GOOGLE_GEMINI_API_KEY=
```

Frontend

```
VITE_API_URL=
```

---

## Running Locally

Clone the repository

```bash
git clone <repository-url>
```

### Backend

```bash
cd Backend

npm install

npm run dev
```

### Frontend

```bash
cd Frontend

npm install

npm run dev
```

---

## Future Improvements

Some features I plan to add in the future:

* Mock interview voice mode
* AI-generated interview feedback
* Multiple resume templates
* Interview progress tracking
* Company-specific interview preparation
* Email report sharing
* Dark mode

---

## What I Learned

Working on this project helped me understand much more than just building CRUD applications. Some of the concepts I explored while building Interview Master include:

* JWT authentication
* Refresh token implementation
* Token blacklisting
* Cross-origin authentication
* File uploads
* PDF parsing and generation
* AI API integration
* Structured JSON generation
* Axios request and response interceptors
* REST API design
* Deployment on Vercel and Render

---

## Screenshots

* Login page
<img width="1312" height="784" alt="image" src="https://github.com/user-attachments/assets/91e65290-d064-4062-a488-8804933db63e" />

* Home page
  <img width="1865" height="852" alt="Screenshot 2026-06-25 112907" src="https://github.com/user-attachments/assets/e87eeb37-1116-466d-9b1e-fe224496eb49" />

  
* Generated interview report <img width="1487" height="852" alt="image" src="https://github.com/user-attachments/assets/e3b75a98-915d-4ccf-ac52-b42400cb5def" />
<img width="1600" height="853" alt="image" src="https://github.com/user-attachments/assets/f7087942-b55e-488d-ad87-ea81de0ecfcf" />
<img width="1495" height="848" alt="image" src="https://github.com/user-attachments/assets/f6ebe1db-2d1a-45ff-96ed-c193c2bdd37c" />


---

## License

This project is open for learning and educational purposes.
