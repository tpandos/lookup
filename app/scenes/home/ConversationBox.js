import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
  const friendId = props.navigation.getParam('friend_id', "No ID")
  const [messages, setMessages] = useState([]);
  const {state, setState} = useAuth();
  const [convoHist, setConvoHist] = useState([]);
  const user = state.user;
  //const friendId = props.navigation.state.params('friend_id', "No such friend")

  //console.log("-------------------------------- friends id",friendId)
  //const [loading, setLoading] = useState(false);
  //const [mount , setMount] = useState(false);
/*
  const Data = [
      {to_userId: "60592ef6f8cd70001599df31"}
  ]
 const fd = "60592ef6f8cd70001599df31"
 */
 //var conversationHistory;
 let qwel;

 try{
  let response = api.loadConversation(state.user._id)
  .then(conversationHistory => {

    var messageLoop = [];
    var messageId = 0;
    

    for(let i = 0; i < conversationHistory.length; i++){
      messageLoop.push({
        _id: messageId = messageId + 1,
        text: conversationHistory[i].text,
        createdAt: new Date(),
        user:{
            _id: conversationHistory[i]._id,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
         }


       });
  }
  //setConvoHist(messageLoop);
  setMessages(messageLoop)
console.log("--------------------------CONVERSATIONHistory", conversationHistory);
return messageLoop;
})
//console.log("--------------------------CONVERSATIONHistory", convoHist);

} catch(err){
      console.warn(err);
  }

  //qwel = response;


//console.log("--------------------------CONVERSATIONHistory", qwel);
  
  
  
  

/*
  var response = new Promise((resolve, reject) => {
    api.loadConversation(state.user._id).then(data => {
      resolve(data);
    }).catch(err=> {
      return reject(error);
    })
  }).then(res => {
      conversationHistory = res;
    })

    console.log("--------------------------CONVERSATIONHistory", conversationHistory);
    */
    


  //var messageLoop = [];
  //var messageId = 0;
  /*for(let i = 0; i < conversationHistory.length; i++){
      messageLoop.push({
        _id: messageId + 1,
        text: conversationHistory[i].text,
        createdAt: new Date(),
        user:{
            _id: conversationHistory[i]._id,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
         }


       });
  }*/

  //console.log("-------------------------MESSAGELOOP",messageLoop)

  /*
  useEffect(() => {

    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []); 
  */

/*
  useEffect(() => {
    
    setMessages([

      {
       _id: 10,
      createdAt: new Date(),
      text: "Yo",
    user:{
      _id: 2,
      avatar: "https://placeimg.com/140/140/any",
      name: "React Native",
      },
    },
    {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []); 
  */


  
  /*useEffect(() => {
    setMessages(convoHist);
  }, []); */
  
  /*
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []); */

  const onSend = useCallback((messages = []) => {
    let userText = messages[messages.length-1].text;
    let response = api.addMessage(state.user._id,userText);

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
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: "604a631cf4e3610015e7c421",
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

//export default ConversationBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});