import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {RoundVideoCard} from '../video-card';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {screensName} from '../../constants';
import {moderateScale} from '../../utils/dimensions';
import {DefaultTheme} from '../../utils/theme';

export default function RecentlyWatched() {
  const navigation = useNavigation();
  const {watchedVideos} = useSelector((state) => state.main);

  function handleCardClick(index) {
    navigation.navigate(screensName.audioScreen, {
      watchedIndex: index,
    });
  }
  return (
    <>
      {watchedVideos.length > 0 && (
        <View style={styles.listContainer}>
          <Text style={styles.listHeading}>Recently Watched</Text>
          <FlatList
            horizontal={true}
            contentContainerStyle={{
              paddingHorizontal: 20,
            }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={watchedVideos}
            extraData={watchedVideos}
            renderItem={({item, index}) => (
              <RoundVideoCard
                item={item}
                onPress={() => handleCardClick(index)}
              />
            )}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(10),
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  listHeading: {
    fontSize: 16,
    color: 'grey',
    fontWeight: 'bold',
    marginHorizontal: moderateScale(20),
    marginBottom: moderateScale(10),
  },
});
