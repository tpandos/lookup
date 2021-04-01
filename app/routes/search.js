import {createStackNavigator} from 'react-navigation-stack';


import SearchScreen from "../scenes/home/Search"; 
import HomeScreen from "../scenes/home/Home"; 


//header across all the scenes 
import {headerStyle, headerTitleStyle} from '../theme';

const SearchStack = createStackNavigator(
    {
        
        Home: HomeScreen,
        Search: SearchScreen,
    },
    {
        initialRouteName:'Search',
        defaultNavigationOptions:()=>({headerStyle, headerTitleStyle})
    }
     
);

  
export default SearchStack; 