import React from 'react';
import {ScrollView, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {AppHeader} from '../../components/headers';

import {MainContainer} from '../../components/main-container';
import RecentlyWatched from '../../components/recently-watched';
import RecordedVideos from '../../components/recorded';
import {AppSwipper} from '../../components/swipper';
import {VideoCard} from '../../components/video-card';
import {Welcome} from '../../components/welcome';
import {screensName} from '../../constants';
import {styles} from './style';

const Home = ({navigation}) => {
  return (
    <MainContainer>
      <AppHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppSwipper />
        <Welcome />
        <RecentlyWatched />
        <RecordedVideos />
        <View style={styles.container}>
          <View style={styles.circlebuttonContainer}>
            <Icon
              reverse
              name="microphone"
              type="material-community"
              raised
              size={50}
              color="white"
              reverseColor="black"
              onPress={() => navigation.navigate(screensName.audioScreen)}
            />
            <Text style={styles.btnLabel}>Smart Search</Text>
          </View>
          <View style={styles.circlebuttonContainer}>
            <Icon
              reverse
              name="video"
              type="material-community"
              raised
              size={50}
              color="white"
              reverseColor="black"
              onPress={() => navigation.navigate(screensName.videoScreen)}
            />
            <Text style={styles.btnLabel}>Record Videos</Text>
          </View>
        </View>
      </ScrollView>
    </MainContainer>
  );
};

export default Home;
