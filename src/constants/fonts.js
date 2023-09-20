import {Platform, StyleSheet} from 'react-native';

const font = {
  // Proximanova_Bold: Platform.OS === "ios" ? "FONTSPRINGDEMO-ProximaNovaBold" : "Fontspring-DEMO-proximanova-bold",
  // Proximanovacond_Medium: Platform.OS === "ios" ? "FONTSPRINGDEMO-ProximaNovaCondMediumRegular" : "Fontspring-DEMO-proximanovacond-medium",
  // Proximanovaexcn_Regular: Platform.OS === "ios" ? "FONTSPRINGDEMO-ProximaNovaExCnRegular" : "Fontspring-DEMO-proximanovaexcn-regular",
  // // ProximaNovaExtraCondensed_Bold: Platform.OS === "ios" ? "Mark Simonson  Proxima Nova Extra Condensed Bold TheFontsMaster.com" : "Mark Simonson  Proxima Nova Extra Condensed Bold TheFontsMaster.com",
  // ProximaNovaExtraCondensed_Bold: Platform.OS === "ios" ? "ProximaNovaExCn-Bold" : "Mark Simonson  Proxima Nova Extra Condensed Bold TheFontsMaster.com",

  Proximanova_Bold:
    Platform.OS === 'ios' ? 'ProximaNova-Bold' : 'ProximaNova-Bold',
  Proximanovacond_Medium:
    Platform.OS === 'ios' ? 'ProximaNova-Medium' : 'ProximaNova-Medium',
  Proximanovaexcn_Regular:
    Platform.OS === 'ios' ? 'ProximaNova-Regular' : 'ProximaNova-Regular',
  // ProximaNovaExtraCondensed_Bold: Platform.OS === "ios" ? "Mark Simonson  Proxima Nova Extra Condensed Bold TheFontsMaster.com" : "Mark Simonson  Proxima Nova Extra Condensed Bold TheFontsMaster.com",
  ProximaNovaExtraCondensed_Bold:
    Platform.OS === 'ios' ? 'ProximaNovaExCn-Bold' : 'ProximaNovaExCn-Bold',
};

export default font;
