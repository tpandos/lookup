import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//IMPORT ROUTES
import AuthStack from "./routes/auth";
import HomeStack from "./routes/home";
import FriendListStack from "./routes/friendlist";
import AuthLoading from "./scenes/auth/AuthLoading";
import AuthProvider from "./providers/auth";
import SearchStack from "./routes/search"; 
import AllowLocationStack from "./routes/allowlocation";


//APP ROUTES STACK
const AppStack = createSwitchNavigator(
    {
        Loading: AuthLoading,
        Auth: AuthStack,
        App: HomeStack,
        Search: SearchStack, 
        FriendList : FriendListStack,
        AllowLocation : AllowLocationStack
        
    },
    {initialRouteName: 'Loading'}
);

const Navigator = createAppContainer(AppStack);

export default function Router(props) {
    return (
        <AuthProvider>
            <Navigator/>
        </AuthProvider>
    );
}