const DEEP_LINK_PATHS = {
  Home: 'home',
  Details: 'details',
  Profile: 'profile',
  Auth: 'auth',
  // Add more screens here
};

export default DEEP_LINK_PATHS;

/* 

import DEEP_LINK_PATHS from './DeepLinkPaths';
import generateDeepLink from './DeepLinkUtils';
import { NavigationContainer, useLinking } from '@react-navigation/native';

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();
  const ref = React.useRef();

  const { getInitialState } = useLinking(ref, {
    prefixes: ['yourapp://app'],
    config: DEEP_LINK_PATHS,
  });

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await getInitialState();
        if (initialUrl !== null) {
          // Parse the initialUrl and navigate to the corresponding screen
          const urlParts = initialUrl.split('/');
          const screenName = urlParts[urlParts.length - 1];
          if (screenName === DEEP_LINK_PATHS.Auth) {
            // Navigate to the Auth screen
          } else if (screenName === DEEP_LINK_PATHS.Home) {
            // Navigate to the Home screen
          } else if (screenName === DEEP_LINK_PATHS.Details) {
            // Navigate to the Details screen
          } else if (screenName === DEEP_LINK_PATHS.Profile) {
            // Navigate to the Profile screen
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  return (
    <NavigationContainer ref={ref} initialState={initialState}>
      <Stack.Navigator>
        <Stack.Screen name={DEEP_LINK_PATHS.Auth} component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
*/
