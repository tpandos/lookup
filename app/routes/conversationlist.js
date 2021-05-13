import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import ConversationListScreen from "../scenes/home/ConversationList"; 
import HomeScreen from "../scenes/home/Home"; 


//header across all the scenes 
import {headerStyle, headerTitleStyle} from '../theme';

const ConversationListStack = createStackNavigator(
    {
        
        Home: HomeScreen,
        ConversationList: ConversationListScreen,
    },
    {
        initialRouteName:'ConversationList',
        defaultNavigationOptions:()=>({headerStyle, headerTitleStyle})
    }
     
);
export default ConversationListStack; 