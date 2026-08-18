# File Upload API

A Node.js and Express API for uploading images and documents with file validation, size limits, local storage, public URLs, and MongoDB persistence.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- dotenv
- CORS

## Features

- Upload images and documents
- Validate file types
- Maximum file size of 5 MB
- Store files locally
- Generate public file URLs
- Save file information in MongoDB
- Handle upload errors

## Allowed File Types

- JPG
- PNG
- WEBP
- PDF
- DOC
- DOCX

## API Endpoint

### Upload File

**POST**

```text
/api/files/upload