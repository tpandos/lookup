import React, {useState, useContext} from 'react';
import {Text, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function FriendList(props) {
    const {navigate} = props.navigation;
    const message = props.navigation.getParam('message', 'nothing sent')
    const result = props.navigation.getParam('result', 'no-result')
    console.log('message')
    console.log(message)
    console.log('result=====================')
    console.log(result)

    var myloop = [];

    for (let i = 0; i < result.length; i++) {
        myloop.push(
         <View  key={i}>
           <Text>UserID: {result[i]._id}</Text>
           <Text>Username: {result[i].username}</Text>
           <Text>ProfileImage: {result[i].profileImage}</Text>
         </View>);
    }
    // end loop

    return (
        
       <View>
          <Text>This is the FriendList Page</Text>
          <TouchableOpacity onPress={()=>{navigate('Home')}}>
            <Text >
                Touch to go back to profile
            </Text>
            
          </TouchableOpacity> 
          <Text>
              { myloop }
            </Text>
       </View>

        );
    }
   