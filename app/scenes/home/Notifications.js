import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {Text, View, StyleSheet, Image, Animated} from 'react-native'
import {  TouchableOpacity } from 'react-native-gesture-handler';
import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import * as c from '../../constants'
import axios from 'axios';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function FriendList (props) {

  const {navigation} = props;
  const {navigate} = props.navigation;
  const {state, setState} = useAuth();
  const [newNotification, getNewNotification] = useState({}); 
  const [loadNotUpdate, setLoadNot] = useState(true); // set to true for updating 
  const user = state.user; 
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const ITEM_SIZE = 160;

    // accept or ignore request
    let requestResponse; 

     // adding new useeffect 
     useEffect(()=>{

      async function getAllNotifications (){
      await axios.get(`${c.UPDATE_PROFILE}/${user._id}`)
      .then((response)=>{
      const allNotifications = response.data.user.messages; 
      getNewNotification(allNotifications);
      setLoadNot(false); 
      })
      .catch(error => console.error(`error: ${error}`));
      setLoadNot(false);
    }
      getAllNotifications();
    },[loadNotUpdate]); 
 
    
    // accept or ignore request

    async function onResponse(messId, reqType, reqRes){
      
      try{
          let response = await api.response(user._id, messId, reqType, reqRes);
      setLoadNot(true); 
      user.messages = response.user.messages;
      }catch(error){
        console.error(error); 
        setLoadNot(false); 
      }

    }


    return(
      <View style={styles.container}>
        <View style={{flex:1}}>
          <Animated.FlatList
            data = {user.messages}
            onScroll = {Animated.event([{ nativeEvent : {contentOffset: {y : scrollY}}}],{useNativeDriver : true})}
            keyExtractor={messageId => messageId._id.toString()}
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
          justifyContent: 'center',
          backgroundColor: "#eaeaea"
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
