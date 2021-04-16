import React, {useState, useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useAuth } from "../../providers/auth";


export default function FriendList(props) {
    const {navigation} = props;
    const {navigate} = props.navigation;
    const {state, setState} = useAuth();
   
    const friendsObj = props.navigation.getParam('FriendList');

    
    console.log("_________________________ this is the friend ", friendsObj); 
   
    return (
      <View style={styles.container}>
       <View>
          <Text style={{color: 'white'}}>This is the FriendList Page</Text>
          <TouchableOpacity onPress={()=>{navigate('Home')}}>
            <Text style={{color:'white'}}>
                Touch to go back to profile
            </Text>
          </TouchableOpacity> 
       </View>
       </View>
        );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#000033"
      }
    })
   