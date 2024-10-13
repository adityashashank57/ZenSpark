// routes/pdfRoutes.js
const express = require('express');
const PDF = require('../models/pdfmodel');
const multer = require('multer');
const router = express.Router();

// Set up multer for file storage in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload a PDF
router.post('/upload', upload.single('pdf'), async (req, res) => {
    try {
        const pdf = new PDF({
            name: req.file.originalname,
            data: req.file.buffer,
            contentType: req.file.mimetype,
        });
        await pdf.save();
        res.status(200).json({ message: 'PDF uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload PDF' });
    }
});

// Get all PDFs
router.get('/pdfs', async (req, res) => {
    try {
        const pdfs = await PDF.find({});
        res.status(200).json(pdfs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve PDFs' });
    }
});

module.exports = router;

