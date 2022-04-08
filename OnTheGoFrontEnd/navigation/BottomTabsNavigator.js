import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  StackNavigator,
  MyPassSummaryNavigator,
  MyProfileNavigator,
  MyVehiclesNavigator,
} from './StackNavigator';
import TabIcon from '../components/TabIcon';
import Login from '../screens/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

export default function BottomTabsNavigator() {
  const [isLoggedin, setIsLogedin] = React.useState(false);

  AsyncStorage.getItem('access_token').then(data => {
    //console.log(data)
    if (data != null && typeof data == 'string') setIsLogedin(true);
    else setIsLogedin(false);
  });
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: [{display: 'flex'}, null],
      }}>
      <Tab.Screen
        name="Home"
        component={StackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} iconName={'home'} />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="Vehicles"
        component={isLoggedin ? MyVehiclesNavigator : Login}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} iconName={'car'} />
          ),
        }}
      />
      <Tab.Screen
        name="Summary"
        component={isLoggedin ? MyPassSummaryNavigator : Login}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} iconName={'book'} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={isLoggedin ? MyProfileNavigator : Login}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} iconName={'user'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
