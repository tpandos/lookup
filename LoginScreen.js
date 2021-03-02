import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

function LoginScreen() {

      return (
      <View style={styles.container}>
          <Text style={{ fontsize: 25, marginTop: 20 }} Login Screen></Text>
          <Text style={{ fontsize: 16, color: 'gray', marginTop: 20}} Sign in to continue ></Text>

            <TextInput
              style={{ marginTop: 40, borderBottomColor:'#ddd', borderBottomWidth: 1, paddingBottom: 20}}
              placeholder = "Username"
              />
            <TextInput
              style={{ marginTop: 40, borderBottomColor:'#ddd', borderBottomWidth: 1, paddingBottom: 20}}
              placeholder = "Password"
              secureTextEntry
              />
            <TouchableOpacity
              style={{backgroundColor: '#37474f', padding: 10, width: 150, borderRadius: 30, marginHorizontal: 2 }}>
              <Text style={{ textAlign: 'center', color: '#FFF', fontSize: 18}}>Login Now</Text>
            </TouchableOpacity>
            
          </View>
      )
  
}
export default LoginScreen



const styles = StyleSheet.create({
  container: {
    paddingBottom:400,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
