import React, {useState, useContext} from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Component } from 'react'
import { FlatList,Keyboard, Image, ImageBackground, Linking, ScrollView, StyleSheet, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable'
import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import Form, { TYPES } from 'react-native-basic-form';
import {ErrorText} from "../../components/Shared";
import { Button } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
//import SearchScreen from "./Search"

export default function SearchResults (Array1, Array2) {
    // const {navigation} = props;
    // const {navigate} = props.navigation;

    //const { Usernames, ProfileImages } = route.params;
    //const Stack = createStackNavigator()
    
    const Usernames = [];
    for (let i = 0; i < Array1.length; i++) {
          Usernames.push(Array1[i])
            }
    console.log('Array1==========');    
    console.log(Array1);
    console.log(Usernames);


    const ProfileImages = [];
    for (let i = 0; i < Array2.length; i++) {
          ProfileImages.push(Array2[i])
        }
    console.log('Array2=======');    
    console.log(Array2);
    console.log(ProfileImages);


        

    return(
     

        <View style= {styles.container}>
        <View> {Usernames} </View>
       
      </View>
    )
}
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: "#eaeaea"
        }
      })