import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {forwardRef, useState} from 'react';
import {TextinputComp} from '../../TextinputComp';
import useStyles from './EmailModalStyle';
import {useDispatch, useSelector} from 'react-redux';
import {dimens} from '../../../constants/dimens';
import {
  updateFirstName,
  updateLastname,
} from '../../../commonSlices/createpass.slice';
import {useTheme} from '@react-navigation/native';
import RoundedButtom from '../../RoundedButtom';
import {editEmail} from '../../../commonSlices/editProfile.slice';

const EmailModal = forwardRef(
  ({visible, field, onClose, onSubmit, setSelectedField}, ref) => {
    const styles = useStyles();
    const {colors} = useTheme();
    const dispatch = useDispatch();
    // const selector = useSelector(state => state.createpassReducer);
    const [inputValue, setInputValue] = useState('');
    const selector = useSelector(state => state.editProfileReducer);

    const handleSubmit = () => {
      // onSubmit(field, inputValue);
      onClose();
      // ref.current.close();
      // setSelectedField('');
    };

    return (
      <View style={{}}>
        <Text style={styles.headerStyle}>Email</Text>
        <View style={styles.textInputContainer}>
          <Text style={styles.emailTitle}>Email</Text>
          <TextinputComp
            placeholder={'Enter New Email'}
            style={styles.textInputstyle}
            mode={'flat'}
            onChangeText={text => dispatch(editEmail(text))}
            value={selector.email}
            // error={selector.showPasswordErr}
            // errorMsg={selector.passwordErrMessage}
          />
        </View>

        <RoundedButtom
          onPress={() => handleSubmit()}
          title={'Save Changes'}
          titleStyle={styles.titleStyle}
          gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
          gradStyle={styles.gradeStyle}
          container={styles.rButtonContainer}
          //   isLinearGradiantApplied={false}
        />
      </View>
    );
  },
);

export default EmailModal;

const styles = StyleSheet.create({});
