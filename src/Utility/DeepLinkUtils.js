import {Linking} from 'react-native';
import DEEP_LINK_PATHS from './DeepLinkPaths';

const generateDeepLink = (screenName, params = {}) => {
  const path = DEEP_LINK_PATHS[screenName];
  if (!path) {
    console.error(`Screen ${screenName} does not have a deep link path.`);
    return null;
  }

  const queryString = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
  //com.fasting_app_rn://details?id=123
  const deepLink = `sampleApp://app/${path}${
    queryString ? `?${queryString}` : ''
  }`;
  return deepLink;
};

export default generateDeepLink;

export const openDeepLink = (screenName, params = {}) => {
  const deepLink = generateDeepLink(screenName, params);
  if (!deepLink) {
    return;
  }

  Linking.openURL(deepLink);
};
