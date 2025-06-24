# Solo Project Backend - Health Application
**GitHub Repository**: [CodeByAngi_Backend](https://github.com/codebyangi/SoloProject/tree/main/codebyangi_backend)

The Health application is a Spring REST API application and it uses a three-layered architecture with presentation, service, and data layers.
It's designed to manage patient data for a healthcare company.
This application exposes endpoints for basic CRUD operations to create, read, update, and delete patients.

## Live deployment 
The backend is deployed and accessible at: [SoloProject - Backend](https://soloproject-ymc1.onrender.com/patients)
The frontend is deployed and available at: [SoloProject - Frontend](https://soloproject-frontend.netlify.app/)
The backend is deployed on Render, and is connected to a hosted PostgreSQL database.
No local setup is required to use the deployed app.

## Startup (for local development)

Make sure you are in the project directory: [CodeByAngi Backend](https://github.com/codebyangi/SoloProject/tree/main/codebyangi_backend).

Open the HealthApplication file using IntelliJ ( look under : src\main\java\demo ) and use the green play button in the left gutter to start the application.

This was build using JDK 17 as SDK. You can check this by going to File > Project Structure > Project and make sure an SDK is selected. If not, you have to add one and install it. 

If the green play button is not active, right-click on pom.xml file and select Add as Maven Project.  

## Pre-requisites

- Java 11 or higher
- IntelliJ IDEA
- Maven 3.6.0 or higher
- Postman
- PostgresSQL

## Postman

- A Postman collection is included at the root of the project repository. In order to use it, you have to import it in Postman by clicking the "Import" button in the top-left corner and choose the file HealthAPI.postman_collection.
- After importing, you will see the Postman collection in Postman sidebar. Select a request and click "Send" to get the results.
- It demonstrates all of the 2XX and 4XX functional requirements for GET, POST, PUT, and DELETE methods for a Patient entity. 

## Endpoints

These are the main endpoints this application uses to manage movies:

- GET /patients - Retrieve a list of all patients
- GET /patients/{id} - Retrieve details of a specific patient by ID
- POST /patients - Create a new patient
- PUT /patients/{id} - Update an existing patient with a given ID
- DELETE /patients/{id} - Delete a patient by a given ID

## JSON object

Use the following as a JSON body. 
We do not supply an id on the POST, as that is the application's job to manage.
This is an example of a valid JSON Patient Object to use in your Postman requests:
```
 {
"firstName": "Victor", 
"lastName": "Stephens", 
"ssn": "123-45-6789",
"email": "vsteph@comcast.com",
"street": "8430 W Sunset Blvd",
"city": "Los Angeles",
"state": "CA",
"zip": "90049",
"age": 66,
"height": 79,
"weight": 299,
"gender": "Male",
"insurance": "Self-Insured"
}
```

## Testing
Running Mockito Unit Tests

- Look for PatientServiceImplTests file under : src\test\java\demo.
- Code coverage can be viewed by right-clicking the file and go to : More Run/Debug and choose => Run 'PatientServiceImplTests' with Coverage.
- Coverage can also be run if you open the file in IntelliJ, press the green play button in the left gutter to start the tests and choose : Run 'PatientServiceImplTests' with Coverage.
- The PatientServiceImplTests class provides examples of testing various methods.
- You can also run each test individually, by pressing the green play button in the left gutter.

## FrontEndConfig

The FrontEndConfig class is a Spring configuration class designed to set up Cross-Origin Resource Sharing (CORS) for 
the backend application. This configuration allows the backend to accept requests from the specified front-end origin 
(React frontend URL: [React App](https://soloproject-frontend.netlify.app), 
enabling smooth communication between the two layers of the application.
