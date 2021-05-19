import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {Image, View, StyleSheet, Text, Animated} from 'react-native'
import {  TouchableOpacity } from 'react-native-gesture-handler';
import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import * as c from '../../constants'
import axios from 'axios';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function ConversationList(props) {

  const {navigation} = props;
  const {navigate} = props.navigation;
  const {state, setState} = useAuth();
  const [loading, setLoading] = useState(false);
  const [friendsList, getFriendList] = useState([]); 
  const [loadFriendUpdate, setLoadFriend] = useState(false); // set to true for updating 
  const user = state.user; 
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const ITEM_SIZE = 160;

   // adding new useeffect 
  useEffect(()=>{
  async function getAllFriends (){
    await axios.get(`${c.UPDATE_PROFILE}/${user._id}`)
    .then((response)=>{
      const allFriends = response.data.user.friends; 
      getFriendList(allFriends);
      setLoadFriend(false); 
    })
    .catch(error => console.error(`error: ${error}`));
    setLoadFriend(false); 
  }
    getAllFriends();
  },[loadFriendUpdate]); 

  async function loadConversation(friend_id, friend_username) {  //data is friend_id 
    // call loadConversation function 
    const {navigation} = props;
    const {navigate} = props.navigation;
    setLoading(true);
    let response = await api.loadConversation(state.user._id, friend_id);// <-- friend id
    setLoadFriend(true); 
    navigate('ConversationBox', {conversation_id: response[0]._id, history: response[0].conversationHistory, friend_id: friend_id, friend_username: friend_username})
   } 

    return(
      <View style={styles.container}>
        <View style={{flex:1}}>
          <Animated.FlatList
            data = {friendsList}
            onScroll = {Animated.event([{ nativeEvent : {contentOffset: {y : scrollY}}}],{useNativeDriver : true})}
            keyExtractor={profile => profile._id.toString()}
            renderItem = {({item ,index}) => { 

              const inputRange = [-1,0,ITEM_SIZE * index,ITEM_SIZE * (index + 2)]
              const scale = scrollY.interpolate({inputRange,outputRange : [1 , 1 , 1, 0]})
                return <Animated.View
                  style = {{ 
                  shawdowColor: "#000",
                  shadowOffset: {width: 0, height: 10},
                  shadowOpacity : 0.3, 
                  transform : [{scale}]
                  }}>
                  <View style={{flex : 1, flexDirection: "row", backgroundColor: '#000033', marginTop:2, marginLeft: 10, padding: 20, width: 400, borderRadius: 30, marginHorizontal: 2, borderColor:'#fff', borderWidth: '2'}}>
                    <View>
                      <TouchableOpacity >
                        <Image source={{uri: item.profileImage}} style={styles.imageDisplay}/>
                      </TouchableOpacity>
                    </View>

                    <View style={{flex:1, flexDirection:'row'}}>
                      <View style={{flex:1,marginTop:22, marginLeft: 10}}>
                        <Text style={{ color: 'white', fontSize: 18}}> {item.username} </Text>
                      </View>
                      
                      <View style={{paddingTop:20, marginRight:30}}>
                        <TouchableOpacity onPress={() => {loadConversation(item._id, item.username)}}>
                        <Text style={{color:'white',borderColor:'white',borderWidth:2, padding:10, borderRadius:10}}>
                          message
                        </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Animated.View>
            }}
          />  
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