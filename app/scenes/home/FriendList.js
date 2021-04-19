import React, {useState, useContext} from 'react';
import { Profiler } from 'react';
import {Text, View, StyleSheet, Image, FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useAuth } from "../../providers/auth";


export default function FriendList(props) {
    const {navigation} = props;
    const {navigate} = props.navigation;
    const {state, setState} = useAuth();
   
    const user = state.user; 
    
    console.log("username---------------", user.username); 
    // console.log("userskill---------------", user.skills[0].name);
    // console.log(user.friends[0].username);  // the update catches the data. need to capture the data 
   // console.log(user.friends[1].username);

  if(user.friends.length === 0){
    console.log("xxxxxxxxxxxxxxxxxxx Friend list is empty", user.friends.length); 
  }else{
    console.log("array size friends VVVVVVVVVVVVVVVVV", user.friends.length);
  }

  var friendLoop = [];
  var profImageloop = []; 

  for(let i = 0; i < user.friends.length; i++){
    friendLoop.push({
     id: user.friends[i]._id,
     username: user.friends[i].username, 
     profileImage: {uri: user.friends[i].profileImage}
    });
  }


    
    return (
      <View style={styles.container}>
       <View>
         <View>

         <FlatList
            data = {friendLoop}
            keyExtractor={profile => profile.id.toString()}
            renderItem={({item})=>(
              <View style={{flex:1,flexDirection:'row'}}>
                <TouchableOpacity style={styles.friendList}>

                   <View>
                    <Image source={item.profileImage} style={styles.imageDisplay}/>
                  </View>

                  <View style={{marginLeft:70, alignContent:'center'}}>
                    <Text style={{ color: '#000033', fontSize: 18,fontWeight:'bold'}}> {item.username} </Text>
                  </View>
                 
                </TouchableOpacity>
              </View>
              )}>
              
        </FlatList>

          <TouchableOpacity onPress={()=>{navigate('Home')}}>
        
            <Text style={{color:'white'}}>
                Touch to go back to profile
            </Text>
          </TouchableOpacity> 
       </View>
       
       </View>
       </View>
        );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
       // alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: "#000033"
      }, 
      friendList: {
        backgroundColor: 'white', 
        //marginTop: 2, 
        marginLeft: 10, 
        //padding: 10,
        marginBottom:10,
        width: 400, 
        borderRadius: 30, 
        //marginHorizontal: 2, 
        borderColor:'green', 
        borderWidth: 2,
      },
      imageDisplay:{
        alignSelf: 'flex-start',
        borderWidth: 2,
        borderRadius:50,
        width: 60, 
        height: 60,
      }
    })
   