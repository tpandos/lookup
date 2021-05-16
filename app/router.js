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
import ConversationListStack from "./routes/conversationlist";
import ConversationBoxStack from "./routes/conversationbox";


//APP ROUTES STACK
const AppStack = createSwitchNavigator(
    {
        Loading: AuthLoading,
        Auth: AuthStack,
        App: HomeStack,
        Search_: SearchStack,                    
        FriendList : FriendListStack,
        AllowLocation : AllowLocationStack,
        Search_Results : SearchResultsStack,
        SearchedUserProfile: SearchedProfileStack,
        Notifications : NotificationStack,
        ConversationList: ConversationListStack,
        ConversationBox: ConversationBoxStack,

        
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