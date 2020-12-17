import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {RoundVideoCard} from '../video-card';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {screensName} from '../../constants';
import {moderateScale} from '../../utils/dimensions';
import RNFS from 'react-native-fs';
import {updateRecordedVideos} from '../../redux/actions/main-actions';

export default function RecordedVideos() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {recordedVideos} = useSelector((state) => state.main);

  function handleCardClick(index) {
    navigation.navigate(screensName.videoPlayer, {
      videoIndex: index,
    });
  }
  async function checkVideos() {
    let allPresentVideos = [];
    await Promise.all(
      recordedVideos.map(async (uri) => {
        try {
          const {originalFilepath} = await RNFS.stat(uri);

          const isPresent = await RNFS.exists(originalFilepath);
          if (isPresent) {
            allPresentVideos.push(uri);
          }
        } catch (e) {
          console.log(e);
        }
      }),
    );
    dispatch(updateRecordedVideos(allPresentVideos));
  }
  useEffect(() => {
    checkVideos();
  }, []);

  return (
    <>
      {recordedVideos.length > 0 && (
        <View style={styles.listContainer}>
          <Text style={styles.listHeading}>My Recordings</Text>
          <FlatList
            horizontal={true}
            contentContainerStyle={{
              paddingHorizontal: 20,
            }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={recordedVideos}
            extraData={recordedVideos}
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
