import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {Image,StyleSheet, Text, View, Animated} from 'react-native'
import {TouchableOpacity } from 'react-native-gesture-handler';
import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Entypo } from '@expo/vector-icons';

export default function SearchResults (props) {

const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
const {state, updateUser } = useAuth();
const [userData , setData] = useState({userData});
const scrollY = React.useRef(new Animated.Value(0)).current;
const ITEM_SIZE = 160;

    const {navigation} = props;
    const {navigate} = props.navigation;

    
    _retrieveData = async () => { 
    try {
      const response = await AsyncStorage.getItem('userResponse');
      if (response !== null) {
      const value = JSON.parse(response);
      setData(value)
    }
    }catch (error) {
      setError(error.message);
      }
  }
    useEffect(() => {
      _retrieveData()
    }, [])

async function OnPress(data){
      const {navigation} = props;
      const {navigate} = props.navigation;
  
      //setLoading(true);
      
        try {
          const res = await api.SearchedProfileUSER(state.user._id, data);
          const resultedProfile = res.user;

          props.navigation.navigate('SearchedProfile', {userProfile : resultedProfile})

        }catch (error) {
          setError(error.message);
          setLoading(false)
      }
  }

if (userData.message == "Results by ranking"){
    return(
      <View style={styles.container}>
      <SafeAreaView style={styles.container} >

        <Animated.FlatList
         data = {userData.results}
         onScroll = {Animated.event(
           [{ nativeEvent : {contentOffset: {y : scrollY}}}],
           {useNativeDriver : true}
         )}
         keyExtractor = {(item, index) => index.toString()}
         //keyExtractor={item => item}
          renderItem = {
            ({item ,index}) => { 

              const inputRange = [
              -1, 
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 2) 
              ]

              const scale = scrollY.interpolate({
                inputRange,
                outputRange : [1 , 1 , 1, 0]
              })
              return <Animated.View
              style = {{ 
              shawdowColor: "#000",
              shadowOffset: {width: 0, height: 10},
              shadowOpacity : 0.3, 
              transform : [{scale}]
              }}>
          <TouchableOpacity
          onPress= {() => (OnPress(userData.results[index]._id))}
          //onPress= {() => {navigate('SearchedUserProfile', { userprofile : api.SearchedUserProfile(state.user._id, response[index]._id)})}}
          style={{flex : 1, flexDirection: "row", justifyContent: "space-between", backgroundColor: '#000033', marginTop:2, marginLeft: 10, padding: 20, borderRadius: 30, marginHorizontal: 2, borderColor:'#fff', borderWidth: '2'}}>
          <Image source={{uri: userData.results[index].profileImage}} style={{width:100, height:100, borderRadius:30}}/>
          <Text style={{ textAlign: 'center', color: '#fff', fontSize: 22, fontWeight:"bold"}}> {item.username} </Text>
          <Text style={{ textAlign: 'right', color: '#fff', fontSize: 18}}> Ranking: {userData.results[index].ranking} </Text>
           </TouchableOpacity>
          </Animated.View>
           }}
        />  
      </SafeAreaView>
      <View style={styles.bottompane}>
          <View style={{flex:1, alignItems:'center', paddingBottom:20}}>
            <TouchableOpacity onPress={()=>{navigate('Home')}}>
              <Entypo name="home" size={35} color="#29e3dd" />
            </TouchableOpacity> 
          </View>
        </View>
      </View>
    )
    }
    else {
      return(
        <View style={styles.container}>
        <SafeAreaView style= {styles.container}>
          
          <Animated.FlatList
         data = {userData.results}
         onScroll = {Animated.event(
           [{ nativeEvent : {contentOffset: {y : scrollY}}}],
           {useNativeDriver : true}
         )}
         keyExtractor = {(item, index) => index.toString()}
         //keyExtractor={item => item}
          renderItem = {
            ({item ,index}) => { 

              const inputRange = [
              -1, 
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 2) 
              ]

              const scale = scrollY.interpolate({
                inputRange,
                outputRange : [1 , 1 , 1, 0]
              })
              return <Animated.View
              style = {{ 
              shawdowColor: "#000",
              shadowOffset: {width: 0, height: 10},
              shadowOpacity : 0.3, 
              transform : [{scale}]
              }}>
            <TouchableOpacity
            onPress= {() => (OnPress(userData.results[index]._id))}
            
            style={{flex : 1, flexDirection: "row", justifyContent: "space-between", backgroundColor: '#17202A', marginTop:2, marginLeft: 10, padding: 20,  borderRadius: 30, marginHorizontal: 2, borderColor:'#fff', borderWidth: '2'}}>
            <Image source={{uri: userData.results[index].profileImage}} style={{width:100, height:100, borderRadius:30}}/>
            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 22, fontWeight:"bold"}}> {item.username} </Text>
            <Text style={{ textAlign: 'right', color: '#fff', fontSize: 18}}> {userData.results[index].distance}m away </Text>
             </TouchableOpacity>
          </Animated.View>
            }}
          /> 
        </SafeAreaView>
        <View style={styles.bottompane}>
          <View style={{flex:1, alignItems:'center', paddingBottom:20}}>
            <TouchableOpacity onPress={()=>{navigate('Home')}}>
              <Entypo name="home" size={35} color="#29e3dd" />
            </TouchableOpacity> 
          </View>
        </View>
        </View>
      )
    }
}
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          backgroundColor: "#eaeaea"
        },
        bottompane:{
          flexDirection:'row',
          padding:10,
          paddingBottom:15
        }
      })


      SearchResults.navigationOptions = ({}) => {
        return {
            title: `Search Results`
        }
    };
