import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

export const SimpleExample = () => {
  //#region state
  const [enablePanDownToClose, setEnablePanDownToClose] = useState(true);
  const [enableDismissOnClose, setEnableDismissOnClose] = useState(true);
  //#endregion

  // refs
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => [600, 300, 450], []);

  const sheetStyle = useMemo(
    () => ({
      ...styles.sheetContainer,
      shadowColor: '#000',
    }),
    ['#000'],
  );

  //#region callbacks
  const handleChange = useCallback((index: number) => {
    // eslint-disable-next-line no-console
    console.log('index', index);
  }, []);
  const handleDismiss = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('on dismiss');
  }, []);
  const handleDismissPress = useCallback(() => {
    bottomSheetRef.current!.dismiss();
  }, []);
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current!.close();
  }, []);
  const handleExpandPress = useCallback(() => {
    bottomSheetRef.current!.expand();
  }, []);
  const handleCollapsePress = useCallback(() => {
    bottomSheetRef.current!.collapse();
  }, []);
  const handlePresentPress = useCallback(() => {
    bottomSheetRef.current!.present();
  }, []);
  const handleEnablePanDownToClosePress = useCallback(() => {
    setEnablePanDownToClose(state => !state);
  }, []);
  const handleEnableDismissOnClosePress = useCallback(() => {
    setEnableDismissOnClose(state => !state);
  }, []);
  //#endregion

  // renders

  return (
    <View style={styles.container}>
      <Button title="Present Modal" onPress={handlePresentPress} />
      <Button title="Close" onPress={handleClosePress} />
      {/* <Button title="Dismiss Modal" onPress={handleDismissPress} />
      <Button title="Expand" onPress={handleExpandPress} />
      <Button title="Collapse" onPress={handleCollapsePress} />
      <Button title="Close" onPress={handleClosePress} />
      <Button
        title={`${
          enablePanDownToClose ? 'Disable' : 'Enable'
        } Pan Down To Close`}
        onPress={handleEnablePanDownToClosePress}
      />
      <Button
        title={`${
          enableDismissOnClose ? 'Disable' : 'Enable'
        } Dismiss On Close`}
        onPress={handleEnableDismissOnClosePress}
      /> */}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={enablePanDownToClose}
          enableDismissOnClose={enableDismissOnClose}
          onDismiss={handleDismiss}
          onChange={handleChange}
          style={sheetStyle}
          // handleComponent={renderHeaderHandle}
        >
          <Text>slknvnsdjknvjsdnvjnsjvsjdn</Text>
          <Text>slknvnsdjknvjsdnvjnsjvsjdn</Text>
          <Text>slknvnsdjknvjsdnvjnsjvsjdn</Text>
          <Text>slknvnsdjknvjsdnvjnsjvsjdn</Text>
          <Text>slknvnsdjknvjsdnvjnsjvsjdn</Text>

          <Text>slknvnsdjknvjsdnvjnsjvsjdn</Text>
          <Text>slknvnsdjknvjsdnvjnsjvsjdn</Text>

          <Text>slknvnsdjknvjsdnvjnsjvsjdn</Text>
          <Text>slknvnsdjknvjsdnvjnsjvsjdn</Text>
          <Text>slknvnsdjknvjsdnvjnsjvsjdn</Text>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 24,
    height: '100%',
  },
  sheetContainer: {
    backgroundColor: 'white',
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.75,
    shadowRadius: 16.0,

    elevation: 24,
  },
});

export default SimpleExample;
