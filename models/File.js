const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
{
    originalName:
    {
        type: String,
        required: true
    },
    fileName:
    {
        type: String,
        required: true
    },
    fileUrl:
    {
        type: String,
        required: true
    },
    fileType:
    {
        type: String,
        required: true
    },
    fileSize:
    {
        type: Number,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("File", fileSchema);