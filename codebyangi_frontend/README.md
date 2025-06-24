# Solo Project Frontend - Health Application
**GitHub Repository**: [CodeByAngi Frontend](https://github.com/codebyangi/SoloProject/tree/main/codebyangi_frontend)

## Project Background
The application allows a user in a medical office to create, review, update and delete
patient information in the system.  
For each patient, we have the following required fields : \
     - first name \
     - last name \
     - ssn (unique, DDD-DD-DDDD format) \
     - email: (unique, x@x.x format) \
     - street \
     - city \
     - state (US state abbreviation, capitalized) \
     - zip (DDDDD or DDDDD-DDDD format) \
     - age \
     - gender \
     - insurance.

For each patient, we have the following optional fields: \
     - height (optional field) \
     - weight (optional field).
     
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

## Live Deployment
The frontend is deployed and available at: [SoloProject - Frontend](https://soloproject-frontend.netlify.app/)
No local install or start commands are needed to use the deployed app. 
The application requires a running backend API, which is deployed and accessible at: [SoloProject - Backend](https://soloproject-ymc1.onrender.com/patients)

## Pre-requisites (for local development)
Node.js (v14.x or later) \
npm (v6.x or later) \
React (v17.x or later) \
ESLint

## Usage (for local development)
1. Make sure you have the [CodeByAngi_Backend](https://github.com/codebyangi/SoloProject/tree/main/codebyangi_backend) running.

2. Make sure you are in the project directory: [CodeByAngi Frontend](https://github.com/codebyangi/SoloProject/tree/main/codebyangi_frontend).

3. Open a new terminal tab/window at the root of the project directory

4. Install dependencies
### `npm install`

5. Run the application in the project directory
### `npm start`
Runs the app in the development mode.\

## External Dependencies 
React: A JavaScript library for building user interfaces. [React Documentation](https://reactjs.org/docs/getting-started.html) \
Axios: Promise based HTTP client for the browser and node.js. [Axios Documentation](https://axios-http.com/docs/intro) \
React Router: Declarative routing for React. [React Router Documentation](https://reactrouter.com/en/main/start/overview) 
Backend API: [CodeByAngi_Backend](https://github.com/codebyangi/SoloProject/tree/main/codebyangi_backend)

## Running ESLint
This project uses ESLint with Airbnb's configuration for JavaScript linting. 
1. To run ESLint and check for linting errors, use the following npm script. 
### `npm run lint`
This command will check your codebase for linting errors and provide output in the terminal.

2. Fix linting errors based on ESLint's recommendations.
You can often automatically fix many issues by running:
### `npm run lint:fix` 
This command attempts to fix ESLint errors automatically where possible. 

## Documentation 
This project follows JSDoc style for inline documentation. All functions and methods should be properly documented.
