import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StyleSheet, View, Alert} from 'react-native';
import {BackButton} from '../buttons/backbutton';
import {Loader} from '../loaders';
import Video from 'react-native-video';
import {useDispatch, useSelector} from 'react-redux';
import {Icon} from 'react-native-elements';
import {updateRecordedVideos} from '../../redux/actions/main-actions';
import {showToastWithGravity} from '../../utils/utils';
import RNFS from 'react-native-fs';

export const VideoPlayerComponent = ({}) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {recordedVideos} = useSelector((state) => state.main);

  const {params} = route;

  const [loading, setLoading] = useState(false);

  const handleDeleteVideo = () => {
    Alert.alert(
      'Alert',
      'Do you want to delete the video?',
      [
        {
          text: 'OK',
          onPress: async () => {
            let path = recordedVideos[params.videoIndex];
            try {
              const {originalFilepath} = await RNFS.stat(path);

              RNFS.exists(originalFilepath)
                .then(async (result) => {
                  if (result) {
                    return RNFS.unlink(originalFilepath)
                      .then(() => {
                        let updateVideos = recordedVideos;
                        updateVideos.splice(params.videoIndex, 1);

                        dispatch(updateRecordedVideos(updateVideos));
                        navigation.goBack();
                        showToastWithGravity('Video has been deleted');
                        RNFS.scanFile(originalFilepath)
                          .then(() => {
                            //  console.log('scanned');
                          })
                          .catch((err) => {
                            showToastWithGravity('Something went wrong');
                            console.log(err);
                          });
                      })
                      .catch((err) => {
                        showToastWithGravity('Something went wrong');
                        console.log('not deleted', err);
                      });
                  }
                })
                .catch((err) => {
                  showToastWithGravity('Something went wrong');
                  console.log('not deleted', err);
                });
            } catch (e) {
              showToastWithGravity('Something went wrong');
              console.log(e);
            }
          },
        },
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <>
      <View style={styles.header}>
        <BackButton />
        <Icon
          reverse
          name="delete"
          type="material-community"
          color={'transparent'}
          size={28}
          onPress={() => handleDeleteVideo()}
        />
      </View>
      <View style={styles.videoContainer}>
        {recordedVideos[params.videoIndex] != null && (
          <Video
            controls={true}
            source={{uri: recordedVideos[params.videoIndex]}}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            poster={recordedVideos[params.videoIndex]}
            resizeMode="cover"
            style={{width: '100%', height: '100%'}}
            onLoadStart={() => setLoading(true)}
            onReadyForDisplay={() => setLoading(false)}
          />
        )}
      </View>
      {loading && <Loader />}
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    zIndex: 13,
    justifyContent: 'space-between',
  },
  videoContainer: {
    zIndex: -1,
  },
});
