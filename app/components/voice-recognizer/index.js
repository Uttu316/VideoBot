import React, {useState, useEffect} from 'react';

import {StyleSheet} from 'react-native';

import Voice from '@react-native-community/voice';
import {Icon} from 'react-native-elements';
import {DefaultTheme} from '../../utils/theme';

const VoiceRecognizer = ({onRecordingStateChange, getAudioInputs}) => {
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e) => {
    /// console.log('onSpeechStart: ', e);

    setStarted('started');
    onRecordingStateChange('started');
  };

  const onSpeechEnd = (e) => {
    // console.log('onSpeechEnd: ', e);
    setStarted('');
    onRecordingStateChange('end');
  };

  const onSpeechError = (e) => {
    setStarted('');
    setError(JSON.stringify(e.error));
    onRecordingStateChange('error');
  };

  const onSpeechResults = (e) => {
    //console.log('onSpeechResults: ', e);
    setResults(e.value);
  };

  const onSpeechPartialResults = (e) => {
    // console.log('partial', e.value);
    setPartialResults(e.value);
    getAudioInputs(e.value);
  };

  const onSpeechVolumeChanged = (e) => {
    //console.log('onSpeechVolumeChanged: ', e);
    setPitch(e.value);
  };

  const startRecognizing = async () => {
    try {
      await Voice.start('en-US', {
        RECOGNIZER_ENGINE: 'GOOGLE',
        EXTRA_PARTIAL_RESULTS: true,
      });
      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const cancelRecognizing = async () => {
    try {
      await Voice.cancel();
      setStarted('');
    } catch (e) {
      console.error(e);
    }
  };

  const destroyRecognizer = async () => {
    try {
      await Voice.destroy();
      onRecordingStateChange('');
      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Icon
      reverse={true}
      name={started === '' ? 'microphone' : 'stop'}
      type={started === '' ? 'material-community' : 'font-awesome-5'}
      size={50}
      reverseColor={'white'}
      containerStyle={styles.imageButton}
      iconStyle={{fontSize: started === '' ? 60 : 40}}
      color={DefaultTheme.dark.colors.button}
      onPress={() => {
        if (started === 'started') {
          destroyRecognizer();
        } else {
          startRecognizing();
        }
      }}
    />
  );
};

export default VoiceRecognizer;

const styles = StyleSheet.create({
  imageButton: {
    alignSelf: 'center',
  },
});
