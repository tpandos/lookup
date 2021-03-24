import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import AllowLocationScreen from "../scenes/home/AllowLocation"; 
import HomeScreen from "../scenes/home/Home"; 
import UpdateProfileScreen from "../scenes/home/UpdateProfile";

//header across all the scenes 
import {headerStyle, headerTitleStyle} from '../theme';

const AllowLocationStack = createStackNavigator(
    {
        
        //Home: HomeScreen,
        UpdateProfile: UpdateProfileScreen,
        AllowLocation: AllowLocationScreen,
    },
    {
        initialRouteName:'AllowLocation',
        defaultNavigationOptions:()=>({headerStyle, headerTitleStyle})
    }
     
);
export default AllowLocationStack; 