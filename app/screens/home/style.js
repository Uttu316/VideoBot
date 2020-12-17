import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/dimensions';
import {DefaultTheme} from '../../utils/theme';

export const styles = StyleSheet.create({
  mainWrapper: {},
  contentContainer: {},
  container: {
    padding: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  circlebuttonContainer: {
    alignItems: 'center',
    marginHorizontal: moderateScale(5),
    marginBottom: moderateScale(20),
  },

  btnLabel: {
    marginTop: moderateScale(5),

    color: DefaultTheme.dark.colors.accent,
    fontWeight: 'bold',
  },
});
