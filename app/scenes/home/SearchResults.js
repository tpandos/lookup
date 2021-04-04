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
    const {navigate} = props.navigation;
    //const data = api.search();

    return(
        <View style= {styles.container}>
            <Text Texstyle={{flex:1, padding:50}}> Search Results </Text>
            <TouchableOpacity onPress={()=>{navigate('Search')}}>
            <Text >
                Touch to go back to Search
            </Text>
          </TouchableOpacity>
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
