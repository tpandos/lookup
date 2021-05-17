import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import NotificationScreen from "../scenes/home/Notifications"; 
import HomeScreen from "../scenes/home/Home"; 


//header across all the scenes 
import {headerStyle, headerTitleStyle} from '../theme';

const NotificationStack = createStackNavigator(
    {
        
        Home: HomeScreen,
        Notifications: NotificationScreen,
    },
    {
        initialRouteName:'Notifications',
        defaultNavigationOptions:()=>({headerStyle, headerTitleStyle})
    }
     
);
export default NotificationStack; 