import React, {useState, useContext,SetStateAction, useEffect} from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Component } from 'react'
import { FlatList,Keyboard, Image, ImageBackground, SafeAreaView, ActivityIndicator, ScrollView, StyleSheet, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import SearchResults from "./SearchResults"
import * as Animatable from 'react-native-animatable'
import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import Form, { TYPES } from 'react-native-basic-form';
import {ErrorText} from "../../components/Shared";
import { Button } from 'react-native';



//const ListItems = ['C++', 'Js', 'Bussiness', 'IOS development']

export default function Search (props) {
  const {navigation} = props;
  const {navigate} = props.navigation;

const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
const {state, updateUser } = useAuth();
const [res, setData] = useState([])


const options = [
  {label:"Ranking", value: 'ranking'},
  {label:"Distance", value: 'distance'}
];
const fields = [
  { name: 'keyword', 
    label: 'Search a Keyword', 
    required: true
  }, 

{
  type: TYPES.Dropdown, 
  name: 'method', 
  label: 'Filter method',
  options: options, 
  mode: 'dialog',
  required: true}]

  //const initialData = {"method" : 1};
  
   async function onSubmit (data) {
    //useEffect (async () => {
    const {navigation} = props;
    const {navigate} = props.navigation;
    setLoading(true);
    
      
      try {
        let response = await api.search(state.user._id, data);
        console.log('response');
        console.log(response)
        console.log(response.results.length)
        //updateUser(response.user);
        setLoading(false);
        
        const UsernameArray = response.results.map((item) => {
          return item.username
        }); 
        console.log(UsernameArray.length);
        console.log(UsernameArray);

        const ProfileImageArray = response.results.map((item) => {
          return item.profileImage
        }); 
        console.log(ProfileImageArray.length);
        console.log(ProfileImageArray);
        
        SearchResults (UsernameArray, ProfileImageArray)
        navigate('SearchResults')

    } 
    catch (error) {
        setError(error.message);
        setLoading(false)
    }
  }

        
  return(
  <View>
    <ScrollView>
    <View style= {styles.container}>
        <View style={{flex:1, padding:50}}>
            <ErrorText error={error}/>
            <Animatable.View animation = "slideInRight" duration= {1000} style= {{width: 380, height: 350, backgroundColor: 'white', 
            flexDirection:'row', padding: 5, alignItems: 'center', paddingRight:5, borderRadius: 1}}>
              <Animatable.View animation = "fadeInLeft" duration = {400}> 
              </Animatable.View>
              <Form
                fields={fields}
                title={'Search'}
                loading={loading}
                initialData={state.user}
                error={error}
                onSubmit={onSubmit}/>
            </Animatable.View>
            <TouchableOpacity
            style={{backgroundColor: '#6D25BE', alignItems: 'center',  marginTop:2, marginLeft: 2, padding: 10, width: 150, borderRadius: 30, borderColor:'#fff', borderWidth: '2'}}
            onPress={()=>{navigate('Home')}}> 
            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 15}}>Back to Home</Text>
            </TouchableOpacity>
            
        </View>
    </View>
   </ScrollView>
 </View>

        
    )
  }
            /*<FlatList 
                    res = {ListItems}
                    keyExtractor = {(item,index) => index.toString()}
                    renderItem = {({item} ) => 
                    <TouchableOpacity
                    style={{backgroundColor: '#37474f', marginTop:2, marginLeft: 10, padding: 200, width: 150, borderRadius: 30, marginHorizontal: 2, borderColor:'#fff', borderWidth: '2'}}>
                    <Text style={{ textAlign: 'left', color: '#fff', fodntSize: 18}}> {item}</Text>
                    </TouchableOpacity>
                    }
                  />*/
                  /*<View style= {styles.container}>
                  <View style={{flex:1, padding:50}}>
                      <ErrorText error={error}/>
                      <Animatable.View animation = "slideInRight" duration= {1000} style= {{width: 380, height: 250, backgroundColor: 'white', 
                      flexDirection:'row', padding: 5, alignItems: 'center', paddingRight:5, borderRadius: 1}}>
                        <Animatable.View animation = "fadeInLeft" duration = {400}> 
                        </Animatable.View>
                        <Form
                          fields={fields}
                          title={'Submit'}
                          loading={loading}
                          initialData={state.user}
                          error={error}
                          onSubmit={onSubmit}/>
                      </Animatable.View>
                      <View>
                      <FlatList 
                              respo = {res}
                              keyExtractor = {(item,index) => index.toString()}
                              renderItem = {({item} ) => 
                              <TouchableOpacity
                              style={{backgroundColor: '#37474f', marginTop:2, marginLeft: 10, padding: 200, width: 150, borderRadius: 30, marginHorizontal: 2, borderColor:'#fff', borderWidth: '2'}}
                              onPress= {() => navigation.navigate('SearchResults', item)}
                              >
                              <Text style={{ textAlign: 'left', color: '#fff', fodntSize: 18}}> {item}</Text>
                              
                              </TouchableOpacity>
                              }
                            />
                        </View>
                      <TouchableOpacity
                      style={{backgroundColor: '#6D25BE', alignItems: 'center',  marginTop:2, marginLeft: 2, padding: 10, width: 150, borderRadius: 30, borderColor:'#fff', borderWidth: '2'}}
                      onPress={()=>{navigate('Home')}}> 
                      <Text style={{ textAlign: 'center', color: '#fff', fontSize: 15}}>Back to Home</Text>
                      </TouchableOpacity>
                      
                  </View>
              </View>
             </View>
          
                  
              )
            }*/
 
 

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: "#eaeaea"
        }
      })