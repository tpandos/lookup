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
import SearchScreen from "./Search"

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
        <Text Texstyle={{flex:1, padding:50}}> Search Results </Text>
        <FlatList
         data = {Array1}
          renderItem = {
            ({item}) => 
          //<TouchableOpacity
          //style={{backgroundColor: '#37474f', marginTop:2, marginLeft: 10, padding: 200, width: 150, borderRadius: 30, marginHorizontal: 2, borderColor:'#fff', borderWidth: '2'}}>
          <Text> {item} </Text>
          //</TouchableOpacity>
          }
        /> 
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
