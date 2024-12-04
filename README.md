
# StudySmart Web Application - Study Buddies Team

Welcome to the **StudySmart** repository! This project is being developed by the team **Study_Buddies** to help students generate personalized study aids from their study materials. Below, you will find an overview of our project, team, and development stack.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Development Setup](#development-setup)
- [Team Members](#team-members)
- [Documentation and Examples](#documentation-and-examples)

## Project Overview
**StudySmart** aims to help students in higher education or intensive learning programs create effective study aids such as flashcards, practice questions, and summaries from their uploaded materials. This solution helps reduce the time spent on crafting study aids, so that students can dedicate more time to mastering the content and reinforcing their learning.

**Challenge Statement**: Many students struggle with managing their time while preparing study aids like flashcards and practice questions. StudySmart automates this process using AI, allowing students to focus on reviewing and understanding the material rather than creating it.

**Repository**: [GitHub Repo Link](https://github.com/cen3031-studysmart/cen3031-group-project)

## Features
- **File Upload and Processing**: Students can upload study materials such as PDFs and text files to generate study aids.
- **Flashcard Generation**: Automatically create flashcards to review key concepts, with an intuitive interface for easy navigation.
- **Practice Questions**: Generate multiple types of questions (multiple choice, true/false, short answer) to test knowledge, with customizable difficulty levels.
- **Summaries**: Generate concise summaries to quickly review the most important information from study materials.
- **User Authentication**: Secure login with email and social login options (Google, Facebook).
- **Progress Tracking**: Track learning progress, strengths, and areas needing improvement, with a gamified approach.

## System Architecture
The StudySmart web application follows a **Microservices Architecture** for scalability and maintainability.

- **Frontend**: React-based user interface with components for user login, file upload, flashcard, and quiz interfaces.
- **Backend**: Node.js/Express services for user authentication, file processing, study aid generation, and progress tracking.
- **Database**: Oracle is used to store user data and generated study aids.
- **AI Integration**: An AI model generates personalized flashcards, summaries, and practice questions from uploaded materials.

**Architecture Pattern**: The system uses a microservices approach, which allows the backend services to scale independently and improves maintainability by isolating different services (e.g., authentication, study aid generation).

## Development Setup
- **Tech Stack**:
  - **Frontend**: React
  - **Backend**: Node.js / Express
  - **Database**: Oracle
  - **CI/CD**: Circle CI
  - **Collaboration Tools**: GitHub, Discord for team communication

- **Development Process**: The team follows an Agile Scrum process, using GitHub project boards to track progress.
- **Branch Management**: Branches are created for different features, and pull requests are reviewed before merging into the main branch.

## Team Members
- **Product Manager/Scrum Master**: Jonas Kazimli
- **Development Team Members**:
  - Emmanuel Nifakos
  - Alvaro Flores
  - Dylan Everett

## Documentation and Examples

### Writing API Endpoint

```
app.get('/api/message', (_, res) => {
    res.send({ message: 'Hello!' });
});
```

### Backend API Request

```
function BackendAPIRequest() {
    const [message, setMessage] = React.useState('');

    React.useEffect(() => {
        async function getMessage() {
            const request = await fetch('http://localhost:3000/api/message');
            const msg = await request.json();
            setMessage(msg.message);
        }
        getMessage();
    });

    return (
        <div>
            <p>API Response: {message}</p>
        </div>
    );
}
```

### Adding a New Route

* In `/client/src/main.jsx`, you can add/edit new routes by adding an entry to the `routes` array. For example, this is how to add a new route `/help` defined by the component `<Help />`:
```
import Help from '...';

const router = createBrowserRouter([
    [...]
    {
        path: '/help',
        element: <Help />,
    },
    [...]
]);

```

### Installation Instructions
* Clone the Repository:
    git clone https://github.com/cen3031-studysmart/cen3031-group-project.git
* Navigate to the Directory: cd /cen3031-group-project
* Install Dependencies:
npm install
npm install –prefix client
npm install –prefix server
* Add environment files to project
* Run the Application:
npm run dev
* Login and Access Credentials
Demo Account:
Username: john@smith.com
Password: JSm1thohn12@
* Environment Files
* Create a .env file in the /server directory and populate it with the following keys (Note: this requires the CISE account to have access to the StudySmart Oracle tables)
---

# Note

This project is for the CEN3031 group project.
