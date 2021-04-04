import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';

//IMPORT ROUTES
import AuthStack from "./routes/auth";
import HomeStack from "./routes/home";
import FriendListStack from "./routes/friendlist";
import AuthLoading from "./scenes/auth/AuthLoading";
import AuthProvider from "./providers/auth";
import SearchStack from "./routes/search"; 
import AllowLocationStack from "./routes/allowlocation";
import SearchResultsStack from "./routes/searchresults"


//APP ROUTES STACK
const AppStack = createSwitchNavigator(
    {
        Loading: AuthLoading,
        Auth: AuthStack,
        App: HomeStack,
        Search: SearchStack, 
        FriendList : FriendListStack,
        AllowLocation : AllowLocationStack,
        SearchResults : SearchResultsStack
        
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