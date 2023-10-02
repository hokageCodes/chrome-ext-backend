# Video Sharing and Transcription Backend

This is the backend server for a video sharing and transcription application. It allows users to register, log in, upload videos, start and stop video recordings, and initiate video transcription.

## Getting Started

1. Clone this repository.
2. Install the required dependencies using `npm install`.
3. Start the server using `npm start`.

## Authentication

Authentication is required for most of the endpoints. Use the following API endpoints for authentication.

### User Registration

- **URL**: `/register`
- **Method**: `POST`
- **Request Body**: 
  - `username` (string): The username of the user.
  - `password` (string): The password of the user.
- **Response**: 
  - `201 Created`: Registration successful.
  - `400 Bad Request`: Username or password missing or already exists.

### User Login

- **URL**: `/login`
- **Method**: `POST`
- **Request Body**: 
  - `username` (string): The username of the user.
  - `password` (string): The password of the user.
- **Response**: 
  - `200 OK`: Login successful.
  - `401 Unauthorized`: Invalid credentials.
  - `400 Bad Request`: Username or password missing.

### User Logout

- **URL**: `/logout`
- **Method**: `POST`
- **Response**: 
  - `200 OK`: Logout successful.

## User Dashboard

- **URL**: `/dashboard`
- **Method**: `GET`
- **Authentication**: Required
- **Response**: 
  - `200 OK`: Returns the user's dashboard with a list of uploaded videos.
  - `401 Unauthorized`: User not logged in.

## Video Upload

### Single Video Upload

- **URL**: `/upload-video`
- **Method**: `POST`
- **Authentication**: Required
- **Request Body**: 
  - `video` (file): The video file to upload.
- **Response**: 
  - `200 OK`: Single video uploaded successfully.
  - `400 Bad Request`: No file uploaded.
  - `401 Unauthorized`: User not logged in.

### Multiple Video Upload

- **URL**: `/upload-videos`
- **Method**: `POST`
- **Authentication**: Required
- **Request Body**: 
  - `videos` (files): An array of video files to upload (up to 10).
- **Response**: 
  - `200 OK`: Multiple videos uploaded successfully.
  - `400 Bad Request`: No files uploaded or too many files.
  - `401 Unauthorized`: User not logged in.

## Video Recording

### Start Recording

- **URL**: `/start-recording`
- **Method**: `POST`
- **Authentication**: Required
- **Response**: 
  - `200 OK`: Recording started.
  - `401 Unauthorized`: User not logged in.

### Stop Recording

- **URL**: `/stop-recording`
- **Method**: `POST`
- **Authentication**: Required
- **Response**: 
  - `200 OK`: Recording stopped.
  - `401 Unauthorized`: User not logged in.

## Transcribe Video

- **URL**: `/transcribe/:videoId`
- **Method**: `POST`
- **Authentication**: Required
- **Response**: 
  - `200 OK`: Transcription started.
  - `401 Unauthorized`: User not logged in.
  
## User Schema

The user schema includes the following fields:

- `name` (String, required): The name of the user.
- `email` (String, required, unique): The email address of the user.
- `password` (String, required): The password of the user.

## Additional Notes

- Authentication is required for endpoints marked as "requires authentication."
- User data should be securely stored, and hashed passwords should be used for security.
- Ensure that the application is properly configured to use a secure session management mechanism.