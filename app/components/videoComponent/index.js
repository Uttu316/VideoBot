import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {Text, Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {BackButton} from '../buttons/backbutton';
import {VideoCard} from '../video-card';
import VoiceRecognizer from '../voice-recognizer';
import {styles} from './styles';
import {getConfig} from '../../apis';
import axios from 'axios';
import Video from 'react-native-video';
import {addToWatchedVideos} from '../../redux/actions/main-actions';
import {Loader} from '../loaders';
import {useRoute} from '@react-navigation/native';

const VideoComponent = ({}) => {
  const dispatch = useDispatch();
  const route = useRoute();

  const {params} = route;

  const {watchedVideos} = useSelector((state) => state.main);
  const [videoUrls, setVideoUrls] = useState(
    params && params.watchedIndex != null ? watchedVideos : [],
  );
  const [apiState, setApiState] = useState('');
  const [currentVideoPlayingIndex, setVieoIndex] = useState(
    params && params.watchedIndex != null ? params.watchedIndex : -1,
  );
  const [audioInputs, setAudioInputs] = useState([]);
  const [recodingState, setRecodingState] = useState('');
  const [isChanging, setIsChanging] = useState(false);

  function handleCardClick(index) {
    setVieoIndex(index);

    const hasAlreadywatched = watchedVideos.findIndex(
      (item) => item.videoUri === videoUrls[index].videoUri,
    );
    if (hasAlreadywatched === -1) {
      dispatch(addToWatchedVideos([videoUrls[index], ...watchedVideos]));
    } else {
      let updatedVideos = watchedVideos;
      updatedVideos.splice(hasAlreadywatched, 1);
      dispatch(addToWatchedVideos([videoUrls[index], ...updatedVideos]));
    }
  }

  function handleRecording(state) {
    if (state === '' || state === 'started') {
      setAudioInputs([]);
    }

    setRecodingState(state);
  }
  function handleAudioInputs(inputs) {
    const filteredInputs = inputs.filter((item) => item !== '');
    setIsChanging(!isChanging);
    setAudioInputs(filteredInputs);
    if (filteredInputs.length > 0) {
      setApiState('loading');
      const query = filteredInputs.join(' ');
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      let options = getConfig(query);
      options = {...options, cancelToken: source.token};
      axios(options)
        .then(function (response) {
          if (response.data) {
            setVieoIndex(0);
            const videos = response.data.videos.map((item, index) => {
              return {
                name: 'Video 0' + index,
                videoUri: item.video_files[0].link,
                image: item.image,
              };
            });

            setVideoUrls(videos);
            const hasAlreadywatched = watchedVideos.findIndex(
              (each) => each.videoUri === videos[0].videoUri,
            );
            let videoObj = {
              name: 'Video 0' + 0,
              videoUri: videos[0].videoUri,
              image: videos[0].image,
            };

            if (hasAlreadywatched === -1) {
              dispatch(addToWatchedVideos([videoObj, ...watchedVideos]));
            } else {
              let updatedVideos = watchedVideos;
              updatedVideos.splice(hasAlreadywatched, 1);
              dispatch(addToWatchedVideos([videoObj, ...updatedVideos]));
            }
            setApiState('done');
          } else {
            setApiState('error');
          }
        })
        .catch(function (error) {
          if (axios.isCancel(error)) {
            console.log('Request canceled');
          } else {
            console.log(error);
          }
          setApiState('error');
        });
    }
  }
  const handleProgress = (progress) => {
    if (currentVideoPlayingIndex === videoUrls.length - 1) {
      return;
    } else {
      if (Math.round(progress.currentTime) >= 6) {
        let updatedIndex = currentVideoPlayingIndex + 1;
        setVieoIndex(updatedIndex);
        if (!params || params.watchedIndex == null) {
          const hasAlreadywatched = watchedVideos.findIndex(
            (item) => item.videoUri === videoUrls[updatedIndex].videoUri,
          );
          if (hasAlreadywatched === -1) {
            dispatch(
              addToWatchedVideos([videoUrls[updatedIndex], ...watchedVideos]),
            );
          } else {
            let updatedVideos = watchedVideos;
            updatedVideos.splice(hasAlreadywatched, 1);
            dispatch(
              addToWatchedVideos([videoUrls[updatedIndex], ...updatedVideos]),
            );
          }
        }
      }
    }
  };
  return (
    <>
      <View style={styles.header}>
        <BackButton />
      </View>

      {videoUrls.length > 0 && (
        <>
          <View style={styles.videoContainer}>
            <Video
              source={{uri: videoUrls[currentVideoPlayingIndex].videoUri}}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              poster={videoUrls[currentVideoPlayingIndex].image}
              resizeMode="cover"
              onProgress={handleProgress}
              style={{width: '100%', height: '100%'}}
              onLoadStart={() => setApiState('loading')}
              onReadyForDisplay={() => setApiState('')}
              onVideoError={() => setApiState('error')}
            />
          </View>
          <View style={styles.horizontalList}>
            <FlatList
              horizontal={true}
              contentContainerStyle={{
                paddingHorizontal: 20,
              }}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              data={videoUrls}
              extraData={videoUrls}
              renderItem={({item, index}) => (
                <VideoCard item={item} onPress={() => handleCardClick(index)} />
              )}
            />
          </View>
        </>
      )}

      <View style={styles.mainWrapper}>
        {videoUrls.length === 0 && recodingState !== 'started' && (
          <View style={styles.emptyVideosContainer}>
            <Text style={styles.emptyVideosMessage}>
              Please tap on mic to speak
            </Text>
            <Text style={styles.suggestionMessage}>
              Name your favourite Animal!!{'\n'}Say: Cat
            </Text>
          </View>
        )}
      </View>
      {recodingState === 'started' && (
        <View style={styles.overlayContiner}>
          {audioInputs.map((item, index) => {
            return (
              <Text key={`text-${index}`} style={styles.audioText}>
                {item}
              </Text>
            );
          })}
          {audioInputs.length === 0 && (
            <Text style={styles.audioText}>Listening...</Text>
          )}
        </View>
      )}
      <View style={styles.bottomTab}>
        <VoiceRecognizer
          onRecordingStateChange={(state) => handleRecording(state)}
          getAudioInputs={(texts) => handleAudioInputs(texts)}
        />
      </View>
      {apiState === 'loading' && <Loader />}
      {apiState === 'error' && (
        <View style={styles.errorContainer}>
          <Icon
            name="alert-rhombus-outline"
            type="material-community"
            color="grey"
            size={45}
          />
          <Text style={styles.errorLabel}>Error occured. Try Later</Text>
        </View>
      )}
    </>
  );
};

export default VideoComponent;
