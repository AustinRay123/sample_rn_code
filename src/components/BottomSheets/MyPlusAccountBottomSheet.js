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
import useStyles from './MyPlusAccountStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {AppThemeContext} from '../../../App';
import image from '../../constants/image';
import RoundedButtom from '../RoundedButtom';
import GradientTextComp from '../GradientTextComp';

const MyPlusAccountBottomSheet = ({
  visibility,
  onBackdropPress,
  onItemClick,
  onClickMoreBillingOptions,
}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const {AppThemeName, updateAppTheme} = useContext(AppThemeContext);

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
      // backdropColor="transparent"
      statusBarTranslucent
      onBackdropPress={onBackdropPress}
      onSwipeComplete={onBackdropPress}
      //swipeDirection={['down']}
      isVisible={visibility}>
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
          <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
            <StatusBar
              translucent
              // backgroundColor="transparent"
              backgroundColor={colors.black}
              barStyle={'dark-content'}
            />
            <ScrollView>
              <View style={styles.container}>
                <View style={styles.contentContainer}>
                  <View>
                    <AntDesign
                      name="closecircleo"
                      size={fontsizes.FONT_28Px_H3}
                      color={colors.bigTextColors}
                      style={{
                        alignSelf: 'flex-end',
                        marginVertical: dimens.h1,
                        marginHorizontal: dimens.w4,
                      }}
                      onPress={onBackdropPress}
                    />
                  </View>
                  <View style={styles.topContainer}>
                    <Image
                      //source={image.proIcon}
                      source={
                        AppThemeName == 'MyDefaultThemeDay'
                          ? image.proIconOrange
                          : image.proIcon
                      }
                      style={{marginVertical: dimens.w2, alignSelf: 'center'}}
                      resizeMode="contain"
                    />
                    <Text style={styles.headerText}>sampleApp Pro</Text>
                    <View
                      style={{
                        height: 1,
                        width: '90%',
                        backgroundColor: 'lightgray',
                        justifyContent: 'center',
                        marginVertical: dimens.w2,
                      }}></View>

                    <View style={{width: dimens.w80}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginVertical: dimens.w3,
                        }}>
                        <AntDesign
                          name="check"
                          size={fontsizes.FONT_24Px_H4}
                          color={colors.checkboxGreen}
                          style={{marginHorizontal: dimens.w2}}
                        />
                        <View>
                          <Text style={styles.titleText}>
                            Personalized Stats
                          </Text>
                          <Text style={styles.itemText}>
                            Compare insights on fasts, meals, and exercise
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          marginVertical: dimens.w3,
                        }}>
                        <AntDesign
                          name="check"
                          size={fontsizes.FONT_24Px_H4}
                          color={colors.checkboxGreen}
                          style={{marginHorizontal: dimens.w2}}
                        />
                        <View>
                          <Text style={styles.titleText}>
                            Tips from Experts
                          </Text>
                          <Text style={styles.itemText}>
                            Turn research into simple daily habits
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          marginVertical: dimens.w3,
                        }}>
                        <AntDesign
                          name="check"
                          size={fontsizes.FONT_24Px_H4}
                          color={colors.checkboxGreen}
                          style={{marginHorizontal: dimens.w2}}
                        />

                        <View>
                          <Text style={styles.titleText}>Custom Plans</Text>
                          <Text style={styles.itemText}>
                            Get the fasting plan that's right for you
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={{marginHorizontal: dimens.w4}}>
                    <View
                      style={{
                        marginVertical: dimens.h1,
                        marginHorizontal: dimens.w3,
                      }}>
                      <View
                        style={{
                          marginVertical: dimens.w3,
                          flexDirection: 'row',
                        }}>
                        <Text style={styles.welcomeText}>For only</Text>
                        {/* <Text style={styles.priceText}>$ 1.35</Text>  */}
                        <GradientTextComp
                          style={styles.gradColorText}
                          colors={[
                            colors.textGradColors1,
                            colors.textGradColors2,
                          ]}>
                          {' '}
                          $ 1.35{' '}
                        </GradientTextComp>
                        <Text style={styles.welcomeText}>per week..</Text>
                      </View>
                      <View style={{marginVertical: dimens.w3}}>
                        <Text style={styles.titleText}>
                          Build lasting habits
                        </Text>
                        <Text style={styles.itemText}>
                          From sustainable routines that fit your life
                        </Text>
                      </View>

                      <View style={{marginVertical: dimens.w2}}>
                        <Text style={styles.titleText}>
                          See progress in real time
                        </Text>
                        <Text style={styles.itemText}>
                          Watch every day wins add up to big victories
                        </Text>
                      </View>

                      <View style={{marginVertical: dimens.w3}}>
                        <Text style={styles.titleText}>
                          Improve metabolic wellbeing
                        </Text>
                        <Text style={styles.itemText}>
                          Make strides toward holistic health
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      width: dimens.w100,
                      height: dimens.h25,
                      backgroundColor: 'white',
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginVertical: dimens.w2,
                      }}>
                      <Text
                        style={[
                          styles.priceText,
                          {
                            textAlign: 'center',
                            color: colors.textInputTextColor,
                          },
                        ]}>
                        $69.99/year
                      </Text>
                      <View style={{marginVertical: dimens.w1}}>
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
                      <View style={{marginVertical: dimens.w1}}>
                        <RoundedButtom
                          onPress={() => onClickMoreBillingOptions()}
                          title={'More billing options'}
                          titleStyle={styles.titleStylebtn2}
                          gradColors={[
                            colors.signupLightBlue,
                            colors.signupDarkBlue,
                          ]}
                          // isLinearGradiantApplied={true}
                          gradStyle={styles.gradStylesWhite}
                          container={styles.containerBtnWhite}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </SafeAreaView>
    </ModalNew>
  );
};

export default MyPlusAccountBottomSheet;
