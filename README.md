# Hostel Management System Backend

This is the backend API for a Hostel Management System that provides comprehensive roommate matching and hostel administration. The system includes dual authentication for students and administrators with dedicated APIs for each user type.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Environment Variables](#environment-variables)
4. [API Documentation](#api-documentation)
   - [Student Authentication](#student-authentication)
   - [Admin Authentication](#admin-authentication)
   - [Student Profile Management](#student-profile-management)

## Features

- Dual authentication system (Students and Admins)
- Secure password hashing with bcrypt
- JWT-based authentication with HTTP-only cookies
- Role-based access control
- Comprehensive student profile management
- Detailed roommate preference matching
- Admin dashboard for student management
- RESTful API endpoints
- Pagination for data-heavy responses

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hostel-management-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see next section)

4. Start the development server:
```bash
npm start
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-secret-key-for-students
JWT_ADMIN_SECRET=your-secret-key-for-admins
MONGODB_URI=mongodb://localhost:27017/hostel-management
```

## API Documentation

### Base URL

All APIs are prefixed with `/api/v1`

### Student Authentication

#### Register Student Account

- **URL**: `/auth/student/register`
- **Method**: `POST`
- **Access**: Public
- **Description**: Creates a new student account
- **Request Body**:
  ```json
  {
    "email": "student@example.com",
    "enrollmentNumber": "2023CS001",
    "password": "securepassword"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "success": true,
    "message": "Student registered successfully",
    "data": {
      "_id": "student_id",
      "email": "student@example.com",
      "enrollmentNumber": "2023CS001",
      "createdAt": "timestamp"
    }
  }
  ```

#### Login Student

- **URL**: `/auth/student/login`
- **Method**: `POST`
- **Access**: Public
- **Description**: Authenticates a student and returns a JWT token (stored in HTTP-only cookie)
- **Request Body**:
  ```json
  {
    "email": "student@example.com",
    "password": "securepassword"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "_id": "student_id",
      "email": "student@example.com",
      "enrollmentNumber": "2023CS001"
    }
  }
  ```

#### Get Student Profile

- **URL**: `/auth/student/profile`
- **Method**: `GET`
- **Access**: Protected (Requires student authentication)
- **Description**: Returns the student's profile information
- **Success Response**: `200 OK`
  ```json
  {
    "success": true,
    "message": "Student profile retrieved successfully",
    "data": {
      "_id": "student_id",
      "email": "student@example.com",
      "enrollmentNumber": "2023CS001",
      "student": {
        // Full student profile data
      }
    }
  }
  ```

#### Logout Student

- **URL**: `/auth/student/logout`
- **Method**: `GET`
- **Access**: Public
- **Description**: Clears the authentication cookie
- **Success Response**: `200 OK`
  ```json
  {
    "success": true,
    "message": "Logged out successfully",
    "data": {}
  }
  ```

### Admin Authentication

#### Register Admin

- **URL**: `/auth/admin/register`
- **Method**: `POST`
- **Access**: Public
- **Description**: Creates a new admin account
- **Request Body**:
  ```json
  {
    "email": "admin@example.com",
    "username": "admin",
    "password": "securepassword"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "success": true,
    "message": "Admin registered successfully",
    "data": {
      "_id": "admin_id",
      "email": "admin@example.com",
      "username": "admin",
      "createdAt": "timestamp"
    }
  }
  ```

#### Login Admin

- **URL**: `/auth/admin/login`
- **Method**: `POST`
- **Access**: Public
- **Description**: Authenticates an admin and returns a JWT token (stored in HTTP-only cookie)
- **Request Body**:
  ```json
  {
    "email": "admin@example.com",
    "password": "securepassword"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "_id": "admin_id",
      "email": "admin@example.com",
      "username": "admin",
      "role": "admin"
    }
  }
  ```

#### Get Admin Profile

- **URL**: `/auth/admin/profile`
- **Method**: `GET`
- **Access**: Protected (Requires admin authentication)
- **Description**: Returns the admin's profile information
- **Success Response**: `200 OK`
  ```json
  {
    "success": true,
    "message": "Admin profile retrieved successfully",
    "data": {
      "_id": "admin_id",
      "email": "admin@example.com",
      "username": "admin",
      "role": "admin",
      "isActive": true,
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
  ```

#### Logout Admin

- **URL**: `/auth/admin/logout`
- **Method**: `GET`
- **Access**: Public
- **Description**: Clears the admin authentication cookie
- **Success Response**: `200 OK`
  ```json
  {
    "success": true,
    "message": "Logged out successfully",
    "data": {}
  }
  ```

### Student Profile Management

#### Create Student Profile

- **URL**: `/students/create`
- **Method**: `POST`
- **Access**: Protected (Requires student authentication)
- **Description**: Creates detailed student profile with roommate preferences
- **Request Body**:
  ```json
  {
    "fullName": "John Doe",
    "age": 21,
    "gender": "Male",
    "nationality": "American",
    "languagesSpoken": ["English", "Spanish"],
    "weekdayWakeUpTime": "07:00",
    "weekendWakeUpTime": "09:00",
    "sleepTime": "23:00",
    "cleanlinessLevel": 4,
    "smokes": false,
    "drinksAlcohol": false,
    "personalityType": "Extrovert",
    "petFriendly": true,
    "preferredStudyEnvironment": "Quiet",
    "courseMajor": "Computer Science",
    "studySchedule": "Evening",
    "workingPartTime": true,
    "onlineClassFrequency": 3,
    "hobbies": ["Reading", "Coding"],
    "favoriteGenres": ["Sci-Fi", "Action"],
    "weekendPreferences": "Chill",
    "okayWithSharedRoom": true,
    "preferredRoomTemperature": 22,
    "usesLightAtNight": false,
    "guestFrequency": "Sometimes",
    "religiousObservance": "Moderate",
    "politicalViews": "Moderate",
    "openToDiversity": true
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "success": true,
    "message": "Student information created successfully",
    "data": {
      // Full student profile data with ID
    }
  }
  ```

#### Get All Students (Admin)

- **URL**: `/students/all`
- **Method**: `GET`
- **Access**: Protected (Requires admin authentication)
- **Description**: Returns all student profiles with pagination
- **Query Parameters**:
  - `page` (optional): Page number, default: 1
  - `limit` (optional): Items per page, default: 10
- **Success Response**: `200 OK`
  ```json
  {
    "success": true,
    "message": "Students retrieved successfully",
    "data": {
      "students": [
        // Array of student profiles
      ],
      "pagination": {
        "currentPage": 1,
        "totalPages": 5,
        "totalStudents": 50,
        "studentsPerPage": 10
      }
    }
  }
  ```

## Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "message": "Operation successful message",
  "data": {
    // Response data
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

## Authentication Flow

The system uses JWT tokens stored in HTTP-only cookies for authentication:

1. User logs in with credentials
2. Server validates credentials and issues a JWT token
3. Token is stored in an HTTP-only cookie
4. Protected routes check for valid token in the cookie
5. Token expiry is set to 1 day

## Models

### Student Model

Stores comprehensive student information for roommate matching:

- **Personal Info**: Name, age, gender, nationality, languages
- **Lifestyle**: Wake/sleep times, cleanliness, smoking/drinking habits
- **Academic/Work**: Course, study schedule, work status
- **Interests**: Hobbies, genres, weekend preferences
- **Room Preferences**: Shared room, temperature, guests
- **Beliefs/Values**: Religious observance, political views, diversity

### StudentAuth Model

Stores student authentication information:

- Email (unique)
- Enrollment Number (unique)
- Password (encrypted)
- Reference to Student profile

### Admin Model

Stores admin authentication and profile information:

- Email (unique)
- Username (unique)
- Password (encrypted)
- Role
- Active status

## Error Handling

The API includes comprehensive error handling:

- Validation errors (400)
- Authentication errors (401)
- Authorization errors (403)
- Not found errors (404)
- Server errors (500)

All errors follow the consistent response format with helpful error messages.

## Security Features

- Password encryption with bcrypt
- JWT-based authentication
- HTTP-only cookies for token storage
- Input validation
- MongoDB schema validation
- Rate limiting (TODO)
- CORS protection 