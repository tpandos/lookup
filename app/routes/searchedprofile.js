import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import SearchResultsScreen from "../scenes/home/SearchResults"; 
import SearchProfileScreen from "../scenes/home/SearchedProfile"; 


//header across all the scenes 
import {headerStyle, headerTitleStyle} from '../theme';

const SearchedProfileStack = createStackNavigator(
    {
        
        SearchResults: SearchResultsScreen,
        SearchedProfile: SearchProfileScreen,
    },
    {
        initialRouteName:'SearchResults',
        defaultNavigationOptions:()=>({headerStyle, headerTitleStyle})
    }
     
);
  
export default SearchedProfileStack ;