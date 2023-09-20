import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Platform,
  StatusBar,
  BackHandler,
} from 'react-native';
import React, {useRef, useState, useEffect, useContext} from 'react';
import image from '../../constants/image';
import {dimens, fontsizes} from '../../constants/dimens';
import font from '../../constants/fonts';
import RoundedButtom from '../../components/RoundedButtom';
import useStyles from './IntroSliderStyle';
import {useFocusEffect, useRoute, useTheme} from '@react-navigation/native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AsyncStore from '../../asyncstorage/index';
import {AppThemeContext, commonStackIdentifier} from '../../../App';
import {handleBackPress} from '../../Utility/backHandler';
// import image from '../../constants/image';
const IntroScreen = props => {
  const {AppThemeName} = useContext(AppThemeContext);

  const slides = [
    {
      image: image.introSlider1,
      // headline: image.IntroHeadline1,
      headline: 'Fasting Made Easy',
      text: 'Effortlessly track fasting windows and progress with our app.',
    },
    {
      image: image.introSlider2,
      // headline: image.IntroHeadline2,
      headline: 'Progress Tracking',
      text: 'Track your progress and stay motivated with our powerful tracking tools.',
    },
    {
      image: image.introSlider3,
      // headline: image.IntroHeadline3,
      headline: 'Insights & Analytics',
      text: 'You can apply to your desirable jobs very quickly and easily with ease.',
    },
    {
      image: image.introSlider4,
      // headline: image.IntroHeadline4,
      headline: 'Goal Setting',
      text: 'Define your fasting goals and track them with precision.',
    },
  ];
  const {colors} = useTheme();
  const styles = useStyles();
  const [key, setKey] = useState(0);
  const slider = useRef(undefined);

  const route = useRoute();

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        return handleBackPress(route.name); // Use the utility function
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, [route]),
  );

  
  const renderItem = ({item, index}) => {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: Platform.OS === 'android' ? dimens.h3_5 : 0,
        }}>
        <View>
          {index == 0 ? (
            <></>
          ) : (
            <>
              <TouchableOpacity
                style={{
                  left: dimens.w3,
                  top: dimens.h2_5,
                  alignSelf: 'flex-start',
                  position: 'absolute',
                }}
                onPress={() => goToPreviousSlide()}>
                <AntDesign
                  name="left"
                  size={dimens.w6}
                  color={colors.black}
                  style={{width: dimens.w6, height: dimens.h3}}
                />
              </TouchableOpacity>
            </>
          )}
          <View style={[styles.mainView, {padding: index == 3 ? 30 : 0}]}>
            <Image
              source={item.image}
              style={[styles.img]}
              resizeMode="contain"
            />
          </View>
          
          <Text style={styles.headlineText}>{item.headline}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </SafeAreaView>
    );
  };
  const goToPreviousSlide = () => {
    const previousSlideIndex = key - 1; // Calculate the index of the previous slide
    if (previousSlideIndex >= 0) {
      slider?.current.goToSlide(previousSlideIndex, true);
      setKey(previousSlideIndex);
    }
  };
  const _renderPagination = activeIndex => {
    return (
      <View style={styles.renderPageView}>
        <View style={[styles.paginationView]}>
          <View style={[styles.dotContainer]}>
            {slides.length > 1 &&
              slides.map((_, i) =>
                i === activeIndex ? (
                 
                  <View>
                    <TouchableOpacity
                      key={i}
                      style={
                        i === activeIndex
                          ? styles.activeDotStyle
                          : styles.dotStyle
                      }
                      onPress={() => {
                        slider?.current.goToSlide(i, true);
                        setKey(i);
                      }}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    key={i}
                    style={
                      i === activeIndex
                        ? styles.activeDotStyle
                        : styles.dotStyle
                    }
                    onPress={() => {
                      slider?.current.goToSlide(i, true);
                      setKey(i);
                    }}
                  />
                ),
              )}
          </View>
        </View>
        
        <View style={{marginTop: dimens.h2, justifyContent: 'center'}}>
          
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[colors.signupLightBlue, colors.signupDarkBlue]}
            style={[
              styles.gradStylesWhite,
              {
                height: dimens.h5_6,
              },
            ]}>
            <TouchableOpacity
              style={styles.containerBtnWhite}
              onPress={async () => {
                slider?.current.goToSlide(key + 1, true);
                setKey(key + 1);
                const keyValue = true;
                if (key > 2) {
                  AsyncStore.storeJsonData(
                    AsyncStore.Keys.SIGN_UP_STEP,
                    '4',
                  ).then(res => {
                    console.log('res 1 = ', res);
                    AsyncStore.storeJsonData(
                      AsyncStore.Keys.INTRO_KEY,
                      keyValue,
                    ).then(res => {
                      console.log('res 2 = ', res);
                      props.navigation.replace(
                        commonStackIdentifier.choose_your_goal,
                      );
                    });
                  });
                }
              }}>
              <Text style={styles.titleStylebtnBlack}>{'NEXT'}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.darkWhite}}>
     
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <View style={{flex: 1, backgroundColor: colors.darkWhite}}>
        <AppIntroSlider
          activeDotStyle={styles.activeDotStyle}
          dotStyle={styles.dotStyle}
          renderItem={renderItem}
          renderPagination={_renderPagination}
          data={slides}
          showNextButton={false}
          onSlideChange={(a, b) => setKey(a)}
          ref={slider}
        />
      </View>
    </SafeAreaView>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({});
