import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, FlatList,Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from "../../providers/auth";
import { Entypo } from '@expo/vector-icons';


export default function Notifications(props) {
    const {navigation} = props;
    const {navigate} = props.navigation;
    const {state, setState} = useAuth();
   
    const user = state.user; 
    

 
    return (
      <View style={styles.container}>
       <View style={{flex:1}}>

          
          
       </View>
       <View style={styles.bottompane}>
         <View style={{flex:1, alignItems:'center', paddingBottom:10}}>
            <TouchableOpacity onPress={()=>{navigate('Home')}}>
            <Entypo name="home" size={35} color="#29e3dd" />
            </TouchableOpacity> 
          </View>
        </View>
      </View>
        );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#000033"
      }, 
      bottompane:{
        flexDirection:'row',
        padding:10,
        paddingBottom:20
      }
    })
   