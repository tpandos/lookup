import React, {useState} from 'react';
import 'react-native-gesture-handler';
import { FlatList,Keyboard, Image, ImageBackground, Linking, ScrollView, StyleSheet, Text, View} from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable'
import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import Form, { TYPES } from 'react-native-basic-form';
import {ErrorText} from "../../components/Shared";


export default function Search (props) {
const {navigation} = props;
const {navigate} = props.navigation;

const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
const { state } = useAuth();
const [condition , searchBarFocused] = useState(false);

const fields = [
  {name: 'keyword', label: 'Search a Keyword', required: true},
  {name: 'method', label: 'Filter method', required: true},
]

  async function onSubmit(data) {
    setLoading(true);

    try {
      let response = await api.search(state.user._id, data);
      console.log('response');
      console.log(response)
      setLoading(false);

      navigate('Result');
    } catch (error) {
        setError(error.message);
        setLoading(false)
    }
}
  
    return(
      <ScrollView>
      <View style= {styles.container}>
          <View style={{flex:1, padding:50}}>
              <ErrorText error={error}/>
              <Animatable.View animation = "slideInRight" duration= {1000} style= {{width: 380, height: 250, backgroundColor: 'white', 
              flexDirection:'row', padding: 5, alignItems: 'center', paddingRight:5, borderRadius: 1}}>
                <Animatable.View animation ={searchBarFocused ? "fadeInLeft" : "fadeInRight"} duration = {400}> 
                </Animatable.View>
                <Form
                  fields={fields}
                  title={'Submit'}
                  loading={loading}
                  error={error}
                  onSubmit={onSubmit}/>
              </Animatable.View>
              <TouchableOpacity
              style={{backgroundColor: '#6D25BE', alignItems: 'center',  marginTop:2, marginLeft: 2, padding: 10, width: 150, borderRadius: 30, borderColor:'#fff', borderWidth: '2'}}
              onPress={()=>{navigate('Home')}}> 
              <Text style={{ textAlign: 'center', color: '#fff', fontSize: 15}}>Back to Home</Text>
              </TouchableOpacity>
          </View>
      </View>
      </ScrollView>
      )
    }
      
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#eaeaea"
    }
  })