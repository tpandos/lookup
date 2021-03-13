import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import FriendListScreen from "../scenes/home/FriendList"; 
import HomeScreen from "../scenes/home/Home"; 


//header across all the scenes 
import {headerStyle, headerTitleStyle} from '../theme';

const FriendListStack = createStackNavigator(
    {
        
        Home: HomeScreen,
        FriendList: FriendListScreen,
    },
    {
        initialRouteName:'FriendList',
        defaultNavigationOptions:()=>({headerStyle, headerTitleStyle})
    }
     
);
export default FriendListStack; 