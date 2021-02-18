
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fetchMeetups } from './constants/api';
import Sandbox from './components/sandbox';
import SignUp from './screens/registratrion';

export default function App() {
  const test_data = useState();

  const all_data = async () => {
    const datas = await fetchMeetups()
    console.log('datas', datas)
  }
  
  useEffect(()=>{
    all_data()
  },[])
 
  return (
    //<Sandbox />
    <View style={styles.container}>
      <SignUp />
        <View>
          
          <View>
            <Text>Blank</Text>
         
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a031d',
  },
});