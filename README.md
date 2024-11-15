
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

### Env Files

1. Create a `.env.local` file in the `/client` directory for Clerk to work
    * Create a property called `VITE_CLERK_PUBLISHABLE_KEY` with the key pinned in the Discord
    * Create a property called `PORT=5173`
2. Create a `.env` file in the `/server` directory for Oracle DB
    * Create a property called `DB_USER` with your Gatorlink username
    * Create a property called `DB_PASSWORD` with your Oracle password ([Link to Password](https://register.cise.ufl.edu/oracle/))

### Accessing Oracle DB

* Make sure you're connected to the UF VPN
* Log into Oracle using `sqlplus` in the command line or SQLDeveloper ([CISE Documentation](https://it.cise.ufl.edu/support/oracle-database/#determining-the-name-of-the-database-instance))
* Access a table using the syntax: `SELECT * FROM "EMMANUELNIFAKOS".studysmart_user;`
    * Make sure `"EMMANUELNIFAKOS"` is capitalized

### Making a Database Query from StudySmart

* **Important**: This will only work if your machine is connected to the [UF VPN](https://it.ufl.edu/ict/documentation/network-infrastructure/vpn/cisco-secure-vpn-installation--config-guide/)
* All database queries should be written in `/server/src/db.js`
* All SQL queries should be kept separate from business logic for easier unit testing

1. Create an asynchronous function: `export async function getUsers()`
2. Insert a `try`-block to catch errors
3. Get a database connection: `const connection = await createConnection()`
4. Execute an SQL query: ```const result = await connection.execute(sql`SELECT * FROM studysmart_user`)```
5. Get the result: `const rows = result.rows`
6. Close the connection after transaction is completed: `connection.close()`
7. Add a `catch`-block to catch exceptions

```
// /server/src/db.js
export async function getUsers() {
    try {
        const connection = await createConnection();

        const result = await connection.execute(sql`SELECT * FROM studysmart_user`);
        return result.rows;
        connection.close();
    } catch (e) {
        console.error(`Operation was unsuccessful`);
    }
}

```

### Further Reading

* [Oracle](https://www.oracletutorial.com/)
* [CISE](https://it.cise.ufl.edu/support/oracle-database/)
    * [Oracle DB Password](https://register.cise.ufl.edu/oracle/)
* [Clerk](https://clerk.com/docs)
* [React Router](https://reactrouter.com/en/main/start/overview)
* [ExpressJS](https://expressjs.com/en/5x/api.html)

---

# Note

This project is for the CEN3031 group project.
