import React, {useState, useContext, useEffect} from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Component } from 'react'
import { FlatList,Keyboard, Image, ImageBackground, Linking, ScrollView, StyleSheet, Text, View, Animated} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable'
import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import Form, { TYPES } from 'react-native-basic-form';
import {ErrorText} from "../../components/Shared";
import { Button } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function SearchResults (props) {

const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
const {state, updateUser } = useAuth();
const [userData , setData] = useState({userData});
const scrollY = React.useRef(new Animated.Value(0)).current;
const ITEM_SIZE = 160;

    const {navigation} = props;
    const {navigate} = props.navigation;

    
    _retrieveData = async () => { 
    try {
      const response = await AsyncStorage.getItem('userResponse');
      if (response !== null) {
      const value = JSON.parse(response);
      //console.log("the SEARCH RESULTS ARE ================= " , value)
      setData(value)
      console.log(" userData.message IS ")
      console.log(userData.message)
    }
    }catch (error) {
      setError(error.message);
      }
  }
  
  

    useEffect(() => {
      _retrieveData()
    }, [])
  

    console.log("SearchResults")

    async function OnPress(data){
      const {navigation} = props;
      const {navigate} = props.navigation;
      
      //setLoading(true);
      
        try {
          const res = await api.SearchedProfileUSER(state.user._id, data);
          const resultedProfile = res.user;
          
          console.log('resultedProfile=======');
          console.log(resultedProfile)

          props.navigation.navigate('SearchedProfile', {userProfile : resultedProfile})

        }catch (error) {
          setError(error.message);
          setLoading(false)
      }
  }

if (userData.message == "Results by ranking"){
    return(
      <SafeAreaView style= {styles.container}>
        <TouchableOpacity
        style={{alignItems: 'center', backgroundColor: 'white', marginTop:2, marginLeft: 10, padding: 20, width: 400, marginHorizontal: 2, fontSize: 24}}
        onPress ={()=>{navigate('Search_')}}> 
        <Text Texstyle={{flex:1, color: '#37474f', padding:50, justifyContent: 'center', alignItems: 'center'}}> Back to Search </Text>
        </TouchableOpacity>
        

        <Animated.FlatList
         data = {userData.results}
         onScroll = {Animated.event(
           [{ nativeEvent : {contentOffset: {y : scrollY}}}],
           {useNativeDriver : true}
         )}
         keyExtractor = {(item, index) => index.toString()}
         //keyExtractor={item => item}
          renderItem = {
            ({item ,index}) => { 

              const inputRange = [
              -1, 
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 2) 
              ]

              const scale = scrollY.interpolate({
                inputRange,
                outputRange : [1 , 1 , 1, 0]
              })
              return <Animated.View
              style = {{ 
              shawdowColor: "#000",
              shadowOffset: {width: 0, height: 10},
              shadowOpacity : 0.3, 
              transform : [{scale}]
              }}>
          <TouchableOpacity
          onPress= {() => (OnPress(userData.results[index]._id))}
          //onPress= {() => {navigate('SearchedUserProfile', { userprofile : api.SearchedUserProfile(state.user._id, response[index]._id)})}}
          style={{flex : 1, flexDirection: "row", justifyContent: "space-between", backgroundColor: '#000033', marginTop:2, marginLeft: 10, padding: 20, width: 400, borderRadius: 30, marginHorizontal: 2, borderColor:'#fff', borderWidth: '2'}}>
          <Image source={{uri: userData.results[index].profileImage}} style={{width:100, height:100, borderRadius:30}}/>
          <Text style={{ textAlign: 'center', color: '#fff', fontSize: 22, fontWeight:"bold"}}> {item.username} </Text>
          <Text style={{ textAlign: 'right', color: '#fff', fontSize: 18}}> Ranking: {userData.results[index].ranking} </Text>
           </TouchableOpacity>
          </Animated.View>
           }}
        />  
      </SafeAreaView>
    )
    }
    else {
      return(
        <SafeAreaView style= {styles.container}>
          <TouchableOpacity
          style={{alignItems: 'center', backgroundColor: 'white', marginTop:2, marginLeft: 10, padding: 20, width: 400, marginHorizontal: 2, fontSize: 24}}
          onPress ={()=>{navigate('Search_')}}> 
          <Text Texstyle={{flex:1, color: '#37474f', padding:50, justifyContent: 'center', alignItems: 'center'}}> Back to Search </Text>
          </TouchableOpacity>
          
          <Animated.FlatList
         data = {userData.results}
         onScroll = {Animated.event(
           [{ nativeEvent : {contentOffset: {y : scrollY}}}],
           {useNativeDriver : true}
         )}
         keyExtractor = {(item, index) => index.toString()}
         //keyExtractor={item => item}
          renderItem = {
            ({item ,index}) => { 

              const inputRange = [
              -1, 
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 2) 
              ]

              const scale = scrollY.interpolate({
                inputRange,
                outputRange : [1 , 1 , 1, 0]
              })
              return <Animated.View
              style = {{ 
              shawdowColor: "#000",
              shadowOffset: {width: 0, height: 10},
              shadowOpacity : 0.3, 
              transform : [{scale}]
              }}>
            <TouchableOpacity
            onPress= {() => (OnPress(userData.results[index]._id))}
            
            style={{flex : 1, flexDirection: "row", justifyContent: "space-between", backgroundColor: '#AAB7B8', marginTop:2, marginLeft: 10, padding: 20, width: 400, borderRadius: 30, marginHorizontal: 2, borderColor:'#fff', borderWidth: '2'}}>
            <Image source={{uri: userData.results[index].profileImage}} style={{width:100, height:100, borderRadius:30}}/>
            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 22, fontWeight:"bold"}}> {item.username} </Text>
            <Text style={{ textAlign: 'right', color: '#fff', fontSize: 18}}> {userData.results[index].distance}m away </Text>
             </TouchableOpacity>
          </Animated.View>
            }}
          /> 
        </SafeAreaView>
      )
    }
}
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          backgroundColor: "#eaeaea"
        }
      })


      SearchResults.navigationOptions = ({}) => {
        return {
            title: `Search Results`
        }
    };
