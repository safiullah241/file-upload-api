const express = require("express");
const upload = require("../middleware/upload");
const File = require("../models/File");

const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) =>
{
    try
    {
        if (!req.file)
        {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        const file = await File.create({
            originalName: req.file.originalname,
            fileName: req.file.filename,
            fileUrl,
            fileType: req.file.mimetype,
            fileSize: req.file.size
        });

        res.status(201).json({
            success: true,
            message: "File uploaded successfully",
            file
        });
    }
    catch (error)
    {
        res.status(500).json({
            success: false,
            message: "File upload failed",
            error: error.message
        });
    }
});

module.exports = router;