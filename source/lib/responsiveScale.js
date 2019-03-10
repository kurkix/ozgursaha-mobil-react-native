import { Dimensions, PixelRatio } from 'react-native';

  const widthToDP = width =>{
    const screenWidth = Dimensions.get('window').width;
    const elemWidth = parseFloat(width);
    return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
  };

  const heightToDP = height =>{
    const screenHeight = Dimensions.get('window').height;
    const elemHeight = parseFloat(height);
    return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
  };

  export {
    widthToDP,
    heightToDP
  };
