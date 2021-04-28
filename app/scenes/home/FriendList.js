import React, {useState, useContext} from 'react';
import {Text, View, StyleSheet, Image, FlatList,Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from "../../providers/auth";
import * as api from "../../services/auth";

export default function FriendList(props) {

    const {navigation} = props;
    const {navigate} = props.navigation;
    const {state, setState} = useAuth();
    const user = state.user; 
    
    //console.log("friennnnnnnnnnnnnnnnnnnnnnnnnnnndsa ", newFriendList); 

  var friendLoop = [];    // temporary loop for friend list, this is going to be removed 

  for(let i = 0; i < user.friends.length; i++){
    friendLoop.push({
     id: user.friends[i]._id,
     username: user.friends[i].username, 
     profileImage: {uri: user.friends[i].profileImage}
    });
  }

async function onDelete(data) {  //data is _id to be removed 

 // call deleteFriend function 
  let response = await api.deleteFriend(state.user._id,data);// <-- deletefriend id

}  
 
    return (
      <View style={styles.container}>
       <View style={{flex:1}}>
      
            {/* test flatlist direct================================ */}

            <FlatList
              data = {user.friends}
                keyExtractor={profile => profile._id.toString()}
                renderItem={({item})=>(
                  <View style={{flex:1,flexDirection:'row', padding: 8, borderBottomColor: 'grey', borderBottomWidth:1}}>

                      <View>
                         <TouchableOpacity >
                        <Image source={{uri: item.profileImage}} style={styles.imageDisplay}/>
                        </TouchableOpacity>
                      </View>
                    
                    <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:1,marginTop:20}}>
                        <Text style={{ color: 'white', fontSize: 18}}> {item.username} </Text>
                    </View>

                    <View style={{marginTop:15, paddingHorizontal:15, paddingTop:10}}>
                      <TouchableOpacity onPress={() => {onDelete(item._id)}}>
                      
                      <MaterialIcons name="person-remove-alt-1" size={32} color="#ff3300" />
                      </TouchableOpacity>
                    </View>
                    </View>
                  </View>
                )}
                // extraData={removal}
              >
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
   