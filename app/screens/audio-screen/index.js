import React from 'react';

import {MainContainer} from '../../components/main-container';
import VideoComponent from '../../components/videoComponent';

import {styles} from './styles';
const AudioScreen = ({navigation}) => {
  return (
    <MainContainer style={styles.mainContainer} barColor="black">
      <VideoComponent />
    </MainContainer>
  );
};
export default AudioScreen;
