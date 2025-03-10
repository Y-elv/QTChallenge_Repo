# URL Shortener Web App

## Overview

Welcome to the URL Shortener Web App! This project implements a full-stack URL shortener web application with a modern UI, secure authentication, and a scalable backend . Users can register, log in, shorten URLs, and view analytics for their shortened URLs.

## Features & Requirements

### Authentication & User Management
- **User Registration & Login**: Users must sign up and log in to use the URL shortener service. JWT-based authentication (access & refresh tokens) is used. Passwords are securely stored with bcrypt or Argon2.
- **Authorization & Access Control**: Only authenticated users can create, view, and manage their URLs. Each user can only see their own shortened URLs.
- **OAuth (Bonus Feature)**: Social login (Google/GitHub OAuth) for faster access.

### Frontend
- **UI Components**:
  - Login & Register pages with form validation.
  - Landing Page: A simple webpage.
  - Dashboard for authenticated users to manage shortened URLs.
  - URL Shortening Page with an input field & copy button.
  - URL Analytics Page showing clicks & usage stats.
- **Tech Stack**:
  - React.js with TypeScript
  - TailwindCSS (or any other CSS framework/library of your choice)
  - React Query / SWR for state management (optional)
- **API Integration**:
  - Use JWT tokens for authenticated API requests.
  - Show error messages for invalid credentials or API failures.

### Backend
- **API Endpoints**:
  - `POST /auth/register`: User registration
  - `POST /auth/login`: User login & JWT token generation
  - `POST /auth/logout`: Logout & token invalidation
  - `POST /shorten`: Authenticated users shorten URLs
  - `GET /urls`: Fetch user-specific URLs
  - `GET /analytics/:shortUrl`: Get URL stats

### Deployment 
- **Containerization**:
  - Dockerized backend & frontend.
  - Provide a `docker-compose.yml` for local setup.
- **Local or Cloud Deployment**: Deploy anywhere you prefer.


## Technology Stack

### Backend
- Java Spring Boot
- PostgreSQL 
- JWT for authentication

### Frontend
- React.js with TypeScript

## Getting Started

### Prerequisites
- Node.js and npm installed
- PostgreSQL
- Java Development Kit (JDK) installed

### Installation

1. Clone the repository:
    
    ```bash
    git clone https://github.com/Y-elv/QTChallenge_Repo.git
    cd QTChallenge_Repo
    ```

2. Set up the backend:
    
    ```bash
    cd service
    ./mvnw install
    ```

3. Set up the frontend:
    
    ```bash
    cd client
    npm install
    ```

### Configuration

1. **Backend**: Configure your database and JWT credentials in the `service/src/main/resources/application.properties` file.
    
    ```properties
    spring.datasource.url=your_database_url
    jwt.secret=your_jwt_secret
    ```

2. **Frontend**: Configure your API endpoints in the `client/.env` file.
    
    ```env
    REACT_APP_API_URL=your_api_url
    ```

### Running the Application

1. **Backend**:
    
    ```bash
    cd service
    ./mvnw spring-boot:run
    ```

2. **Frontend**:
    
    ```bash
    cd client
    npm run dev 
    ```

## License

This project is licensed under the MIT License.