import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import React, {useState, useContext, useEffect} from 'react';
import { Profiler } from 'react';
import {Text, View, StyleSheet, Image, FlatList,Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import {createStackNavigator} from 'react-navigation-stack';
import * as c from '../../constants'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default function ConversationList(props) {

    const {navigation} = props;
    const {navigate} = props.navigation;
    const {state, setState} = useAuth();
    const {updateUser} = useAuth();
    const [friId, setFriId] = useState();
    const [friendsList, getFriendList] = useState(); 
    const user = state.user;
    const [mount , setMount] = useState(null)

    // console.log("username---------------", user.username); 
    
    // console.log("array size props are ===", updateUser());
    // console.log("array size friends_id===", user.friends);

    useEffect(()=>{
     async function getAllFriends() {
      const response = await axios.get(`${c.UPDATE_PROFILE}/${user._id}`)
          const allFriends = response.data.user.friends; 
          console.log("messages" , response.data.user.friends)
          getFriendList(allFriends);

      }
      getAllFriends();
  //     if (mount == true) {
  //       async function loadData () {
  //      // props.navigation.navigate('ConversationBox', {friend_info : friId})
  //      //props.navigation.navigate('ConversationBox')
  //       let loadConvo = await api.loadConversation(state.user._id, friId)
  //       console.log("loadConvo======", loadConvo)
  //       await AsyncStorage.setItem( "userId" , JSON.stringify(loadConvo));
  //       setMount(false)
  //     }
  //   loadData();
  //   return () => { 
  //     setMount(false)
  // }
  //   }
    
    },[]); 

    // function onPress(dataId) {
    //   // props.navigation.navigate('ConversationBox', {friend_info : dataId})
    //   // let loadConvo = await api.loadConversation(state.user._id, dataId)
    //   // console.log("loadConvo======", loadConvo)
    //   // await AsyncStorage.setItem( "userId" , JSON.stringify(loadConvo));
    //   setFriId(dataId)
    //   console.log("friID is " , dataId)
    //   console.log("friID is " , friId)
    //   setMount(true)
    // }

    
    return (
        <View style={styles.container}>
         <View style={{flex:1}}>
  
              <FlatList
                data = {friendsList}
                keyExtractor = {(item, index) => index.toString()}
                  renderItem={({item , index})=>(
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
  
                      <View style={{marginTop:15}}>
                        <TouchableOpacity onPress={() => {props.navigation.navigate('ConversationBox', {friend_info : item})}}>
      
                        
                        <Text style={{color:'white',borderColor:'white',borderWidth:2, padding:10, borderRadius:10}}>
                          message
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
              <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
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