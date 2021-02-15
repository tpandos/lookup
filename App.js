
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fetchMeetups } from './constants/api';

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
    <View style={styles.container}>
      <Text>LookUp</Text>
      <Text></Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});