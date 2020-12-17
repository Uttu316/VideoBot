import React from 'react';
import {MainContainer} from '../../components/main-container';
import VideoRecorder from '../../components/video-recorder';

const VideoScreen = ({}) => {
  return (
    <MainContainer barColor="black">
      <VideoRecorder />
    </MainContainer>
  );
};

export default VideoScreen;
