import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image, FlatList,Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from "../../providers/auth";
import * as api from "../../services/auth";
import * as c from '../../constants'
import axios from 'axios';
import * as Animatable from 'react-native-animatable';


export default function FriendList(props) {

    const {navigation} = props;
    const {navigate} = props.navigation;
    const {state, setState} = useAuth();
   
    const [friendsList, getFriendList] = useState([]); 
    const [loadFriendUpdate, setLoadFriend] = useState(false); // set to true for updating 

    const user = state.user; 
    
    // adding new useeffect 
    useEffect(()=>{
      getAllFriends();
    },[loadFriendUpdate]); 
 
    const getAllFriends = () => {
      axios.get(`${c.UPDATE_PROFILE}/${user._id}`)
      .then((response)=>{
        const allFriends = response.data.user.friends; 

        getFriendList(allFriends);
       
         setLoadFriend(false); 
      })
      .catch(error => console.error(`error: ${error}`));
    }



async function onDelete(data) {  //data is _id to be removed 

 // call deleteFriend function 
  let response = await api.deleteFriend(state.user._id,data);// <-- deletefriend id


  setLoadFriend(true); 
}  
 
    return (
      <View style={styles.container}>
       <View style={{flex:1}}>
      
            {/* test flatlist direct================================ */}
            
             <FlatList
              data = {friendsList}
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
   
