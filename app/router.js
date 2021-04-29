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
import SearchedProfileStack from "./routes/searchedprofile"
import NotificationStack from "./routes/notifications";


//APP ROUTES STACK
const AppStack = createSwitchNavigator(
    {
        Loading: AuthLoading,
        Auth: AuthStack,
        App: HomeStack,
        Searchh: SearchStack,                    // stack name different than navigation screen
        FriendList : FriendListStack,
        AllowLocation : AllowLocationStack,
        SearchResultss : SearchResultsStack,
        SearchedUserProfile: SearchedProfileStack, // stack name different than
        Notifications : NotificationStack

        
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