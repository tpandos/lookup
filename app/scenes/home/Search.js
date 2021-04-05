import React, {useState, useContext} from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Component } from 'react'
import { FlatList,Keyboard, Image, ImageBackground, Linking, ScrollView, StyleSheet, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable'
import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import Form, { TYPES } from 'react-native-basic-form';
import {ErrorText} from "../../components/Shared";
import { Button } from 'react-native';


export default function Search (props) {
  const {navigation} = props;

  const {navigate} = props.navigation;

const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
const { state, updateUser } = useAuth();
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
      
      //updateUser(response.user);

      setLoading(false);

      navigation.goBack();
    } catch (error) {
        setError(error.message);
        setLoading(false)
    }
}
  

/*export default class Search extends Component{
  state = {searchBarFocused:false}
    componentDidMount(){
      this.keyboardDidShow = Keyboard.addListener ('keyboardDidShow', this.keyboardDidShow)
      this.keyboardWillShow = Keyboard.addListener ('keyboardWillShow', this.keyboardWillShow)
      this.keyboardWillHide = Keyboard.addListener ('keyboardWillHide', this.keyboardWillHide)
    }
  
    keyboardDidShow = () => {this.setState({searchBarFocused: true})}
    keyboardWillShow = () => {this.setState({searchBarFocused: true})}
    keyboardWillHide = () => {this.setState({searchBarFocused: false})}*/

    /*<Animatable.View animation = "slideInRight" duration= {1000} style= {{width: 410, height: 50, backgroundColor: 'white', 
                flexDirection:'row', padding: 5, alignItems: 'center', paddingRight:5, borderRadius: 1}}>
                  <Animatable.View animation ={searchBarFocused ? "fadeInLeft" : "fadeInRight"} duration = {400}> 
                  <Icon name= {searchBarFocused ? "md-arrow-back": "ios-search"} style={{fontSize: 24}}/>
                  </Animatable.View>
                  /*<TextInput 
                  placeholder="Search for keywords" style={{fontSize:15, marginLeft:15, flex: 2}}
                  onChangeText = {(text) => onSubmit(text)}
                   />
                </Animatable.View>*/

    //render(){
      //flex: 1, paddingHorizontal: 15, backgroundColor:'#37474f'
                        //<Icon name= {searchBarFocused ? "md-arrow-back": "ios-search"} style={{fontSize: 24}}/>
        
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
                    // initialData={state.user}
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



      /*<FlatList to display the list of itmes
      style= {{backgroundColor: searchBarFocused?'rgba(0,0,0,0.3)':'white'}}
      data = {ListItems}
        renderItem = {
          ({item}) => 
            <TouchableOpacity
            style={{backgroundColor: '#37474f', marginTop:2, marginLeft: 10, padding: 10, width: 150, borderRadius: 30, marginHorizontal: 2, borderColor:'#fff', borderWidth: '2'}}>
            <Text style={{ textAlign: 'left', color: '#fff', fodntSize: 18}}> {item}</Text>
            </TouchableOpacity>
        }
        keyExtractor = {(item,index) => index.toString()}/>
        */

      /*const App = () => {
        const [selectedValue, setSelectedValue] = useState("distance");
        return (
          <View style={styles.container}>
            <Picker
              selectedValue={selectedValue}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
              <Picker.Item label= "Distance" value="distance" />
              <Picker.Item label="Ranking" value="ranking" />
            </Picker>
          </View>
        );
      }*/
      
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: "#eaeaea"
        }
      })