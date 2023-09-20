import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import ModalNew from 'react-native-modal';
import {dimens, fontsizes} from '../../constants/dimens';
import font from '../../constants/fonts';
import useStyles from './MoreBillingOptionStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {AppThemeContext} from '../../../App';
import image from '../../constants/image';
import RoundedButtom from '../RoundedButtom';

const itemList = [
  {
    id: 1,
    status: 'Annual',
    price: '$69.99',
    title: 'Pay only $5.85 per month by subscribing annually',
    isActived: true,
  },
  {
    id: 2,
    status: 'Monthly',
    price: '$9.99',
    title: '',
    isActived: false,
  },
];
const MyPlusAccountBottomSheet = ({
  visibility,
  onBackdropPress,
  onItemClick,
  onClickBack,
}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const {AppThemeName, updateAppTheme} = useContext(AppThemeContext);
  const [items, setItems] = React.useState(itemList);

  return (
    <ModalNew
      animationInTiming={600}
      animationOutTiming={400}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      style={{
        //borderRadius: 20,
        justifyContent: 'flex-end',
        margin: 0,
      }}
      onBackdropPress={onBackdropPress}
      onSwipeComplete={onBackdropPress}
      swipeDirection={['down']}
      isVisible={visibility}>
      <StatusBar
        translucent
        // backgroundColor="transparent"
        backgroundColor={colors.black}
        barStyle={'dark-content'}
      />
      <SafeAreaView>
        <ImageBackground
          source={
            AppThemeName == 'MyDefaultThemeDay'
              ? image.img_Background
              : image.img_Background2
          }
          resizeMode={'cover'}
          resizeMethod="scale"
          style={{height: '100%'}}>
          <View style={styles.container}>
            <View style={styles.contentContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: dimens.w1,
                }}>
                <Ionicons
                  name="chevron-back"
                  size={fontsizes.FONT_28Px_H3}
                  color={colors.bigTextColors}
                  style={{
                    alignSelf: 'flex-end',
                    marginHorizontal: dimens.w4,
                  }}
                  onPress={onClickBack}
                />
                <Text style={[styles.headingText2, {marginTop: 15}]}>
                  More Billing Options
                </Text>
                <AntDesign
                  name="closecircleo"
                  size={fontsizes.FONT_28Px_H3}
                  color={colors.bigTextColors}
                  style={{
                    alignSelf: 'flex-end',
                    marginHorizontal: dimens.w4,
                  }}
                  onPress={onBackdropPress}
                />
              </View>
              <View style={{marginTop: 15, marginBottom: 20}}>
                <FlatList
                  data={items}
                  renderItem={({item}) => (
                    <View
                      style={{
                        marginVertical: dimens.w2,
                        margin: dimens.w5,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          //onItemClick(item)
                          setItems(
                            items.map(itemMap =>
                              itemMap.id === item.id
                                ? {...itemMap, isActived: true}
                                : {...itemMap, isActived: false},
                            ),
                          );
                        }}>
                        <View style={styles.topContainer}>
                          <View style={{width: dimens.w70}}>
                            <Text style={styles.itemText}>
                              {item.status.toLocaleUpperCase()}
                            </Text>
                            <Text style={styles.headingText}>{item.price}</Text>
                            <Text style={styles.itemText}>{item.title}</Text>
                          </View>
                          <View
                            style={{
                              alignSelf: 'center',
                              marginTop: dimens.w2,
                              marginHorizontal: dimens.w5,
                            }}>
                            {item.isActived ? (
                              <Image
                                source={
                                  AppThemeName == 'MyDefaultThemeDay'
                                    ? image.ic_checkbox_orange
                                    : image.ic_checkbox_blue
                                }
                                style={{height: dimens.w5, width: dimens.w5}}
                              />
                            ) : (
                              <View
                                style={{
                                  height: dimens.w5,
                                  width: dimens.w5,
                                  borderRadius: dimens.w5,
                                  borderWidth: 1,
                                  borderColor: colors.textInputTextColor,
                                }}
                              />
                            )}
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}
                  style={{height: '75%'}}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: dimens.w100,
                  height: dimens.h20,
                  backgroundColor: 'white',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginVertical: dimens.w9,
                  }}>
                  <Text style={[styles.itemText, {textAlign: 'center'}]}>
                    Renews at 69.99 per year
                  </Text>
                  <View style={{marginVertical: dimens.w2}}>
                    <RoundedButtom
                      onPress={onItemClick}
                      title={'Subscribe to sampleApp plus'}
                      titleStyle={styles.titleStylebtn}
                      gradColors={[
                        colors.signupLightBlue,
                        colors.signupDarkBlue,
                      ]}
                      gradStyle={styles.gradStyles}
                      isLinearGradiantApplied={true}
                    />
                  </View>
                  <View style={{marginVertical: dimens.w}}>
                    <Text style={[styles.priceText, {textAlign: 'center'}]}>
                      Terms of Use and Privacy Policy
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </ModalNew>
  );
};

export default MyPlusAccountBottomSheet;
