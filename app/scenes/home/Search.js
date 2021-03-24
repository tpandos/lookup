import React, {useState, useContext} from 'react';
import {Text, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function Search(props) {
    const {navigate} = props.navigation;
   
    return (
        
       <View>
          <Text>This is the Searching Page</Text>
          <TouchableOpacity onPress={()=>{navigate('Home')}}>
            <Text >
                Touch to go back to profile
            </Text>
          </TouchableOpacity> 
       </View>

        );
    }
   