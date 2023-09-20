import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTheme} from '@react-navigation/native';
import {dimens} from '../../constants/dimens';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppThemeContext} from '../../../App';
import useStyles from './CardComponentStyle';

const CardComponent = ({
  item,
  isSelected,
  onItemClicked,
  showImage = false,
  isGrid,
}) => {
  // const {AppThemeName, updateAppTheme} = useContext(AppThemeContext);
  const {colors} = useTheme();
  const styles = useStyles();
  // const [localData, setLocaldata] = useState(
  //   AppThemeName == 'MyDefaultThemeDay' ? dataOrange : dataBlue,
  // );
  // const [theme, setTheme] = useState(
  //   AppThemeName == 'MyDefaultThemeDay' ? 'day' : 'night',
  // );

  return (
    <TouchableOpacity
      style={[
        isGrid ? styles.gridMainComponent : styles.cardMainComponent,
        {
          borderWidth: isGrid && isSelected ? 1 : 0,
          borderColor: isGrid && isSelected ? colors.deepcyan : '',
        },
      ]}
      onPress={() => onItemClicked(item)}>
      {!isGrid && (
        <MaterialCommunityIcons
          name={'checkbox-marked-circle'}
          size={dimens.h2}
          style={styles.checkIconStyle}
          color={isSelected ? colors.deepcyan : colors.uncheckedColor}
        />
      )}

      {!isGrid ? (
        showImage ? (
          <>
            <FastImage
              source={{uri: item?.icon_url || item?.image}}
              resizeMode={'contain'}
              style={isGrid ? styles.gridFastImageStyle : styles.fastImageStyle}
            />
            <Text
              style={isGrid ? styles.gridStyle : styles.cardTitleStyle}
              numberOfLines={2}
              ellipsizeMode="tail">
              {item?.name || item?.title}
            </Text>
          </>
        ) : (
          <>
            <Text
              style={[
                isGrid ? styles.gridStyle : styles.cardTitleStyle,
                {marginHorizontal: dimens.h2},
              ]}
              numberOfLines={2}
              ellipsizeMode="tail">
              {item?.name || item?.title}
            </Text>
          </>
        )
      ) : (
        <>
          <Text
            style={isGrid ? styles.gridStyle : styles.cardTitleStyle}
            numberOfLines={2}
            ellipsizeMode="tail">
            {item?.name || item?.title}
          </Text>

          <View style={{marginVertical: 7}}>
            <Text style={styles.gridSubTextStyle}>{item?.sub_title}</Text>
          </View>

          <FastImage
            source={{uri: item?.icon_url || item?.image}}
            resizeMode={'contain'}
            style={isGrid ? styles.gridFastImageStyle : styles.fastImageStyle}
          />
        </>
      )}
    </TouchableOpacity>
  );
};

export default CardComponent;
