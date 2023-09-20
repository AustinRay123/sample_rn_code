import {commonStackIdentifier} from '../../App';

export const handleBackPress = routeName => {
  // Your logic to determine whether to allow the back action
  if (
    routeName === commonStackIdentifier.create_profile ||
    routeName === commonStackIdentifier.intro_slider ||
    routeName === commonStackIdentifier.home_bottom_tabs ||
    routeName === commonStackIdentifier.choose_your_goal ||
    routeName === commonStackIdentifier.choose_a_fast
  ) {
    return true; // Prevent back action
  } else {
    return false; // Allow back action
  }
};
