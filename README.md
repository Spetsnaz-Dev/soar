# SOAR Assignment Level 2

**How to Set Up This Project and Start Application:**

1. Run `npm install` to install the dependencies.
2. Run `npm run start` to start the application.
3. Run `node generateToken.js` to generate a new JWT for a given user.
4. Use this token as a Bearer JWT token.
5. Directly import the API collection file and use it. See list of Variables for the collection after importing.

**LIVE Hosted URL:** [https://soar-krln.onrender.com](https://soar-krln.onrender.com)

**Postman Collection JSON with examples:** Collection file included in project files

**Assumptions and Extras:**

- Didn't run the app on multiple ports just for simplicity but I have tested and commented the code in the server file.
- I have created a separate file `generateToken.js` to mimic the signing and creaton of JWT token and use it within our APIs. Please run `node generateToken.js` to generate a new token by replacing info into the sample fields.

## Authentication Flow

### Overview

Authentication in this system is based on **JWT (JSON Web Tokens)**. The token is required for accessing all secured endpoints. The flow ensures that only authenticated and authorized users can perform specific actions based on their roles.

### Steps

1. **Login (Token Generation)**

   - A user (e.g., superadmin or schooladmin) logs in to the system.
   - The system validates the credentials and generates a JWT token.
   - The token includes:
     - `id`: The user's unique identifier.
     - `role`: The user's role (e.g., superadmin, schooladmin).
     - `iat` and `exp`: Token issued at and expiration timestamps.

2. **Access Protected Endpoints**

   - The client includes the token in the `Authorization` header of the request.
     ```
     Authorization: Bearer <your-jwt-token>
     ```
   - The server validates the token using the `JWT_SECRET`.

3. **Role-Based Access Control (RBAC)**

   - After validating the token, the server checks the user's role to determine if they are authorized to access the endpoint.
   - Example roles:
     - `superadmin`: Full access to all endpoints.
     - `schooladmin`: Access to classroom and student endpoints only.

4. **Token Expiry**
   - If the token is expired, the user must re-authenticate to obtain a new token.

### Error Scenarios

1. **Invalid Token**:
   - If the token is missing, malformed, or invalid, the server returns:
     ```json
     {
       "error": "Unauthorized"
     }
     ```
2. **Insufficient Permissions**:
   - If the user's role does not allow access to the requested resource, the server returns:
     ```json
     {
       "error": "Forbidden"
     }
     ```

## Error Codes and Handling (for this project)

| HTTP Status Code | Description           | Example Response                                                      |
| ---------------- | --------------------- | --------------------------------------------------------------------- |
| 200              | OK                    | `{ "message": "Success" }`                                            |
| 201              | Created               | `{ "id": "64a000000000000000000002", "message": "Resource created" }` |
| 400              | Bad Request           | `{ "error": "Validation failed for 'name'" }`                         |
| 401              | Unauthorized          | `{ "error": "Unauthorized" }`                                         |
| 403              | Forbidden             | `{ "error": "Forbidden" }`                                            |
| 404              | Not Found             | `{ "error": "Resource not found" }`                                   |
| 500              | Internal Server Error | `{ "error": "An unexpected error occurred" }`                         |

# API Endpoint Specifications

Request/Response format is included inside the Postman Collection, so not including it here.

## 1. Schools API

### Base Path: `/api/schools`

| Method | Endpoint | Description           | Request Body        | Authorization Required | Role         |
| ------ | -------- | --------------------- | ------------------- | ---------------------- | ------------ |
| POST   | `/`      | Create a new school   | `{ name, address }` | Yes                    | `superadmin` |
| GET    | `/`      | Retrieve all schools  | None                | Yes                    | `superadmin` |
| PUT    | `/:id`   | Update a school by ID | `{ name, address }` | Yes                    | `superadmin` |
| DELETE | `/:id`   | Delete a school by ID | None                | Yes                    | `superadmin` |

## 2. Classrooms API

### Base Path: `/api/classrooms`

| Method | Endpoint | Description              | Request Body                 | Authorization Required | Role          |
| ------ | -------- | ------------------------ | ---------------------------- | ---------------------- | ------------- |
| POST   | `/`      | Create a new classroom   | `{ name, capacity, school }` | Yes                    | `schooladmin` |
| GET    | `/`      | Retrieve all classrooms  | None                         | Yes                    | `schooladmin` |
| PUT    | `/:id`   | Update a classroom by ID | `{ name, capacity }`         | Yes                    | `schooladmin` |
| DELETE | `/:id`   | Delete a classroom by ID | None                         | Yes                    | `schooladmin` |

## 3. Students API

### Base Path: `/api/students`

| Method | Endpoint | Description            | Request Body                                      | Authorization Required | Role          |
| ------ | -------- | ---------------------- | ------------------------------------------------- | ---------------------- | ------------- |
| POST   | `/`      | Create a new student   | `{ firstName, lastName, age, school, classroom }` | Yes                    | `schooladmin` |
| GET    | `/`      | Retrieve all students  | None                                              | Yes                    | `schooladmin` |
| PUT    | `/:id`   | Update a student by ID | `{ firstName, lastName, age }`                    | Yes                    | `schooladmin` |
| DELETE | `/:id`   | Delete a student by ID | None                                              | Yes                    | `schooladmin` |

## Authentication

All endpoints require an `Authorization` header with a valid JWT token:

```
Authorization: Bearer <your-token>
```
