import React from 'react';

const VideoPlayer = ({ location }) => {
    const { search } = location;
    const params = new URLSearchParams(search);
    const videoUrl = params.get('url');

    return (
        <div>
            <h1>Video Player</h1>
            <video controls>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;
