import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import {CommonActions, useNavigation, useTheme} from '@react-navigation/native';
import ImagePickerButton from '../../components/ImagePickerButton';
import useStyles from './profileStyle';
import Header from '../../components/Header/Header';
import image from '../../constants/image';
import font from '../../constants/fonts';
import {useDispatch, useSelector} from 'react-redux';
import SelectGenderBottomSheet from '../../components/BottomSheets/SelectGenderBottomSheet';
import CustomHeightPicker from '../../components/CustomHeightPicker/CustomHeightPicker';
import CustomModal from '../../components/CustomModal/CustomModal';
import DatepickerBottomSheet from '../../components/BottomSheets/DatepickerBottomSheet';
import {
  checkImageType,
  clearUpdateStatus,
  editBirthDate,
  editGender,
  editProfilePic,
  openModal,
  updateUserProfile,
} from '../../commonSlices/editProfile.slice';
import {userProfileDetails} from '../../commonSlices/profile.slice';
import moment from 'moment';
import * as AsyncStore from '../../asyncstorage/index';
import {commonStackIdentifier} from '../../../App';
import {deleteAccount} from '../../commonSlices/common.slice';
import {clearStatus} from '../../commonSlices/sigin.slice';
import AfterSignInErrorComp from '../../components/AfterSignInErrorComp';
import ProgressIndicator from '../../components/ProgressIndicator';
import YesNoModalComp from '../../components/YesNoModalComp';
import {dimens} from '../../constants/dimens';

