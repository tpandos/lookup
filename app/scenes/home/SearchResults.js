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

export default function SearchResults (props) {
    const {navigation} = props;
    const {navigate} = props.navigation;

  //   const user_name = props.navigation.getParam('Usernames', "Not Matched");
  //   const profile_image = props.navigation.getParam('ProfileImages', "Default Photo");
  //  const rank = props.navigation.getParam('Ranking', "No Rank");

    const user_name = props.navigation.getParam('Usernames');
    const profile_image = props.navigation.getParam('ProfileImages');
    const rank = props.navigation.getParam('Ranking');

    
    //console.log(rank)

    //console.log("Usernames")
    //let name = JSON.stringify(user_name)

    //const Stack = createStackNavigator()
    
    // const Usernames = [];
    // for (let i = 0; i < Array1.length; i++) {
    //       Usernames.push(Array1[i])
    //         }
    // console.log('Usernames');    
    // //console.log(Array1);
    // console.log(Usernames);


    // const ProfileImages = [];
    // for (let i = 0; i < Array2.length; i++) {
    //       ProfileImages.push(Array2[i])
    //     }
    // console.log('ProfilesImages');    
    // //console.log(Array2);
    // console.log(ProfileImages);



        
    return(

        <View style= {styles.container}>
        <TouchableOpacity
            style={{alignItems: 'center', backgroundColor: 'white', marginTop:2, marginLeft: 10, padding: 20, width: 200, borderRadius: 30, marginHorizontal: 2, borderColor:'#37474f', borderWidth: '2'}}
          onPress ={()=>{navigate('Search')}}> 
        <Text Texstyle={{flex:1, color: '#37474f', padding:50, justifyContent: 'center', alignItems: 'center'}}> Back to Search </Text>
        </TouchableOpacity>
        

        <FlatList
         data = {user_name}
         extraData = {rank}
         keyExtractor = {(item,index) => index.toString()}
          renderItem = {
            ({item , index}) => 
          <TouchableOpacity
          style={{flex : 1, backgroundColor: '#37474f', marginTop:2, marginLeft: 10, padding: 20, width: 400, borderRadius: 30, marginHorizontal: 2, borderColor:'#fff', borderWidth: '2'}}>
          <Text style={{ textAlign: 'left', color: '#fff', fontSize: 18}}> {item} {'\n'} Ranking:  {rank[index]} </Text>
         
          </TouchableOpacity>
         
        
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
