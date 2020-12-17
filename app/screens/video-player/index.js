import React from 'react';
import {MainContainer} from '../../components/main-container';
import {VideoPlayerComponent} from '../../components/video-player';

const VideoPlayer = ({}) => {
  return (
    <MainContainer barColor="black">
      <VideoPlayerComponent />
    </MainContainer>
  );
};

export default VideoPlayer;
