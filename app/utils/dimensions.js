import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

// Actual width and height of device
var actualDimensions = {
  newHeight: height < width ? width : height,
  newWidth: width > height ? height : width,
};

const {newWidth, newHeight} = actualDimensions;

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

/**
 *
 *  Function to scale a value based on the size of the screen size and the original
 *  size used on the design. */
const scale = (size) => {
  return (newWidth / guidelineBaseWidth) * size;
};
const verticalScale = (size) => (newHeight / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export {verticalScale, moderateScale, scale};
