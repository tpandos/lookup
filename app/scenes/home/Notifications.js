import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image, FlatList,Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from "../../providers/auth";
import { Entypo } from '@expo/vector-icons';
import * as api from "../../services/auth";
import * as c from '../../constants'
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';

export default function Notifications(props) {
  const {navigation} = props;
  const {navigate} = props.navigation;
  const {state, setState} = useAuth();
  const [newNotification, getNewNotification] = useState({}); 
  const [loadNotUpdate, setLoadNot] = useState(true); // set to true for updating 
  let user = state.user; 
   
    // accept or ignore request
    let requestResponse; 


     // adding new useeffect 
     useEffect(()=>{
      getAllNotifications();
    },[loadNotUpdate]); 
 
    const getAllNotifications = () => {
      axios.get(`${c.UPDATE_PROFILE}/${user._id}`)
      .then((response)=>{
       const allNotifications = response.data; 

      getNewNotification(allNotifications);
      setLoadNot(false); 
      })
      .catch(error => console.error(`error: ${error}`));
    }

    // accept or ignore request

    async function onResponse(messId, reqType, reqRes){
      
      let response = await api.response(user._id, messId, reqType, reqRes);
      setLoadNot(true); 
      user.messages = response.user.messages;

    }

    return (
      <View style={styles.container}>
       <View style={{flex:1}}>


{/* code goes here */}

            <FlatList
              data = {user.messages}
              extraData = {user}
                keyExtractor={messageId => messageId._id.toString()}
                renderItem={({item})=>(
                  <View style={{flex:1,flexDirection:'row', padding: 8, borderBottomColor:'grey', borderBottomWidth:1}}>

          
                      <View>
                         <TouchableOpacity >
                        <Image source={{uri: item.from_profileImage}} style={styles.imageDisplay}/>
                        </TouchableOpacity>
                      </View>
                    
                    <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:1,marginTop:20}}>
                        <Text style={{ color: 'white', fontSize: 18}}> {item.from_username} Type: {item.request}</Text>
                    </View>

                    <View style={{marginTop:15,  paddingTop:8,paddingHorizontal:15}}>
                      <TouchableOpacity onPress={() => {onResponse(item._id, item.request, requestResponse="Ignore")}}>
                      
                      <MaterialIcons name="cancel" size={35} color="red" />
                      </TouchableOpacity>
                    </View>
                    <View style={{marginTop:15,paddingTop:8, paddingHorizontal:15}}>
                      <TouchableOpacity onPress={() => {onResponse(item._id, item.request, requestResponse="Accept")}} >
                      <MaterialIcons name="person-add-alt-1" size={35} color="#00ff00" />
                      </TouchableOpacity>
                    </View>
                    </View>
                  </View>
                )}
                // extraData={removal}
              >
            </FlatList>
 
{/* ends here  */}


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
   
