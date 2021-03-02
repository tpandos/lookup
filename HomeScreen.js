import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

function HomeScreen({navigation}) {

  return(
  <View style={styles.container}>
     <Image
        style={{width:"100%" , height: 300}}
        source={require('./assets/login-logo.png')}
        resizeMode = "contain"

      />
      <Text style={{ fontSize: 40, fontWeight:'bold', textAlign: 'center'}} > LookUp</Text>
      <Text style= {{ fontSize:16, color: 'gray', textAlign: 'center', marginHorizontal:20, fontWeight:'bold'}} >Join LookUp. Connect!</Text>

      <View style={{ flexDirection: 'row', margin: 20, paddingVertical:20}}>

      <TouchableOpacity
                style={{backgroundColor: '#37474f', padding: 10, width: 150, borderRadius: 30, marginHorizontal: 2 }}
                onPress = {() => navigation.navigate("Login")}>
        <Text style={{ textAlign: 'center', color: '#FFF', fontSize: 18}}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
                style={{backgroundColor: '#FFF', padding: 10, width: 150, borderRadius: 30, marginHorizontal: 2, borderColor:'#212121', borderWidth: '1'}}>
                <Text style={{ textAlign: 'center', color: '#37474f', fontSize: 18}}>Sign up</Text>
       </TouchableOpacity>

      </View>
      </View>
      )
  }
export default HomeScreen

const styles = StyleSheet.create({
  container: {
    paddingBottom:400,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
