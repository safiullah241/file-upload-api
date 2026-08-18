const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) =>
    {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) =>
    {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;

        cb(null, uniqueName);
    }
});

const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

const fileFilter = (req, file, cb) =>
{
    if (allowedTypes.includes(file.mimetype))
    {
        cb(null, true);
    }
    else
    {
        cb(new Error("Invalid file type. Only JPG, PNG, WEBP, PDF, DOC and DOCX files are allowed."));
    }
};

const upload = multer({
    storage,
    limits:
    {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter
});

module.exports = upload;