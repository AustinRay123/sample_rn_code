import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Share,
} from 'react-native';
import {useNavigation, useTheme, CommonActions} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {dimens, fontsizes} from '../../constants/dimens';
import font from '../../constants/fonts';
import useStyles from './SettingBottomSheetStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
import {AppThemeContext, commonStackIdentifier} from '../../../App';
import image from '../../constants/image';
import {useDispatch, useSelector} from 'react-redux';
import {userProfileDetails} from '../../commonSlices/profile.slice';
import {
  editFirstName,
  editLastname,
} from '../../commonSlices/editProfile.slice';
import RoundedButtom from '../RoundedButtom';
import GradientTextComp from '../GradientTextComp';
import LogoutSheet from './LogoutSheet';
import {
  logout,
  clearState,
  deleteAccount,
  updateOpenModalOnSetting,
  commonSlice,
} from '../../commonSlices/common.slice';
import * as AsyncStore from '../../asyncstorage/index';
import CustomModal from '../CustomModal/CustomModal';
import {EventRegister} from 'react-native-event-listeners';
import YesNoModalComp from '../YesNoModalComp';
import {USER_DATA} from '../../asyncstorage/Keys';
import SocialMediaPopup from '../SocialMediaPopup';
import constants from '../../constants/constants';

import * as homeSlice from '../../commonSlices/home.slice';
import * as activityIntakeSlice from '../../commonSlices/activityIntakeSlice';
import * as waterIntakeSlice from '../../commonSlices/waterIntakeSlice';
import * as myProfileSlice from '../../commonSlices/profile.slice';
import * as productSlice from '../../commonSlices/product.slice';
import * as articleSlice from '../../commonSlices/explore.slice';
import * as calendarSlice from '../../commonSlices/calendar.slice';
import * as signupSlice from '../../commonSlices/signup.slice';
import * as siginSlice from '../../commonSlices/sigin.slice';
import * as chooseYourGoal from '../../commonSlices/chooseYourGoal.slice';
import * as quize from '../../commonSlices/quizSlice';

