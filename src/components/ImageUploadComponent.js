import React, {useState} from 'react';
import axios from 'axios';
import '../css/ImageUploadComponent.css';

const ImageUploadComponent = ({onUploadComplete}) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('http://localhost:8000/api/v1/upload_image/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Image upload successful. Image ID:', response.data.id);
            onUploadComplete(response.data.id); // Pass image ID to parent component
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className="upload-container">
            <input type="file" onChange={handleFileChange}/>
            <button className="upload-button" onClick={handleUpload}>Upload Image</button>
        </div>
    );
};

export default ImageUploadComponent;