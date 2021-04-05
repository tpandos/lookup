import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import ResultScreen from "../scenes/home/Result"; 
import HomeScreen from "../scenes/home/Home"; 


//header across all the scenes 
import {headerStyle, headerTitleStyle} from '../theme';

const ResultStack = createStackNavigator(
    {
        
        Home: HomeScreen,
        Result: ResultScreen,
    },
    {
        initialRouteName:'Result',
        defaultNavigationOptions:()=>({headerStyle, headerTitleStyle})
    }
     
);
export default ResultStack; 