const SettingBottomSheet = ({
  visibility,
  onBackdropPress,
  onItemClick,
  onClickMoreBillingOptions,
  setVisibleSetting,
}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const [subscriptionModal, setSubscriptionModal] = React.useState(false);
  const [selectedField, setSelectedField] = React.useState('');
  const [yesNoModal, setYesNoModal] = React.useState(false);
  const selector_common = useSelector(state => state.commonSliceReducer);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.editProfileReducer);
  const myProfileSelector = useSelector(state => state.myProfileReducer);
  const [userData, setUserData] = useState([]);
  const [isPrefrenceVisible, setIsPrefrenceVisible] = useState(false);
  const [isSocialMediaModelVisible, setIsSocialMediaModelVisible] =
    useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    const getUserDatafromdb = async () => {
      const userDataDb = await AsyncStore.getJsonData(USER_DATA);
      setUserData(userDataDb);
      // userData?.play_store_url || userData?.app_store_url
      // {userData?.facebook_url ||
      //   userData?.instagram_url ||
      //   userData?.youtube_url ||
      //   userData?.twitter_url ?
      if (
        userDataDb.play_store_url ||
        userDataDb.app_store_url ||
        userDataDb.facebook_url ||
        userDataDb.instagram_url ||
        userDataDb.youtube_url ||
        userDataDb.twitter_url
      ) {
        setIsPrefrenceVisible(true);
      } else {
        setIsPrefrenceVisible(false);
      }
    };
    getUserDatafromdb();
  }, []);

  useEffect(() => {
    // console.log('selector', selector);
    if (
      selector_common?.logoutData?.status == true ||
      selector_common?.deleteAccountRes?.status == true
    ) {
      AsyncStore.storeData(AsyncStore.Keys.SIGN_UP_STEP, '1');
      AsyncStore.storeData(AsyncStore.Keys.ACCESS_TOKEN, '');
      AsyncStore.storeJsonData(AsyncStore.Keys.USER_DATA, {});
      AsyncStore.storeJsonData(AsyncStore.Keys.TIMER_FORWARD, 0);
      AsyncStore.storeJsonData(AsyncStore.Keys.TIMER_BACKWARD, 0);
      AsyncStore.storeJsonData(AsyncStore.Keys.TIMER_BACKGROUND_VALUE, 0);
      AsyncStore.storeJsonData(AsyncStore.Keys.IS_TIMER_RUNING, false);
      AsyncStore.storeJsonData(AsyncStore.Keys.TIMER_START_TIME, '');
      AsyncStore.storeJsonData(AsyncStore.Keys.SELECTED_FAST_TIME_DATA, 0);
      AsyncStore.storeJsonData(AsyncStore.Keys.ONGOING_FAST_ID, 0);
      AsyncStore.storeJsonData(AsyncStore.Keys.ONGOING_FAST_DATA, {});

      dispatch(myProfileSlice.clearState());
      dispatch(homeSlice.clearState());
      dispatch(activityIntakeSlice.clearState());
      dispatch(waterIntakeSlice.clearState());
      dispatch(productSlice.clearProduct());
      dispatch(articleSlice.clearArticles());
      dispatch(calendarSlice.clearCalendarData());

      dispatch(signupSlice.clearState());
      dispatch(siginSlice.clearState());
      dispatch(chooseYourGoal.clearState());
      dispatch(quize.clearState());

      setModalVisible(false);
      setYesNoModal(false);
      dispatch(clearState());
      onBackdropPress();
      EventRegister.emit('logout_from_setting', true);
      if (Platform.OS === 'ios') {
        setTimeout(() => {
          // navigation.replace(commonStackIdentifier.signup_screen, {
          //   isFromLogout: true,
          // });
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: commonStackIdentifier.signup_screen,
                  params: {isFromLogout: true},
                },
              ],
            }),
          );
        }, 10);
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: commonStackIdentifier.signup_screen,
                params: {isFromLogout: true},
              },
            ],
          }),
        );
      }
    }
  }, [selector_common?.logoutData, selector_common?.deleteAccountRes]);

  // React.useEffect(() => {
  //   dispatch(userProfileDetails()).then(() => {
  //     if (myProfileSelector?.checkDataStatus === 'fulfilled') {
  //       const {first_name, last_name} = myProfileSelector?.myProfileData;

  //       dispatch(editFirstName(first_name));
  //       dispatch(editLastname(last_name));
  //     }
  //   });
  // }, []);

  const handleOpenModal = field => {
    setSelectedField(field);
    setSubscriptionModal(true);
    setIsContentVisible(true);
    // dispatch(clearState());
  };

  const handleCloseModal = () => {
    setSubscriptionModal(false);
    setIsContentVisible(false);
    setSelectedField('');
  };

  const handleFieldSubmit = (field, value) => {
    // Handle the submitted value based on the field (e.g., update state, send API request, etc.)
    console.log(`Field: ${field}, Value: ${value}`);
  };

  const setshareApptext = () => {
    if (Platform.OS == 'android') {
      return constants.APP_SHARE_TEXT + `${userData.play_store_url}`;
    } else {
      return constants.APP_SHARE_TEXT + `${userData.play_store_url}`;
    }
  };

  const renderContent = () => {
    return (
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <View styles={{}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(commonStackIdentifier.profile);
                onItemClick();
              }}
              style={styles.section}>
              <Text style={[styles.sectionTitle]}>My Profile</Text>
              <View style={styles.sectionContent}>
                <Text style={styles.sectionValue}>
                  {selector.firstName} {selector.lastName}
                </Text>
                <Image
                  source={require('../../assets/rightArrow.png')}
                  style={styles.arrowImage}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View styles={{}}>
            <TouchableOpacity
              onPress={() => handleOpenModal('subscription')}
              style={styles.section}>
              <Text style={[styles.sectionTitle]}>My sampleApp Plus</Text>
              <View style={styles.sectionContent}>
                <Text style={styles.sectionValue}>Active</Text>
                <Image
                  source={require('../../assets/rightArrow.png')}
                  style={styles.arrowImage}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* <View styles={{}}>
          <TouchableOpacity onPress={() => {}} style={styles.section}>
            <Text style={[styles.sectionTitle]}>Restore Purchases</Text>
            <View style={styles.sectionContent}>
              <Text style={styles.sectionValue}>June 6, 2023</Text>
              <Image
                source={require('../../assets/rightArrow.png')}
                style={styles.arrowImage}
              />
            </View>
          </TouchableOpacity>
        </View> */}

          <View styles={{}}>
            <TouchableOpacity
              onPress={() => {
                // setModalVisible(true);
                setYesNoModal(true);
              }}
              style={styles.section}>
              <Text style={[styles.sectionTitle, {color: colors.deepmagenta}]}>
                Delete Account
              </Text>
            </TouchableOpacity>
          </View>
          <View styles={{}}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              style={styles.section}>
              <Text style={[styles.sectionTitle, {color: colors.deepmagenta}]}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
          {isPrefrenceVisible ? (
            <>
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: '#95969D',
                    marginTop: dimens.h3,
                    fontFamily: font.Proximanova_Bold,
                  },
                ]}>
                Preferences
              </Text>

              {/* ----- Preference section ----- */}
              {userData?.play_store_url || userData?.app_store_url ? (
                <>
                  <View styles={{}}>
                    <TouchableOpacity
                      onPress={() => {
                        if (Platform.OS == 'android') {
                          Linking.canOpenURL(userData?.play_store_url).then(
                            supported => {
                              supported &&
                                Linking.openURL(userData?.play_store_url);
                            },
                            err => console.log(err),
                          );
                        } else {
                          Linking.canOpenURL(userData?.app_store_url).then(
                            supported => {
                              supported &&
                                Linking.openURL(userData?.app_store_url);
                            },
                            err => console.log(err),
                          );
                        }
                      }}
                      style={styles.section}>
                      <View style={styles.startImageContainer}>
                        <View style={styles.preferenceIcon}>
                          <Image
                            source={require('../../assets/star.png')}
                            style={styles.starImage}
                          />
                        </View>
                        <View>
                          <Text style={[styles.sectionTitle]}>
                            Rate us on{' '}
                            {Platform.OS === 'ios' ? 'App Store' : 'Play Store'}
                          </Text>
                          <Text style={styles.rateTextStyle}>
                            Your{' '}
                            {Platform.OS === 'ios'
                              ? 'App Store'
                              : 'Play Store '}{' '}
                            rating helps a lot
                          </Text>
                        </View>
                      </View>
                      <View style={styles.sectionContent}>
                        <Image
                          source={require('../../assets/rightArrow.png')}
                          style={styles.arrowImage}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              ) : null}

              {userData?.facebook_url ||
              userData?.instagram_url ||
              userData?.youtube_url ||
              userData?.twitter_url ? (
                <View styles={{}}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsSocialMediaModelVisible(true);
                    }}
                    style={styles.section}>
                    <View style={styles.startImageContainer}>
                      <View style={styles.preferenceIcon}>
                        <Image
                          source={image.ic_app_logo}
                          style={styles.logoImage}
                        />
                      </View>
                      <View>
                        <Text style={[styles.sectionTitle]}>
                          Find sampleApp online
                        </Text>
                        <Text style={styles.rateTextStyle}>
                          Instagram, Twitter, Facebook, Youtube
                        </Text>
                      </View>
                    </View>
                    <View style={styles.sectionContent}>
                      <Image
                        source={require('../../assets/rightArrow.png')}
                        style={styles.arrowImage}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null}

              {/* ----------------------/////------------- */}

              {userData?.play_store_url || userData?.app_store_url ? (
                <View styles={{}}>
                  <TouchableOpacity
                    onPress={() => {
                      Share.share(
                        {
                          subject: 'Download INNO Fast App Now',
                          title: 'Download INNO Fast App Now',
                          message: setshareApptext(),
                        },
                        {
                          // Android only:
                          dialogTitle: 'Share INNO Fast App',
                          // iOS only:
                          excludedActivityTypes: [],
                        },
                      );
                    }}
                    style={styles.section}>
                    <View style={styles.startImageContainer}>
                      <View style={styles.preferenceIcon}>
                        <Image
                          source={require('../../assets/share.png')}
                          style={styles.shareImage}
                        />
                      </View>
                      <View>
                        <Text style={[styles.sectionTitle]}>
                          Share sampleApp with friends
                        </Text>
                        <Text style={styles.rateTextStyle}>
                          Link to Play Store
                        </Text>
                      </View>
                    </View>
                    <View style={styles.sectionContent}>
                      <Image
                        source={require('../../assets/rightArrow.png')}
                        style={styles.arrowImage}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null}
            </>
          ) : null}
          {userData?.help_center_url ||
          userData?.privacy_policy_url ||
          userData?.terms_of_use_url ? (
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: '#95969D',
                  marginTop: dimens.h3,
                  fontFamily: font.Proximanova_Bold,
                },
              ]}>
              App
            </Text>
          ) : null}
          {!!userData?.help_center_url && userData?.help_center_url != '' && (
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(commonStackIdentifier.custom_webview, {
                    url: userData?.help_center_url,
                    title: 'Help Center & Support',
                  });
                  onItemClick();
                }}
                style={styles.section}>
                <View style={styles.startImageContainer}>
                  <View>
                    <Text style={[styles.sectionTitle]}>
                      {'Help Center & Support'}
                    </Text>
                  </View>
                </View>
                <View style={styles.sectionContent}>
                  <Image
                    source={require('../../assets/rightArrow.png')}
                    style={styles.arrowImage}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
          {!!userData?.privacy_policy_url &&
            userData?.privacy_policy_url != '' && (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(commonStackIdentifier.custom_webview, {
                      url: userData?.privacy_policy_url,
                      title: 'Privacy Policy',
                    });
                    onItemClick();
                  }}
                  style={styles.section}>
                  <View style={styles.startImageContainer}>
                    <View>
                      <Text style={[styles.sectionTitle]}>
                        {'Privacy Policy'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.sectionContent}>
                    <Image
                      source={require('../../assets/rightArrow.png')}
                      style={styles.arrowImage}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          {!!userData?.terms_of_use_url && userData?.terms_of_use_url != '' && (
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(commonStackIdentifier.custom_webview, {
                    url: userData?.terms_of_use_url,
                    title: 'Terms of Use',
                  });
                  //dispatch(updateOpenModalOnSetting(false));
                  onItemClick();
                }}
                style={styles.section}>
                <View style={styles.startImageContainer}>
                  <View>
                    <Text style={[styles.sectionTitle]}>{'Terms of Use'}</Text>
                  </View>
                </View>
                <View style={styles.sectionContent}>
                  <Image
                    source={require('../../assets/rightArrow.png')}
                    style={styles.arrowImage}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </ScrollView>
    );
  };

  const onLogout = () => {
    setModalVisible(false);
    dispatch(logout());
  };

  return (
    <Modal
      animationInTiming={300}
      animationOutTiming={400}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      // animationIn="slideInUp"
      // animationOut="slideOutDown"
      style={styles.modalContainer}
      isVisible={visibility}
      onBackdropPress={onBackdropPress}
      onSwipeComplete={onBackdropPress}
      swipeDirection={['down']}
      propagateSwipe={true}
      // visible={visible} onRequestClose={onClose}

      // animationInTiming={1000}
      // animationOutTiming={1000}
    >
      <StatusBar
        translucent
        // backgroundColor={visibility ? '#ddd' : 'transparent'}
        backgroundColor={colors.black}
        barStyle="dark-content"
      />
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        {yesNoModal && (
          <YesNoModalComp
            openModal={yesNoModal}
            onBackPress={() => setYesNoModal(false)}
            errorMessage={selector_common?.deleteAccountErrorMsg}
            onOkPress={() => {
              dispatch(deleteAccount());
            }}
            title={'Delete Account'}
            onCancelPress={() => setYesNoModal(false)}
          />
        )}
        {
          <SocialMediaPopup
            data={userData}
            visibility={isSocialMediaModelVisible}
            onBackdropPress={() => {
              setIsSocialMediaModelVisible(false);
            }}
          />
        }
        <View style={styles.mainContainer}>
          <Text style={styles.headerStyle}>Setting</Text>
          {/* <TouchableOpacity onPress={onClose}> */}
          <AntDesign
            name="closecircleo"
            size={fontsizes.FONT_28Px_H3}
            color={colors.bigTextColors}
            style={styles.closeButtonStyle}
            onPress={onBackdropPress}
          />
          <LogoutSheet
            onBackdropPress={() => {
              setModalVisible(false);
            }}
            visibility={isModalVisible}
            onLogout={onLogout}
          />
          {/* </TouchableOpacity> */}
          {renderContent()}
        </View>
        <CustomModal
          visible={subscriptionModal}
          field={selectedField}
          isContentVisible={isContentVisible}
          onClose={handleCloseModal}
          onSubmit={handleFieldSubmit}
          customStyle={styles.customModalStyle}
          mainModalStyle={{
            borderWidth: 1,
            margin: 0,
            backgroundColor: colors.darkWhite,
          }}
        />
      </KeyboardAvoidingView>
    </Modal>
    // <View>
    //   <Text>ksjhfvhjsbdh</Text>
    // </View>
  );
};

export default SettingBottomSheet;
