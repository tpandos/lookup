import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import ConversationListScreen from "../scenes/home/ConversationList"; 
import ConversationBoxScreen from "../scenes/home/ConversationBox"; 


//header across all the scenes 
import {headerStyle, headerTitleStyle} from '../theme';

const ConversationBoxStack = createStackNavigator(
    {
        
        ConversationList: ConversationListScreen,
        ConversationBox: ConversationBoxScreen
    },
    
    {
        initialRouteName:'ConversationList',
        defaultNavigationOptions:()=>({headerStyle, headerTitleStyle})
    }
     
);
  
export default ConversationBoxStack;