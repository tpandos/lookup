import React from 'react';
import 'react-native-gesture-handler';
import { FlatList,Keyboard, Image, ImageBackground, Linking, ScrollView, StyleSheet, Text, View} from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';


export default function SearchResults (props) {
    const {navigation} = props;
    const {navigate} = props.navigation;

    const user_name = props.navigation.getParam('Usernames', "Not Matched");
    const profile_image = props.navigation.getParam('ProfileImages', "Default Photo");
    const rank = props.navigation.getParam('Ranking', "No Rank");
        
    return(
        <View style= {styles.container}>
        <TouchableOpacity
        style={{alignItems: 'center', backgroundColor: 'white', marginTop:2, marginLeft: 10, padding: 20, width: 200, borderRadius: 30, marginHorizontal: 2, borderColor:'#37474f', borderWidth: '2'}}
        onPress ={()=>{navigate('Search')}}> 
        <Text Texstyle={{flex:1, color: '#37474f', padding:50, justifyContent: 'center', alignItems: 'center'}}> Back to Search </Text>
        </TouchableOpacity>
        

        <FlatList
         data = {user_name}
         extraData = {rank}
         keyExtractor = {(item,index) => index.toString()}
          renderItem = {
            ({item , index}) => 
          <TouchableOpacity
          style={{flex : 1, backgroundColor: '#37474f', marginTop:2, marginLeft: 10, padding: 20, width: 400, borderRadius: 30, marginHorizontal: 2, borderColor:'#fff', borderWidth: '2'}}>
          <Text style={{ textAlign: 'left', color: '#fff', fontSize: 18}}> {item} {'\n'} Ranking:  {rank[index]} </Text>
          </TouchableOpacity>
          }
        /> 

            
      </View>
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
