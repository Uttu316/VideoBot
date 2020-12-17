import React, {useRef, useState} from 'react';
import {RNCamera} from 'react-native-camera';
import {
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {showToastWithGravity} from '../../utils/utils';
import CameraRoll from '@react-native-community/cameraroll';
import {BackButton} from '../buttons/backbutton';
import {moderateScale} from '../../utils/dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {updateRecordedVideos} from '../../redux/actions/main-actions';

const VideoRecorder = ({}) => {
  let cameraRef = useRef();
  const dispatch = useDispatch();
  const {recordedVideos} = useSelector((state) => state.main);
  const [recorderState, setRecorderState] = useState('');
  const [isFrontCamera, toggleCamera] = useState(true);
  const [isFaceDetected, setFaceDetected] = useState(false);
  const [isLowQuality, toggleQuality] = useState(false);

  const hasAndroidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'My App Storage Permission',
          message:
            'My App needs access to your storage ' +
            'so you can save your photos',
        },
      );
      return granted;
    } catch (err) {
      console.error('Failed to request permission ', err);
      return null;
    }
  };
  async function savePicture(tag) {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    try {
      const data = await CameraRoll.save(tag, {type: 'video'});
      dispatch(updateRecordedVideos([data, ...recordedVideos]));
      showToastWithGravity('Video saved');
    } catch (e) {
      console.log(e);
    }
  }
  function handleStopRecording() {
    if (cameraRef) {
      try {
        cameraRef.current.stopRecording();
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function handleStartRecording() {
    if (cameraRef.current) {
      try {
        setRecorderState('recording');
        const promise = cameraRef.current.recordAsync({
          targetBitrate: isLowQuality ? 0.25 * 1000 * 1000 : 1000 * 1000 * 40,
          quality: isLowQuality
            ? RNCamera.Constants.VideoQuality['480p']
            : RNCamera.Constants.VideoQuality['1080p'],
        });

        if (promise) {
          const data = await promise;

          if (data.isRecordingInterrupted) {
            setRecorderState('');
          } else {
            savePicture(data.uri);
            setRecorderState('');
          }
        } else {
          setRecorderState('');
          showToastWithGravity('Something went wrong');
        }
      } catch (e) {
        setRecorderState('');
        console.error(e);
      }
    }
  }

  function handleRecording() {
    if (recorderState === 'recording') {
      handleStopRecording();
    } else {
      handleStartRecording();
    }
  }
  const handleFaceDetected = (faceArray) => {
    if (faceArray.faces.length > 0) {
      setFaceDetected(true);
    } else {
      setFaceDetected(false);
    }
  };

  return (
    <>
      <View style={styles.header}>
        <BackButton />
        <View>
          <Icon
            reverse
            name="camera-retake-outline"
            type="material-community"
            color={'transparent'}
            size={28}
            onPress={() => toggleCamera(!isFrontCamera)}
          />
          {recorderState === '' && (
            <Icon
              reverse
              name={isLowQuality ? 'quality-low' : 'hd'}
              type={isLowQuality ? 'material-community' : 'material'}
              color={'transparent'}
              size={28}
              onPress={() => toggleQuality(!isLowQuality)}
            />
          )}
        </View>
      </View>
      <View style={{flex: 1}}>
        <RNCamera
          ref={cameraRef}
          captureAudio={true}
          defaultVideoQuality={
            isLowQuality
              ? RNCamera.Constants.VideoQuality['480p']
              : RNCamera.Constants.VideoQuality['1080p']
          }
          style={{flex: 1}}
          faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.fast}
          onFacesDetected={handleFaceDetected}
          type={
            isFrontCamera
              ? RNCamera.Constants.Type.front
              : RNCamera.Constants.Type.back
          }
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
      </View>
      <View style={styles.bottomTab}>
        <TouchableOpacity
          style={styles.circleBtn}
          onPress={() => handleRecording()}>
          {recorderState === '' && (
            <Icon
              name="record"
              type="material-community"
              size={70}
              color="red"
            />
          )}
          {recorderState === 'recording' && (
            <Icon name="stop" size={50} type="material-community" color="red" />
          )}
        </TouchableOpacity>
      </View>
      {!isFaceDetected && (
        <View style={styles.faceAlertContainer}>
          <Text style={styles.faceAlertMessage}>Please look here</Text>
        </View>
      )}
    </>
  );
};
export default VideoRecorder;

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
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 13,
  },
  circleBtn: {
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 150,
    padding: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(5),
  },
  faceAlertContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceAlertMessage: {
    color: 'red',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: moderateScale(150),
    marginHorizontal: moderateScale(20),
    paddingHorizontal: moderateScale(5),
    zIndex: 9,
    borderWidth: 1,
    borderColor: 'red',
  },
});
