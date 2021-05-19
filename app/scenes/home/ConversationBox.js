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
  const {navigation} = props;
  const {navigate} = props.navigation;
  const friend_id = props.navigation.getParam('friend_id', "No ID")
  const friend_username = props.navigation.getParam('friend_username', "No Username")
  const conver_history = props.navigation.getParam('history', "No history")
  const conversation_id = props.navigation.getParam('conversation_id', "No conversation Id")
  const [messages, setMessages] = useState([]);
  const [convoId, setConvoId] = useState();
  const {state, setState} = useAuth();
  const user = state.user;
  const [mount , setmount] = useState(true);
  
useEffect(() => {
  async function loadConversationData() { 
    try{
     let response = await api.loadConversation(state.user._id, friend_id)
   
       var messageLoop = [];
       var messageId = 0;
      
       for(let i = conver_history.length - 1; i >= 0; i--){
         messageLoop.push({
           _id: messageId = messageId + 1,
           text: conver_history[i].text,
           createdAt: conver_history[i].createdAt,
           user:{
               _id: conver_history[i]._id,
               name: friend_username,
              //  avatar: friend_image,
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

}, [conversation_id])

  const onSend = useCallback((messages = []) => {
    let userText = messages[messages.length-1].text;
    let response = api.addMessage(state.user._id, conversation_id , userText);
   
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