import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES: everything that's shown in the Home screen
import RegisterScreen from "../scenes/auth/Register";
import LoginScreen from "../scenes/auth/Login";
import UsernameScreen from "../scenes/auth/Username";
import ForgotPasswordScreen from "../scenes/auth/ForgotPassword";

//header across all the scenes 
import {headerStyle, headerTitleStyle} from '../theme'

//Create Routes
const AuthStack = createStackNavigator(
    {
        Register: RegisterScreen,
        Login: LoginScreen,
        Username: UsernameScreen,
        ForgotPassword: ForgotPasswordScreen
    },
    {
        initialRouteName: 'Login',
        defaultNavigationOptions: () => ({headerStyle, headerTitleStyle})
    }
);

export default AuthStack;