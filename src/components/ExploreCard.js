import {
  View,
  Text,
  Image,
  Platform,
  ActivityIndicator,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme, useNavigation} from '@react-navigation/native';
import font from '../constants/fonts';
import {dimens, fontsizes} from '../constants/dimens';
import RoundedButtom from './RoundedButtom';
import useStyles from './ExploreCardStyle';
import {useSelector} from 'react-redux';
import ProgressIndicator from './ProgressIndicator';
import FastImage from 'react-native-fast-image';
import RenderHTML from 'react-native-render-html';
import {commonStackIdentifier} from '../../App';

const ExploreCard = () => {
  const styles = useStyles();
  const {colors} = useTheme();
  const productSelector = useSelector(state => state.productReducer);
  const [productData, setProductData] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    if (productSelector?.product) {
      setProductData(productSelector?.product?.data);
    }
  }, [productSelector?.product]);
  return (
    <View style={styles.mainContainer}>
      {productSelector?.loading ? (
        <>
          {/* <ActivityIndicator size={'large'} /> */}
          <ProgressIndicator size={'large'} color={colors.deepcyan} />
        </>
      ) : (
        !!productData &&
        productData.length > 0 &&
        !!productData[1] && (
          <>
            <View style={styles.rowContainer}>
              <View style={{flex: 1.5, marginRight: 20}}>
                {/* <Text style={styles.supplementText}>Supplements</Text> */}

                {/* <Text style={styles.text2style}>INNO SHRED FOCUS</Text> */}
                <View style={{}}>
                  <Text numberOfLines={3} style={styles.text2style}>
                    {/* {productSelector?.product?.data[0]?.description} */}
                    {!!productData &&
                      productData.length > 0 &&
                      productData[1]?.description}
                  </Text>
                  {/* <RenderHTML
                    source={{
                      html: productSelector?.product?.data[1]?.description,
                    }}
                    contentWidth={dimens.w100}
                    //baseStyle={styles.descriptionText}
                  /> */}
                </View>

                <RoundedButtom
                  onPress={() => {
                    navigation.navigate(commonStackIdentifier.custom_webview, {
                      url: productSelector?.product?.data[1]?.product_url,
                      title: 'Product Details',
                    });
                    {
                      /* if (!!productSelector?.product?.data[1]?.product_url) {
                      Linking.canOpenURL(
                        productSelector?.product?.data[1]?.product_url,
                      ).then(supported => {
                        if (supported) {
                          Linking.openURL(
                            productSelector?.product?.data[1]?.product_url,
                          );
                        } else {
                          console.log(
                            "Don't know how to open URI: " +
                              productSelector?.product?.data[1]?.product_url,
                          );
                        }
                      });
                    } */
                    }
                  }}
                  title={'Explore Now'}
                  titleStyle={styles.titleStyle}
                  gradColors={[colors.deepmagenta, colors.deepmagenta]}
                  gradStyle={styles.gradeStyle}
                  container={styles.buttonContainer}
                />
              </View>
              <View style={{flex: 1}}>
                <View style={styles.imgContainer}>
                  {!!productData &&
                    productData.length > 0 &&
                    !!productData[1] &&
                    !!productData[1]?.product_image && (
                      <FastImage
                        source={{
                          uri: productData[1]?.product_image,
                        }}
                        //source={require('../assets/protien.png')}
                        style={styles.imgStyle}
                        resizeMode="contain"
                      />
                    )}
                </View>
              </View>
            </View>
          </>
        )
      )}
      <View style={{height: Platform.OS === 'ios' ? 20 : 50}} />
    </View>
  );
};

export default ExploreCard;
