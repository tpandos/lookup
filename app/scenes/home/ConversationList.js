import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import React, {useState, useContext, useEffect} from 'react';
import { Profiler } from 'react';
import {Text, View, StyleSheet, Image, FlatList,Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import {createStackNavigator} from 'react-navigation-stack';

export default function ConversationList(props) {

    const {navigation} = props;
    const {navigate} = props.navigation;
    const {state, setState} = useAuth();
    const [friId, setFriId] = useState(false);
    const user = state.user;

    // console.log("username---------------", user.username); 
    // console.log("array size friends_id===", user.friends._id);


    
    return (
        <View style={styles.container}>
         <View style={{flex:1}}>
  
              <FlatList
                data = {user.friends}
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
                        <TouchableOpacity onPress={() => {props.navigation.navigate('ConversationBox', {friend_info: item._id})}}>
      
                        
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