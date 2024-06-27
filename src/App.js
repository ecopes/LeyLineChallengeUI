import React, {useState} from 'react';
import ImageUploadComponent from "./components/ImageUploadComponent";
import PercentageDisplayComponent from './components/PercentageDisplayComponent';
import VideoDisplayComponent from './components/VideoDisplayComponent';

const App = () => {
    const [currentImageId, setCurrentImageId] = useState(null);
    const [uploadComplete, setUploadComplete] = useState(false);

    const handleUploadComplete = () => {
        setUploadComplete(true);
    };

    const handleImageIdChange = (imageId) => {
        setCurrentImageId(imageId);
        setUploadComplete(false); // Reset upload complete state when a new image is uploaded
    };

    return (
        <div>
            <h1>React Django Image Upload and Video Display</h1>
            <ImageUploadComponent onUploadComplete={handleImageIdChange}/>
            {currentImageId && !uploadComplete && (
                <PercentageDisplayComponent imageId={currentImageId} onUploadComplete={handleUploadComplete}/>
            )}
            {uploadComplete && (
                <VideoDisplayComponent videoId={currentImageId}/>
            )}
        </div>
    );
};

export default App;