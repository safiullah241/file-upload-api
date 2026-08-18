# File Upload API

A RESTful file upload API built with **Node.js, Express, MongoDB, Mongoose, and Multer**.

The API allows users to upload images and documents, validates files before accepting them, stores them locally, generates publicly accessible URLs, and saves file metadata in MongoDB.

## Features

- Upload images and documents using `multipart/form-data`
- File type validation
- Maximum file size validation
- Local file storage
- Public URLs for uploaded files
- MongoDB persistence for file metadata
- Unique filenames to prevent collisions
- Clear and consistent error responses
- Health check endpoint
- CORS support
- Environment variable configuration

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | REST API framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| Multer | Multipart file handling |
| dotenv | Environment variables |
| CORS | Cross-origin requests |

## File Validation

The API currently accepts the following file types:

### Images

- `.jpg`
- `.jpeg`
- `.png`
- `.webp`

### Documents

- `.pdf`
- `.doc`
- `.docx`

### Size Limit

The maximum allowed file size is:

**5 MB**

Files that exceed the limit or use an unsupported MIME type are rejected before being stored.

## Project Structure

```text
file-upload-api/
│
├── middleware/
│   └── upload.js
│
├── models/
│   └── File.js
│
├── routes/
│   └── fileRoutes.js
│
├── uploads/
│   └── uploaded files
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js

Installation
1. Clone the repository
git clone https://github.com/safiullah241/file-upload-api.git
2. Enter the project directory
cd file-upload-api
3. Install dependencies
npm install
4. Configure environment variables

Create a .env file in the project root:

PORT=3000
MONGODB_URI=your_mongodb_connection_string

Replace your_mongodb_connection_string with your MongoDB Atlas connection string.

5. Start the development server
npm run dev

The server will run on:

http://localhost:3000
API Endpoints
Health Check
GET /health

Used to verify that the API is running.

Response
{
  "success": true,
  "message": "File Upload API is running"
}
Upload File
POST /api/files/upload

Uploads an image or document and stores its metadata in MongoDB.

Request

The request must use:

multipart/form-data

The uploaded file must use the field name:

file
Example
POST http://localhost:3000/api/files/upload

Form data:

Field	Type	Required
file	File	Yes
Successful Response
{
  "success": true,
  "message": "File uploaded successfully",
  "file": {
    "_id": "66xxxxxxxxxxxxxxxxxxxxxx",
    "originalName": "profile.jpg",
    "fileName": "1755500000000-123456789.jpg",
    "fileUrl": "http://localhost:3000/uploads/1755500000000-123456789.jpg",
    "fileType": "image/jpeg",
    "fileSize": 1152302,
    "createdAt": "2026-08-18T10:30:00.000Z",
    "updatedAt": "2026-08-18T10:30:00.000Z"
  }
}
Accessing Uploaded Files

Uploaded files are stored in the uploads/ directory.

The API exposes this directory publicly:

/uploads/<filename>

For example:

http://localhost:3000/uploads/1755500000000-123456789.jpg

The fileUrl returned by the API can therefore be used to access the uploaded file.

Error Handling

The API returns clear error messages when an upload fails.

No File
{
  "success": false,
  "message": "No file uploaded"
}
Invalid File Type
{
  "success": false,
  "message": "Invalid file type. Only JPG, PNG, WEBP, PDF, DOC and DOCX files are allowed."
}
File Too Large
{
  "success": false,
  "message": "File too large. Maximum file size is 5 MB."
}
Testing With Postman
Start the server:
npm run dev
Create a new POST request:
http://localhost:3000/api/files/upload
Open:
Body → form-data
Add the following field:
Key	Type	Value
file	File	Select an image or document
Click Send.

A successful upload returns the stored file information and public URL.

Testing With cURL
Upload an image
curl -X POST \
  -F "file=@test.jpg" \
  http://localhost:3000/api/files/upload
Upload a PDF
curl -X POST \
  -F "file=@document.pdf" \
  http://localhost:3000/api/files/upload
Database

Each successful upload creates a document in MongoDB.

The stored metadata includes:

originalName
fileName
fileUrl
fileType
fileSize
createdAt
updatedAt

Example MongoDB document:

{
  "originalName": "profile.jpg",
  "fileName": "1755500000000-123456789.jpg",
  "fileUrl": "http://localhost:3000/uploads/1755500000000-123456789.jpg",
  "fileType": "image/jpeg",
  "fileSize": 1152302
}
Security Considerations

The API performs basic upload validation before storing files:

Restricts accepted MIME types
Limits files to 5 MB
Generates unique filenames
Prevents uploaded files from using their original filename as the stored filename
Keeps environment variables outside version control

For production deployments, additional security measures should be considered, including:

Authentication and authorization
Cloud object storage
Malware scanning
Stronger content validation
Rate limiting
File access authorization
HTTPS
CDN integration
Environment Variables
Variable	Description	Example
PORT	Server port	3000
MONGODB_URI	MongoDB connection string	mongodb+srv://...

Never commit your .env file or MongoDB credentials to GitHub.

Available Scripts
Development
npm run dev

Starts the server with Nodemon.

Production
npm start

Starts the server using Node.js.

Future Improvements

Potential improvements for the API include:

Cloudinary or AWS S3 storage
User authentication
User-specific file ownership
File deletion endpoint
File download endpoint
Multiple file uploads
Image resizing and optimization
Cloud CDN integration
Virus/malware scanning
License

This project is for educational and development purposes.



Then run:


```bash
git add README.md
git commit -m "Improve README documentation"
git push

