import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../css/PercentageDisplayComponent.css';

const PercentageDisplayComponent = ({imageId, onUploadComplete}) => {
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const fetchPercentage = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/video/${imageId}/percentage/`);
                setPercentage(response.data.percentage);

                if (response.data.percentage === 100) {
                    onUploadComplete(); // Notify parent component that upload is complete
                }
            } catch (error) {
                console.error('Error fetching percentage:', error);
            }
        };

        const interval = setInterval(() => {
            fetchPercentage(); // Fetch percentage every 3 seconds
        }, 3000);

        return () => clearInterval(interval); // Cleanup

    }, [imageId, onUploadComplete]); // Dependency on imageId and onUploadComplete callback

    return (
        <div className="percentage-display">
            <h2>Video creation progress</h2>
            <div className="progress-bar">
                <div className="progress" style={{width: `${percentage}%`}}>{percentage}%</div>
            </div>
        </div>
    );
};

export default PercentageDisplayComponent;
