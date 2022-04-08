import React, {useState} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Home from '../screens/Home';
import {Easing} from 'react-native';
import MyPlates from '../screens/RegisteredUserScreens/MyPlates';
import MyProfile from '../screens/RegisteredUserScreens/MyProfile';
import MyPassActivitySummary from '../screens/RegisteredUserScreens/MyPassActivitySummary';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../screens/Login';
import MyPasses from '../screens/RegisteredUserScreens/MyPasses';
import LoginLoader from '../components/Login/LoginLoader';
import Registration from '../screens/Registration';
import NotificationsView from '../screens/RegisteredUserScreens/NotificationsView';
import NotificationProvider from '../AuthContextProvider/NotificationContext';
import PlatesProvider from '../AuthContextProvider/PlatesContext';
import PassInquiryResults from '../screens/RegisteredUserScreens/PassInquiryResults';
import PassProvider from '../AuthContextProvider/PassContext';
import Intro from '../screens/Intro';
import ProfileInfo from '../screens/RegisteredUserScreens/ProfileInfo';
import Permissions from '../screens/RegisteredUserScreens/Permissions';
import Logout from '../screens/RegisteredUserScreens/Logout';
import ProfileContextProvider from '../AuthContextProvider/ProfileContext';
import RegisterFormContextProvider from '../AuthContextProvider/RegisterFormContext';
import FAQ from '../screens/RegisteredUserScreens/FAQ';
import ContactUs from '../screens/RegisteredUserScreens/ContactUs';
import SearchContextProvider from '../AuthContextProvider/SearchContext';
import Map from '../screens/Map';

const Stack = createStackNavigator();
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overShootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 200,
    easing: Easing.linear,
  },
};

function StackNavigator() {
  const [isLoggedin, setIsLogedin] = React.useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  AsyncStorage.getItem('access_token').then(data => {
    // console.log("\nddjjd:\n",data)
    if (data != null && typeof data == 'string') {
      setIsLogedin(true);
    } else setIsLogedin(false);
  });

  if (isFirstLaunch) {
    <Stack.Screen
      name="welcome"
      options={{headerShown: false}}
      component={Intro}
    />;

    {
      isLoggedin ? (
        <Stack.Screen
          options={{headerShown: false}}
          name="HomeAuth"
          component={AuthStackScreen}
        />
      ) : (
        <Stack.Screen
          options={{headerShown: false}}
          name="HomeGuest"
          component={StackScreen}
        />
      );
    }
  }

  return (
    <Stack.Navigator>
      {isLoggedin ? (
        <Stack.Screen
          options={{headerShown: false}}
          name="HomeAuth"
          component={AuthStackScreen}
        />
      ) : (
        <Stack.Screen
          options={{headerShown: false}}
          name="HomeGuest"
          component={StackScreen}
        />
      )}
      <Stack.Screen
        name="Harita"
        options={{headerShown: false}}
        component={Map}
      />
    </Stack.Navigator>
  );
}

const StackScreen = () => (
  <RegisterFormContextProvider>
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        options={{headerShown: false}}
        component={Home}
      />
      <Stack.Screen
        name="Login"
        options={{headerShown: false}}
        component={Login}
      />
      <Stack.Screen
        name="LoginLoader"
        options={{headerShown: false}}
        component={LoginLoader}
      />
      <Stack.Screen
        name="Sign Up"
        options={{headerShown: false}}
        component={Registration}
      />
      <Stack.Screen
        name="Passes"
        options={{headerShown: false}}
        component={Login}
      />
    </Stack.Navigator>
  </RegisterFormContextProvider>
);

const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <NotificationProvider>
    <PassProvider>
      <PlatesProvider>
        <AuthStack.Navigator>
          <AuthStack.Screen
            name="HomeScreenAuth"
            options={{headerShown: false}}
            component={Home}
          />
          <AuthStack.Screen
            name="Notifications"
            options={{
              headerShown: false,
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              transitionSpec: {
                open: config,
                close: closeConfig,
              },
              cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
            }}
            component={NotificationsView}
          />

          <AuthStack.Screen
            name="Passes"
            options={{headerShown: false}}
            component={MyPasses}
          />
          <AuthStack.Screen
            name="Logout"
            options={{headerShown: false}}
            component={Logout}
          />

          <AuthStack.Screen
            name="PassResults"
            options={{headerShown: false}}
            component={PassInquiryResults}></AuthStack.Screen>
        </AuthStack.Navigator>
      </PlatesProvider>
    </PassProvider>
  </NotificationProvider>
);

const MyVehiclesNavigator = () => (
  <PlatesProvider>
    <PassProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="MyVehiclesScreen"
          options={{headerShown: false}}
          component={MyPlates}
        />
      </Stack.Navigator>
    </PassProvider>
  </PlatesProvider>
);

const MyProfileNavigator = () => (
  <ProfileContextProvider>
    <SearchContextProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="MyProfileScreen"
          options={{headerShown: false}}
          component={MyProfile}
        />
        <Stack.Screen
          name="EditProfile"
          options={{headerShown: false}}
          component={ProfileInfo}
        />
        <Stack.Screen
          name="Permissions"
          options={{headerShown: false}}
          component={Permissions}
        />
        <Stack.Screen
          name="Sıkça Sorulan Sorular"
          options={{headerShown: false}}
          component={FAQ}
        />
        <Stack.Screen
          name="Bize Ulaşın"
          options={{headerShown: false}}
          component={ContactUs}
        />
      </Stack.Navigator>
    </SearchContextProvider>
  </ProfileContextProvider>
);

const MyPassSummaryNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Geçişlerim"
      options={{headerShown: false}}
      component={MyPassActivitySummary}
    />
  </Stack.Navigator>
);

export {
  StackNavigator,
  MyPassSummaryNavigator,
  MyProfileNavigator,
  MyVehiclesNavigator,
};