const Profile = React.memo(() => {
  const styles = useStyles();
  const navigation = useNavigation();
  const {dark} = useTheme();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedField, setSelectedField] = React.useState('');
  const [isGenderClicked, setisGenderClicked] = React.useState(false);
  const [isBithDateClicked, setisBithDateClicked] = React.useState(false);
  const [isContentVisible, setIsContentVisible] = React.useState(false);
  const [isPickerVisible, setIsPickerVisible] = React.useState(false);
  const [selectedHeight, setSelectedHeight] = React.useState(null);
  const [yesNoModal, setYesNoModal] = React.useState(false);
  const [okModal, setOkModal] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const selector = useSelector(state => state.editProfileReducer);
  const myProfileSelector = useSelector(state => state.myProfileReducer);
  const selector_common = useSelector(state => state.commonSliceReducer);
  const [userData, setUserData] = React.useState({});

  useEffect(() => {
    if (selector.updateUserProfileCheckStatus == 'fulfilled') {
      if (selector?.userProfileData?.status == false) {
        setModal(true);
      } else {
        dispatch(clearUpdateStatus(false));
      }
    }
  }, [selector.updateUserProfileCheckStatus]);

  useEffect(() => {
    if (
      selector.firstName &&
      selector.lastName &&
      selector.selectedGender &&
      selector.birthDate &&
      selector.profilePic &&
      selector.email
    ) {
      updateProfile();
    }
  }, [
    selector.firstName,
    selector.lastName,
    selector.selectedGender,
    selector.birthDate,
    selector.profilePic,
    selector.email,
  ]);
  useEffect(() => {
    if (selector_common?.deleteAccountRes?.status == true) {
    }
  }, [selector_common.deleteAccountRes]);
  useEffect(() => {
    if (selector_common.deleteAccountCheckStatus == 'fulfilled') {
      if (selector_common?.deleteAccountRes?.status == true) {
        setYesNoModal(false);
        setOkModal(true);
        dispatch(clearStatus());
      } else {
        dispatch(clearStatus());
      }
    }
  }, [selector_common.deleteAccountCheckStatus]);

  useEffect(() => {
    dispatch(userProfileDetails()).then(res => {
      AsyncStore.storeJsonData(AsyncStore.Keys.USER_DATA, res?.payload?.data);
    });
  }, [
    myProfileSelector?.myProfileData?.weight,
    myProfileSelector?.myProfileData?.height,
  ]);

  useEffect(() => {
    const getUserDatafromdb = async () => {
      const userDataDb = await AsyncStore.getJsonData(
        AsyncStore.Keys.USER_DATA,
      );
      setUserData(userDataDb);
    };
    getUserDatafromdb();
  }, []);

  const updateProfile = () => {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append(
      'Authorization',
      'Bearer 69|b7mdEWbfaBTcTSCvHxMf0D3pyk2Fw2azQuwLvXPgQ4nwHUeAAq09dUmRZnAYfcdhufYGLdhbqYMfJ9fMteFajeFScYrf1EePPuU7pVrdjs1F23e9xsGThqhFfIKdbVVJUpiv3qFEkKc6V1W2DfJGpujEpC7fTeXNAy3wED3cdVJ2W0qFpRFj3ULbgEbgiphWHL5mW5hhngkAQfCKIsCGQTrz3NbGFMNsY8Ctx78wB9tNaDKO',
    );

    const gender =
      selector.selectedGender == 'Male'
        ? 'male'
        : selector.selectedGender == 'Female'
        ? 'female'
        : 'other';
    const formData = new FormData();

    formData.append('first_name', selector.firstName);
    formData.append('last_name', selector.lastName);
    formData.append('dob', selector.birthDate);
    formData.append('gender', gender);
    formData.append('email', selector.email);
    if (
      selector.measurement_metric !== null ||
      selector.measurement_metric !== undefined
    ) {
      formData.append(
        'measurement_metric',
        myProfileSelector?.myProfileData?.measurement_metric,
      );
    }

    if (selector.profilePic) {
      const imageType = selector.imageType === 'image/png' ? 'png' : 'jpg';
      formData.append('image', {
        uri: `${selector.profilePic}?timestamp=${Date.now()}`,
        type: selector.imageType || imageType, // Use the determined image type
        name: `profile.${imageType}`,
      });
    }

    console.log('params----', JSON.stringify(formData));
    dispatch(updateUserProfile(formData)).then(() => {
      // Fetch updated data again after the profile is updated
      dispatch(userProfileDetails()).then(res => {
        AsyncStore.storeJsonData(AsyncStore.Keys.USER_DATA, res?.payload?.data);
      });
    });
  };

  const togglePicker = () => {
    setIsPickerVisible(!isPickerVisible);
  };

  const handlePickerClose = height => {
    setSelectedHeight(height);
    togglePicker();
  };

  const handleImageSelect = image => {
    // Handle image selection here
    dispatch(editProfilePic(image?.uri));
    dispatch(checkImageType(image?.type));
    console.log('Selected Image:', image?.uri);
   
  };

  const handleOpenModal = field => {
    setSelectedField(field);
    setModalVisible(true);
    setIsContentVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedField('');
  };

  const handleFieldSubmit = (field, value) => {
    // Handle the submitted value based on the field (e.g., update state, send API request, etc.)
    console.log(`Field: ${field}, Value: ${value}`);
  };
  const onOKPress = () => {
    AsyncStore.storeData(AsyncStore.Keys.SIGN_UP_STEP, '1');
    AsyncStore.storeData(AsyncStore.Keys.ACCESS_TOKEN, '');
    AsyncStore.storeJsonData(AsyncStore.Keys.USER_DATA, {});
    
    if (Platform.OS === 'ios') {
      setTimeout(() => {
        navigation.replace(commonStackIdentifier.signup_screen, {
          isFromLogout: true,
        });
      }, 10);
      setOkModal(false);
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
      setOkModal(false);
    }
  };
  const fullName = selector.firstName + ' ' + selector.lastName;
  const names = fullName.split(' ');
  const initials = names.map(name => name.charAt(0).toUpperCase()).join(' ');

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <StatusBar
          barStyle={dark ? 'light-content' : 'dark-content'}
          backgroundColor={dark ? '#000000' : '#FFFFFF'}
        />
        {isGenderClicked && (
          <SelectGenderBottomSheet
            visibility={isGenderClicked}
            onBackdropPress={() => {
              setisGenderClicked(false);
            }}
            onItemClick={item => {
              dispatch(editGender(item.name));
            }}
          />
        )}
        {isBithDateClicked && (
          <DatepickerBottomSheet
            visibility={isBithDateClicked}
            onBackdropPress={() => {
              setisBithDateClicked(false);
            }}
            onItemClick={item => {
              dispatch(editBirthDate(item));
            }}
           
            selectedDate={moment(selector.birthDate, 'DD/MM/YYYY').format(
              'YYYY-MM-DDTHH:mm:ss.SSS[Z]',
            )}
          />
        )}
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
        {okModal && (
          <AfterSignInErrorComp
            openModal={okModal}
            title={selector_common?.deleteAccountRes?.status}
            errorMessage={selector_common?.deleteAccountRes?.message}
            onBackPress={() => setOkModal(false)}
            onOkPress={() => {
              onOKPress();
              // onBackdropPress();
            }}
            gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
            gradStyle={styles.gradErrorStyles}
            container={styles.containerErrorBtn}
          />
        )}
        {modal == true ? (
          <AfterSignInErrorComp
            openModal={modal}
            title={false}
            errorMessage={selector?.userProfileData?.message}
            onBackPress={() => {
              setModal(false);
              dispatch(clearUpdateStatus(false));
            }}
            onOkPress={() => {
              setModal(false);
              dispatch(clearUpdateStatus(false));
            }}
            gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
            gradStyle={styles.gradErrorStyles}
            container={styles.containerErrorBtn}
          />
        ) : (
          <></>
        )}
        <Header
          title="My Profile"
          prefixIcon={image.BackIcon}
          onPrefixPress={() => {
            dispatch(clearUpdateStatus(false));
            dispatch(openModal(true));
            navigation.goBack();
          }}
          // suffixIcon={image.ProfileImage}
          onSuffixPress={() => {}}
          profile={true}
          customStyle={{marginTop: 30}}></Header>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1, height: '100%'}}>
          <View style={styles.profileHeader}>
            <ImagePickerButton onImageSelect={handleImageSelect} />
            <Text style={styles.profileName}>Upload Photo Profile</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              handleOpenModal('name');
              setIsContentVisible(true);

            }}
            style={styles.section}>
            <Text style={[styles.sectionTitle]}>Name</Text>
            <View style={styles.sectionContent}>
              <Text style={styles.sectionValue}>{initials}</Text>
              <Image
                source={require('../../assets/rightArrow.png')}
                style={styles.arrowImage}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleOpenModal('subscription');
         
            }}
            style={styles.section}>
            <Text style={styles.sectionTitle}>sampleApp Plus</Text>
            <View style={styles.sectionContent}>
              <Text style={styles.sectionValue}>Explore Benefits</Text>
              <Image
                source={require('../../assets/rightArrow.png')}
                style={styles.arrowImage}
              />
            </View>
          </TouchableOpacity>

          {/* Private Information */}

          <Text
            style={[
              styles.sectionTitle,
              {
                color: '#95969D',
                marginTop: 12,
                fontFamily: font.Proximanova_Bold,
              },
            ]}>
            Private Information
          </Text>

          <TouchableOpacity
            onPress={() => {
              handleOpenModal('email');
            }}
            style={[styles.section, {marginTop: 15}]}>
            <Text style={styles.sectionTitle}>Email</Text>
            <View style={styles.sectionContent}>
              <Text style={styles.emailStyle}>{selector?.email}</Text>
              <Image
                source={require('../../assets/rightArrow.png')}
                style={styles.arrowImage}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setisBithDateClicked(true)}
            style={styles.section}>
            <Text style={styles.sectionTitle}>Birthdate</Text>

           
            <Text style={styles.sectionValue}>
              {selector.birthDate ? selector.birthDate : 'Option'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.section}
            onPress={() => setisGenderClicked(true)}>
            <Text style={styles.sectionTitle}>Sex</Text>
           
            <Text style={styles.sectionValue}>
              {selector.selectedGender ? selector.selectedGender : 'Select'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleOpenModal('weight');
              
            }}
            style={styles.section}>
            <Text style={styles.sectionTitle}>Weight</Text>
            <View style={styles.sectionContent}>
              <Text style={styles.emailStyle}>
                {userData?.weight_measurement_metric == 'kg'
                  ? userData?.weight_kg
                  : userData?.weight_lbs}{' '}
                {userData?.weight_measurement_metric}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.section} onPress={togglePicker}>
            <Text style={styles.sectionTitle}>Height</Text>
            <View style={styles.sectionContent}>
              <Text style={styles.emailStyle}>
                {userData?.height_measurement_metric == 'cm'
                  ? userData?.height_cm
                  : userData?.height_ft}{' '}
                {userData?.height_measurement_metric}
              </Text>
            </View>
          </TouchableOpacity>
         
          <CustomHeightPicker
            isVisible={isPickerVisible}
            onClose={handlePickerClose}
            selectedValue={selectedHeight}
            onBackdropPress={() => {
              setIsPickerVisible(false);
            }}
          />
          <View style={{height: 50}} />
        </ScrollView>
      </View>

      {myProfileSelector.loading && (
        <View style={styles.loaderContainer}>
          <ProgressIndicator size="large" color={colors.black} />
        </View>
      )}

      <CustomModal
        data={userData}
        visible={modalVisible}
        field={selectedField}
        isContentVisible={isContentVisible}
        onClose={handleCloseModal}
        onSubmit={handleFieldSubmit}
        customStyle={styles.customModalStyle}
        mainModalStyle={{
          margin: 0,
          backgroundColor: colors.darkWhite,
          marginTop: selectedField === 'weight' ? dimens.h24 : dimens.h20,
          elevation: 4,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      />
    </View>
  );
});

export default Profile;
