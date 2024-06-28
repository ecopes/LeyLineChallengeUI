import React, {useEffect, useRef, useState} from 'react';
import '../css/VideoDisplayComponent.css';

const VideoDisplayComponent = ({videoId}) => {
    const videoRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(`http://localhost:8000/api/v1/video/${videoId}/view/`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const blob = await response.blob();
                const videoUrl = URL.createObjectURL(blob);

                if (videoRef.current) {
                    videoRef.current.src = videoUrl;
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching video:', error);
                setError('Failed to load video');
                setIsLoading(false);
            }
        };

        fetchVideo();

        return () => {
            if (videoRef.current) {
                URL.revokeObjectURL(videoRef.current.src);
            }
        };
    }, [videoId]);

    const handleContextMenu = (e) => {
        e.preventDefault(); // Prevent right-click context menu
    };

    const handleLoadedData = () => {
        setIsLoading(false);
    };

    return (
        <div className="video-container">
            <h2>Video Display</h2>
            {isLoading && <div className="loading">Loading video...</div>}
            {error && <div className="error">{error}</div>}
            <div className="video-wrapper" onContextMenu={handleContextMenu}>
                <video
                    ref={videoRef}
                    controls
                    width="100%"
                    controlsList="nodownload nofullscreen noremoteplayback"
                    disablePictureInPicture
                    onContextMenu={handleContextMenu}
                    onLoadedData={handleLoadedData}
                >
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default VideoDisplayComponent;