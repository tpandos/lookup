import { stopLocationUpdatesAsync } from 'expo-location';
import React, {useState, useContext} from 'react';
import { Profiler } from 'react';
import {Text, View, StyleSheet, Image, FlatList,Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';

import { useAuth } from "../../providers/auth";


export default function FriendList(props) {
    const {navigation} = props;
    const {navigate} = props.navigation;
    const {state, setState} = useAuth();
   
    const user = state.user; 
    
    console.log("username---------------", user.username); 

  if(user.friends.length === 0){
    console.log("xxxxxxxxxxxxxxxxxxx Friend list is empty", user.friends.length); 
  }else{
    console.log("array size friends VVVVVVVVVVVVVVVVV", user.friends.length);
  }

  var friendLoop = [];

  for(let i = 0; i < user.friends.length; i++){
    friendLoop.push({
     id: user.friends[i]._id,
     username: user.friends[i].username, 
     profileImage: {uri: user.friends[i].profileImage}
    });
  }


  const deleteFriendAlert = () =>
  Alert.alert(
    "Remove",
    "Are you sure you sure you want to delete this friend?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("delte")
}
    ]
  );

 
      
 
    return (
      <View style={styles.container}>
       <View style={{flex:1}}>

            <FlatList
              data = {friendLoop}
                keyExtractor={profile => profile.id.toString()}
                renderItem={({item})=>(
                  <View style={{flex:1,flexDirection:'row', padding: 8}}>

                   
                      <View>
                         <TouchableOpacity >
                        <Image source={item.profileImage} style={styles.imageDisplay}/>
                        </TouchableOpacity>
                      </View>
                    
                    <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:1,marginTop:20}}>
                        <Text style={{ color: 'white', fontSize: 18}}> {item.username} </Text>
                    </View>

                    <View style={{marginTop:15}}>
                      <TouchableOpacity onPress={deleteFriendAlert}>
                      
                      <Text style={{color:'white',borderColor:'white',borderWidth:2, padding:10, borderRadius:10}}>
                        Remove
                      </Text>
                      </TouchableOpacity>
                    </View>
                    </View>
                  </View>
                )}>
              
            </FlatList>
          
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
      imageDisplay:{
        borderWidth: 2,
        borderRadius:50,
        borderColor: '#29e3dd', 
        width: 70, 
        height: 70,
      },
      bottompane:{
        flexDirection:'row',
        padding:10,
        paddingBottom:20
      }
    })
   