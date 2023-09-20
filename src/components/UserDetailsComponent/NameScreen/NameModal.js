import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Keyboard,
  Pressable,
} from 'react-native';
import React, {useState, useEffect, forwardRef} from 'react';
import {TextinputComp} from '../../TextinputComp';
import useStyles from './NameModalStyle';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import RoundedButtom from '../../RoundedButtom';
import {
  editFirstName,
  editLastname,
} from '../../../commonSlices/editProfile.slice';
import _ from 'lodash';

const NameModal = forwardRef(
  ({visible, field, onClose, onSubmit, setSelectedField}, ref) => {
    const styles = useStyles();
    const {colors} = useTheme();
    const dispatch = useDispatch();
    const selector = useSelector(state => state.editProfileReducer);
    const myProfileSelector = useSelector(state => state.myProfileReducer);

    const [inputFields, setInputFields] = useState({
      firstName: selector.firstName,
      lastName: selector.lastName,
    });

    const handlePressOutside = () => {
      Keyboard.dismiss(); // Dismiss the keyboard when the user taps outside
    };

    // useEffect(() => {
    //   const timeoutId = setTimeout(() => {
    //     if (inputFields.firstName.trim() !== '') {
    //       dispatch(editFirstName(inputFields.firstName));
    //     }
    //     if (inputFields.lastName.trim() !== '') {
    //       dispatch(editLastname(inputFields.lastName));
    //     }
    //   }, 400);

    //   return () => clearTimeout(timeoutId);
    // }, [inputFields.firstName, inputFields.lastName]);

    const handleSubmit = () => {
      // onSubmit(field, inputValue)
      // onClose();

      if (inputFields.firstName.trim() !== '') {
        dispatch(editFirstName(inputFields.firstName));
      }
      if (inputFields.lastName.trim() !== '') {
        dispatch(editLastname(inputFields.lastName));
      }

      // ref.current.close();
      // setSelectedField('');
      onClose();
    };

    const handleInputChange = (fieldName, text) => {
      const updatedInputFields = {...inputFields};
      updatedInputFields[fieldName] = text;
      setInputFields(updatedInputFields);
    };

    // const onFirstNameChange = (text) => {
    //   dispatch(editFirstName(text));
    // };

    // const onLastNameChange = (text) => {
    //   dispatch(editLastname(text));
    // };

    return (
      <View style={{backgroundColor: colors.darkWhite}}>
        <Pressable onPress={handlePressOutside}>
          <Text style={styles.headerStyle}>Name</Text>
          <View style={styles.textInputContainer}>
            <Text style={styles.emailTitle}>First Name</Text>
            <TextinputComp
              placeholder={'First Name'}
              style={styles.textInputstyle}
              mode={'flat'}
              // onChangeText={text => onFirstNameChange(text)}
              onChangeText={text => handleInputChange('firstName', text)}
              value={inputFields.firstName}

              // error={selector.showPasswordErr}
              // errorMsg={selector.passwordErrMessage}
            />
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.emailTitle}>Last Name</Text>
            <TextinputComp
              placeholder={'Last Name'}
              style={styles.textInputstyle}
              mode={'flat'}
              // onChangeText={text => onLastNameChange(text)}
              onChangeText={text => handleInputChange('lastName', text)}
              value={inputFields.lastName}
              // error={selector.showPasswordErr}
              // errorMsg={selector.passwordErrMessage}
            />
          </View>
          <RoundedButtom
            onPress={() => {
              handleSubmit();
            }}
            title={'Save Changes'}
            titleStyle={styles.titleStyle}
            gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
            gradStyle={styles.gradeStyle}
            container={styles.rButtonContainer}
            //   isLinearGradiantApplied={false}
          />
        </Pressable>
      </View>
    );
  },
);

export default NameModal;

const styles = StyleSheet.create({});
