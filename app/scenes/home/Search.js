import React, {useState, useSafeState, useContext, useEffect, useRef} from 'react';
import 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { FlatList, SafeAreaView, ActivityIndicator, ScrollView, StyleSheet, Text, View} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable'
import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import Form, { TYPES } from 'react-native-basic-form';
import {ErrorText} from "../../components/Shared";
import axios from 'axios';
import * as c from '../../constants';
import { Alert } from 'react-native';



export default function Search (props) {
  const {navigation} = props;
  const {navigate} = props.navigation;

const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
const {state, updateUser } = useAuth();
updateUser(state.user)
const [formData, setFormData] = useState();
const [userData , setData] = useState({userData});

//const [isCancelled, setCancel] = useState(true);
// const cancelSource = useRef(false)
// cancelSource.current = axios.CancelToken.source();
const [mount , setMount] = useState(false);


const options = [
  {label:"Ranking", value: 'ranking'},
  {label:"Distance", value: 'distance'}
];
const fields = [
  { name: 'keyword', 
    label: 'Search a Keyword', 
    required: true
  }, 

{
  type: TYPES.Dropdown, 
  name: 'method', 
  label: 'Filter method',
  options: options, 
  mode: 'dialog',
  required: true}]



function onSubmit (data) {
    setMount(true);
    setFormData(data)
  
}

useEffect(() => {
if (mount == true ){

async function fetchApi(){
    setLoading(true);
      try {
        const response = await api.search(state.user._id, formData);
        setLoading(false);

            await AsyncStorage.setItem( "userResponse" , JSON.stringify(response));
            props.navigation.navigate('SearchResults')
        
      }catch (error) {
        //setError(error.message);
        setLoading(false)
        Alert.alert("Search did not match")
        }
        //setMount(false)
      }
      fetchApi();
  }
    return () => { 
        setMount(false)
    }
}, [formData])
  


  return(
    <View style={{flex:1, backgroundColor:'#000033'}}>
    <ScrollView>
    <View style= {styles.container}>
        <View style={{flex:1, padding:50}}>
            <ErrorText error={error}/>
            <Animatable.View animation = "slideInRight" duration= {1000} style= {{width: 380, height: 350, backgroundColor: '#000033', 
            flexDirection:'row', padding: 5, alignItems: 'center', paddingRight:5, borderRadius: 1}}>
              <Form
                fields={fields}
                title={'Search'}
                loading={loading}
                initialData={null}
                error={error}
                //style = {{backgroundColor: '#6D25BE',  marginTop:2, marginLeft: 2, padding: 10, width: 150, borderRadius: 30, borderColor:'#fff', borderWidth: '2'}}
                onSubmit={onSubmit}/>
            </Animatable.View>
            {/* <TouchableOpacity
            style={{backgroundColor: '#6D25BE', alignItems: 'center',  marginTop:2, marginLeft: 2, padding: 10, width: 150, borderRadius: 30, borderColor:'#fff', borderWidth: '2'}}
            onPress={()=>{navigate('App')}}> 
            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 15}}> Home</Text>
            </TouchableOpacity> */}
            
        </View>
    </View>
   </ScrollView>
   <View style={styles.bottompane}>
         <View style={{flex:1, alignItems:'center', paddingBottom:15}}>
            <TouchableOpacity onPress={()=>{navigate('App')}}>
            <Entypo name="home" size={35} color="#29e3dd" />
            </TouchableOpacity> 
          </View>
        </View>
 </View>
        
    )
  }
 
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: "#000033"
        },
        bottompane:{
          flexDirection:'row',
          padding:10,
          paddingBottom:20,
        }
      })

      // <Animatable.View animation = "fadeInLeft" duration = {400}> 
      //         </Animatable.View>