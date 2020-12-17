import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/dimensions';
import {DefaultTheme} from '../../utils/theme';

export const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,

    zIndex: 13,
  },
  mainWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  videoContainer: {
    zIndex: -1,
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
  emptyVideosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyVideosMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  suggestionMessage: {
    fontSize: 14,

    color: 'white',
    textAlign: 'center',
    marginVertical: moderateScale(5),
  },
  audioText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    opacity: 1,
  },
  overlayContiner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',

    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: moderateScale(20),
  },

  horizontalList: {
    position: 'absolute',
    bottom: 120,
    width: '100%',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorLabel: {
    color: 'white',
    fontSize: 16,
    marginTop: moderateScale(10),
    textAlign: 'center',
  },
});
