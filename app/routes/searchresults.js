import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import SearchScreen from "../scenes/home/Search"; 
import SearchResultsScreen from "../scenes/home/SearchResults"; 


//header across all the scenes 
import {headerStyle, headerTitleStyle} from '../theme';

const SearchResultsStack = createStackNavigator(
    {
        
        Search: SearchScreen,
        SearchResults: SearchResultsScreen
    },
    {
       initialRouteName:'SearchResults',
        defaultNavigationOptions:()=>({headerStyle, headerTitleStyle})
    }
     
);
  
export default SearchResultsStack;
