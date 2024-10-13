// frontend/src/components/ReadOnlyPDFs.js
import React, { useState } from 'react';
import axios from 'axios';

const ReadOnlyPDFs = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [pdfList, setPdfList] = useState([]);

    const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('pdf', selectedFile);

        try {
            await axios.post('http://localhost:5000/api/upload', formData);
            alert('PDF uploaded successfully');
        } catch (error) {
            console.error('Error uploading PDF', error);
        }
    };

    const fetchPdfs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/pdfs');
            setPdfList(response.data);
        } catch (error) {
            console.error('Error fetching PDFs', error);
        }
    };

    return (
        <div>
            <h1>Read Only PDFs</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload PDF</button>
            <button onClick={fetchPdfs}>View All PDFs</button>

            <ul>
                {pdfList.map((pdf) => (
                    <li key={pdf._id}>
                        <a href={`data:${pdf.contentType};base64,${Buffer.from(pdf.data).toString('base64')}`} download={pdf.name}>
                            {pdf.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReadOnlyPDFs;
