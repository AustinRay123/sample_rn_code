import {useRoute, useTheme} from '@react-navigation/native';
import React, {forwardRef} from 'react';
import {View, TouchableOpacity, Text, ScrollView} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {dimens} from '../../constants/dimens';
import NameModal from '../UserDetailsComponent/NameScreen/NameModal';
import SubscriptionScreen from '../UserDetailsComponent/SubscriptionScreen/SubscriptionScreen';
import EmailModal from '../UserDetailsComponent/EmailScreen/EmailModal';
import WeightModal from '../UserDetailsComponent/WeightScreen/WeightModal';
import AidModal from '../AidModal';
import Quiz1Modal from '../Quiz1Modal/Quiz1Modal';
import Quiz2Modal from '../Quiz2Modal/Quiz2Modal';
import Quiz3Modal from '../Quiz3Modal/Quiz3Modal';
import Quiz4Modal from '../Quiz4Modal/Quiz4Modal';
import NoticeModal from '../NoticeModal/NoticeModal';
import HealthModal from '../HealthModal/HealthModal';

const ReusableBottomSheet = forwardRef(
  (
    {
      contentIdentifier,
      data,
      isOpen,
      onClose,
      onButtonPress,
      setSelectedField,
      customHeight,
      openDuration,
      customContainerStyle,
      onSubmit,
      unit,
    },
    ref,
  ) => {
    const {colors} = useTheme();
    const route = useRoute();
    console.log('contentIdentifier--', contentIdentifier);

    const renderContent = () => {
      switch (contentIdentifier) {
        case 'name':
          return (
            <View>
              <NameModal
                ref={ref}
                onClose={onClose}
                field={contentIdentifier}
                data={data}
                setSelectedField={setSelectedField}
              />
            </View>
          );

        case 'subscription':
          return (
            <View>
              <SubscriptionScreen
                ref={ref}
                field={contentIdentifier}
                data={data}
                setSelectedField={setSelectedField}
              />
            </View>
          );

        case 'email':
          return (
            <View>
              <EmailModal
                ref={ref}
                data={data}
                visible={isOpen}
                field={contentIdentifier}
                // onClose={onClose}
                setSelectedField={setSelectedField}
              />
            </View>
          );
        case 'birthday':
          return (
            <View>
              <Text>birthday:</Text>
              <TouchableOpacity onPress={() => {}}>
                <Text>Submit</Text>
              </TouchableOpacity>
            </View>
          );
        case 'weight':
          return (
            <View>
              <WeightModal
                ref={ref}
                data={data}
                visible={isOpen}
                field={contentIdentifier}
                // onClose={onClose}
                setSelectedField={setSelectedField}
              />
            </View>
          );
        case 'aidModal':
          return (
            <View>
              <AidModal
                ref={ref}
                visible={isOpen}
                field={contentIdentifier}
                onClose={onClose}
                // data={objectForAid}
                setSelectedField={setSelectedField}
              />
            </View>
          );
        case 'quiz1Modal':
          return (
            <View>
              <Quiz1Modal
                ref={ref}
                visible={isOpen}
                field={contentIdentifier}
                onClose={onClose}
                onSubmit={onSubmit}
                setSelectedField={setSelectedField}
              />
            </View>
          );
        case 'quiz2Modal':
          return (
            <View>
              <Quiz2Modal
                ref={ref}
                visible={isOpen}
                field={contentIdentifier}
                onClose={onClose}
                onSubmit={onSubmit}
                setSelectedField={setSelectedField}
              />
            </View>
          );
        case 'quiz3Modal':
          return (
            <View>
              <Quiz3Modal
                ref={ref}
                visible={isOpen}
                field={contentIdentifier}
                onClose={onClose}
                onSubmit={onSubmit}
                setSelectedField={setSelectedField}
              />
            </View>
          );
        case 'quiz4Modal':
          return (
            <View>
              <Quiz4Modal
                ref={ref}
                visible={isOpen}
                field={contentIdentifier}
                onClose={onClose}
                onSubmit={onSubmit}
                setSelectedField={setSelectedField}
              />
            </View>
          );
        case 'notice':
          return (
            <View>
              <NoticeModal
                ref={ref}
                visible={isOpen}
                field={contentIdentifier}
                onClose={onClose}
                setSelectedField={setSelectedField}
              />
            </View>
          );
        case 'health':
          return (
            <View>
              <HealthModal
                ref={ref}
                visible={isOpen}
                field={contentIdentifier}
                onClose={onClose}
                setSelectedField={setSelectedField}
                unit={unit}
              />
            </View>
          );

        // Add more cases for other content components as needed
        default:
          return null;
      }
    };

    let bottomSheetHeight =
      route.name === 'PROFILE'
        ? contentIdentifier === 'subscription'
          ? dimens.h80
          : dimens.h60
        : customHeight;

    let bottomSheetDuration = route.name === 'PROFILE' ? 800 : 600;

    return (
      <View style={{}}>
        {/* <Button title="Open Bottom Sheet" onPress={() => ref.current.open()} /> */}

        <RBSheet
          ref={ref}
          isOpen={isOpen}
          onClose={onClose}
          // animationType="slide"
          height={bottomSheetHeight}
          closeOnDragDown={true}
          openDuration={bottomSheetDuration}
          closeDuration={200}
          customStyles={{
            container: {
              borderTopRightRadius: route.name === 'PROFILE' ? 20 : 0,
              borderTopLeftRadius: route.name === 'PROFILE' ? 20 : 0,
              backgroundColor: colors.darkWhite,
              padding: 20,
              paddingVertical: 40,
              paddingTop: 10,
              // height:
              //   contentIdentifier === 'subscription' ? dimens.h80 : dimens.h60,
            },
            // wrapper: {
            //   // backgroundColor: 'transparent',
            //   elevation: 1,
            //   shadowOffset: {
            //     width: 0,
            //     height: 12,
            //   },
            //   shadowOpacity: 0.75,
            //   shadowRadius: 16.0,
            // },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          {renderContent()}
        </RBSheet>
      </View>
    );
  },
);

export default ReusableBottomSheet;

// import React, {useRef} from 'react';
// import {View, Button, Text} from 'react-native';
// import BottomSheet, {useBottomSheetSpringConfigs} from '@gorhom/bottom-sheet';
// import {useTheme} from '@react-navigation/native';

// const ReusableBottomSheet = ({
//   data,
//   isVisible,
//   onClose,
//   selectedComponent,
//   setSelectedComponent,
// }) => {
//   const bottomSheetRef = useRef(null);

//   const {colors} = useTheme();

//   const animationConfigs = useBottomSheetSpringConfigs({
//     damping: 80,
//     overshootClamping: true,
//     restDisplacementThreshold: 0.1,
//     restSpeedThreshold: 0.1,
//     stiffness: 500,
//   });

// const renderContent = () => {
//   switch (selectedComponent) {
//     case 'name':
//       return (
//         <View>
//           <NameModal
//             // ref={ref}
//             onClose={() => bottomSheetRef.current?.close()}
//             field={selectedComponent}
//             data={data}
//             setSelectedComponent={setSelectedComponent}
//           />
//           {/* <Button
//               title="Close"
//               onPress={() => bottomSheetRef.current?.close()}
//             /> */}
//         </View>
//       );

//     case 'subscription':
//       return (
//         <View>
//           <SubscriptionScreen
//             ref={ref}
//             field={contentIdentifier}
//             data={data}
//             setSelectedField={setSelectedField}
//           />
//         </View>
//       );

//     case 'email':
//       return (
//         <View>
//           <EmailModal
//             // ref={ref}
//             data={data}
//             // visible={isOpen}
//             field={selectedComponent}
//             onClose={() => bottomSheetRef.current?.close()}
//             // setSelectedField={setSelectedField}
//             setSelectedComponent={setSelectedComponent}
//           />
//         </View>
//       );
//     case 'birthday':
//       return (
//         <View>
//           <Text>birthday:</Text>
//           <TouchableOpacity onPress={() => {}}>
//             <Text>Submit</Text>
//           </TouchableOpacity>
//         </View>
//       );
//     case 'weight':
//       return (
//         <View>
//           <WeightModal
//             ref={ref}
//             data={data}
//             visible={isOpen}
//             field={contentIdentifier}
//             // onClose={onClose}
//             setSelectedField={setSelectedField}
//           />
//         </View>
//       );
//     case 'aidModal':
//       return (
//         <View>
//           <AidModal
//             ref={ref}
//             visible={isOpen}
//             field={contentIdentifier}
//             onClose={onClose}
//             // data={objectForAid}
//             setSelectedField={setSelectedField}
//           />
//         </View>
//       );
//     case 'quiz1Modal':
//       return (
//         <View>
//           <Quiz1Modal
//             ref={ref}
//             visible={isOpen}
//             field={contentIdentifier}
//             onClose={onClose}
//             onSubmit={onSubmit}
//             setSelectedField={setSelectedField}
//           />
//         </View>
//       );
//     case 'quiz2Modal':
//       return (
//         <View>
//           <Quiz2Modal
//             ref={ref}
//             visible={isOpen}
//             field={contentIdentifier}
//             onClose={onClose}
//             onSubmit={onSubmit}
//             setSelectedField={setSelectedField}
//           />
//         </View>
//       );
//     case 'quiz3Modal':
//       return (
//         <View>
//           <Quiz3Modal
//             ref={ref}
//             visible={isOpen}
//             field={contentIdentifier}
//             onClose={onClose}
//             // onSubmit={onSubmit}
//             setSelectedField={setSelectedField}
//           />
//         </View>
//       );
//     case 'quiz4Modal':
//       return (
//         <View>
//           <Quiz4Modal
//             ref={ref}
//             visible={isOpen}
//             field={contentIdentifier}
//             onClose={onClose}
//             // onSubmit={onSubmit}
//             setSelectedField={setSelectedField}
//           />
//         </View>
//       );
//     case 'notice':
//       return (
//         <View>
//           <NoticeModal
//             ref={ref}
//             visible={isOpen}
//             field={contentIdentifier}
//             onClose={onClose}
//             setSelectedField={setSelectedField}
//           />
//         </View>
//       );
//     case 'health':
//       return (
//         <View>
//           <HealthModal
//             ref={ref}
//             visible={isOpen}
//             field={contentIdentifier}
//             onClose={onClose}
//             setSelectedField={setSelectedField}
//           />
//         </View>
//       );

//     // Add more cases for other content components as needed
//     default:
//       return null;
//   }
// };

//   // console.log('isVisible---', isVisible);

//   return (
//     <BottomSheet
//       enableOverDrag={true}
//       ref={bottomSheetRef}
//       index={isVisible ? 0 : -1}
//       snapPoints={[700, 100]} // Define your snap points as needed
//       // animationConfigs={animationConfigs}
//       enableDynamicSizing={false}
//       enablePanDownToClose={true}
//       animateOnMount={true}
//       style={{padding: 30}}
//       // handleStyle={{backgroundColor: 'red'}}
//       // handleIndicatorStyle={{backgroundColor: 'red'}}
//       backgroundStyle={{backgroundColor: colors.darkWhite}}
//       containerStyle={{
//         backgroundColor: isVisible ? '#272727' : 'transparent',
//         // opacity: isVisible ? 0.8 : 1,
//       }}
//       onChange={index => {
//         if (index === -1) {
//           onClose();
//         }
//       }}>
//       <View style={{backgroundColor: 'white', paddingBottom: 16}}>
//         {renderContent()}
//       </View>
//     </BottomSheet>
//   );
// };

// export default ReusableBottomSheet;

// import {View, Text, TouchableOpacity, FlatList} from 'react-native';
// import React, {useEffect, useRef} from 'react';

// import PropTypes from 'prop-types';

// import BottomSheetModal, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
// import {Portal} from '@gorhom/portal';
// import NameModal from '../UserDetailsComponent/NameScreen/NameModal';
// import SubscriptionScreen from '../UserDetailsComponent/SubscriptionScreen/SubscriptionScreen';
// import EmailModal from '../UserDetailsComponent/EmailScreen/EmailModal';
// import WeightModal from '../UserDetailsComponent/WeightScreen/WeightModal';
// import {useTheme} from '@react-navigation/native';
// import {dimens} from '../../constants/dimens';

// const ReusableBottomSheet = ({
//   // hideCallback,
//   // data,
//   // closeCallback,
//   // refScreen,
//   // selectedField,
//   // onClose,
//   isVisible,
//   onClose,
//   selectedComponent,
//   setSelectedField,
//   data,
//   setIsVisible,
// }) => {
//   const bottomRef = useRef(null);
//   const {colors} = useTheme();
//   const snapPoints = React.useMemo(() => [700, 300, 410], []);
//   function goBack() {
//     bottomRef?.current?.close();
//     setTimeout(() => {
//       onClose();
//     }, 0);
//   }

//   const [dargDown, setDragDown] = React.useState(false);

//   const closeBottomSheet = () => {
//     bottomRef.current?.close();
//     setIsVisible(false);
//   };

//   const renderContent = () => {
//     switch (selectedComponent) {
//       case 'name':
//         return (
//           <View>
//             <NameModal
//               // ref={ref}
//               onClose={() => closeBottomSheet()}
//               field={selectedComponent}
//               data={data}
//               // setSelectedComponent={setSelectedComponent}
//             />
//             {/* <Button
//                 title="Close"
//                 onPress={() => bottomSheetRef.current?.close()}
//               /> */}
//           </View>
//         );

//       case 'subscription':
//         return (
//           <View style={{}}>
//             <SubscriptionScreen
//               // ref={ref}
//               // field={contentIdentifier}
//               onClose={() => closeBottomSheet()}
//               data={data}
//               setSelectedField={setSelectedField}
//             />
//           </View>
//         );

//       case 'email':
//         return (
//           <View>
//             <EmailModal
//               // ref={ref}
//               data={data}
//               // visible={isOpen}
//               field={selectedComponent}
//               onClose={() => closeBottomSheet()}
//               // setSelectedField={setSelectedField}
//               // setSelectedComponent={setSelectedComponent}
//             />
//           </View>
//         );
//       case 'birthday':
//         return (
//           <View>
//             <Text>birthday:</Text>
//             <TouchableOpacity onPress={() => {}}>
//               <Text>Submit</Text>
//             </TouchableOpacity>
//           </View>
//         );
//       case 'weight':
//         return (
//           <View>
//             <WeightModal
//               // ref={ref}
//               data={data}
//               // visible={isOpen}
//               // field={contentIdentifier}
//               field={selectedComponent}
//               onClose={() => closeBottomSheet()}
//               // onClose={onClose}
//               // setSelectedField={setSelectedField}
//             />
//           </View>
//         );

//       // Add more cases for other content components as needed
//       default:
//         return null;
//     }
//   };

//   return (
//     // <Portal>
//     <BottomSheetModal
//       ref={bottomRef}
//       style={{padding: dimens.h3}}
//       containerStyle={{}}
//       backgroundStyle={{backgroundColor: colors.darkWhite}}
//       snapPoints={snapPoints}
//       handleIndicatorStyle={{display: 'none'}}
//       // enableDynamicSizing={dargDown}
//       // enablePanDownToClose={true}
//       animateOnMount={true}
//       backdropComponent={backdropProps => (
//         <BottomSheetBackdrop
//           {...backdropProps}
//           pressBehavior={'collapse'}
//           onPress={() => goBack()}
//           style={{
//             backgroundColor: colors.black,
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//           }}
//           opacity={0.5}
//           appearsOnIndex={0}
//           disappearsOnIndex={-1}
//         />
//       )}>
//       {/* <View style={[styles.popupMenu]}> */}
//       {renderContent()}
//       {/* <View style={{backgroundColor: 'red', height: 100}}></View> */}
//       {/* </View> */}
//     </BottomSheetModal>
//     // </Portal>
//   );
// };

// ReusableBottomSheet.propTypes = {
//   hideCallback: PropTypes.func,
//   refScreen: PropTypes.string,
// };

// export default ReusableBottomSheet;
