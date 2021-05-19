import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import axios from 'axios';
import * as c from '../../constants';


export default function ConversationBox (props){

  //const { friendId } = navigation.getParam(friend_id, "No such friend");
  //const friend_id  = navigation.state.params;
  //const {friend_id} = navigation.getParam('friend_id');
  //const { friend_id } = route.params
  const {navigation} = props;
  const {navigate} = props.navigation;
  const friend = props.navigation.getParam('friend_info', "No ID")
  const friendId = friend._id;
  const friendImage = friend.profileImage;
  const [messages, setMessages] = useState([]);
  const [convoId, setConvoId] = useState();
  const {state, setState} = useAuth();
  const user = state.user;
  const [mount , setmount] = useState(true);
  //const friendId = props.navigation.state.params('friend_id', "No such friend")

  console.log("-------------------------------- friends id",friendId)
  // console.log("-------------------------------- friends Image",friendImage)

useEffect(() => {
// if (mount == true) { 
  async function loadConversationData() { 
    try{
     let response = await api.loadConversation(state.user._id, friendId)
   
       var messageLoop = [];
       var messageId = 0;
        
      setConvoId(response[0]._id);
      console.log("convoId before useEffect" , convoId)
      //  console.log("data" , data)
       
   
       for(let i = response[0].conversationHistory.length-1; i >= 0; i--){
         messageLoop.push({
           _id: messageId = messageId + 1,
           text: response[0].conversationHistory[i].text,
           createdAt: response[0].conversationHistory[i].createdAt,
           user:{
               _id: response[0].conversationHistory[i]._id,
               name: 'React Native',
               avatar: friendImage,
            }
          });
     }
     setMessages(messageLoop)
   return messageLoop;
   } catch(err){
         console.warn(err);
     }
   }
   loadConversationData();
  //  setmount(false)
  // }
}, [convoId])

console.log("convoId after effect" , convoId)

  const onSend = useCallback((messages = []) => {
    let userText = messages[messages.length-1].text;
    let response = api.addMessage(state.user._id, convoId , userText);
    // setmount(true);

    setMessages((previousMessages) => 
      GiftedChat.append(previousMessages, messages),
    );
  }, [])

  // my onsend version

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
    <View style={{ flex: 1}}>
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: state.user._id,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />

<View style={styles.bottompane}>
           <View style={{flex:1, alignItems:'center', paddingBottom:10}}>
              <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
              <Entypo name="home" size={35} color="#29e3dd" />
              </TouchableOpacity> 
            </View>
          </View>
    </View>
    
  );
};

//export default ConversationBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottompane:{
    flexDirection:'row',
    padding:10,
    paddingBottom:20
  }
});