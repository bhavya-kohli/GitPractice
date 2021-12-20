import React from 'react';
import { StyleSheet, Text, TextInput, View,Button, Touchable, TouchableOpacity } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
//import database from 'firebase/';
import firebaseConfig from './config';
import Listing from './components/listing';
import { Item, Input, Label} from 'native-base';
//import Constants from 'expo-constants'
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  state={
    text:"",
    mylist:[]
  }
  componentDidMount(){
    const myItems=firebase.database().ref("mywishes");
    //console.log(myItems)
    myItems.on("value",datasnap=>{
      //console.log(Object.values(datasnap.val()))
      if(datasnap.val()){
      this.setState({mylist:Object.values(datasnap.val())})
      }
    })
  }
  saveitem(){
    //console.log(this.state.text);
    const mywishes=firebase.database().ref("mywishes");
    mywishes.push().set({
      text:this.state.text,
      time:Date.now()
    }).then((data)=>{
      console.log(data)
      this.setState({text:""})
    }).catch((err)=>{
      console.log(err.message)
    })
  }

  removeIt(){
      firebase.database().ref("mywishes").remove();
      this.setState({mylist:[]});
  }

  render(){
    console.log(this.state)
  return (
    <View style={styles.container}>
          
          <TextInput placeholder='username' style={{width:100,height:20}}  value={this.state.text} on onChangeText={(text)=>this.setState({text:text})}/>
          {/* {this.state.mylist.length>0 && <Text>{this.state.mylist[0].text}</Text> } */}
          <Listing list={this.state.mylist}/>
          <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={()=>this.saveitem()}><Text style={{color:"#fff"}}>submit</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={()=>this.removeIt()}><Text style={{color:"#fff"}}>Empty</Text></TouchableOpacity>
          </View>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:20
  },
  buttonContainer:{
    flexDirection:"row",
    justifyContent:"space-around",
    height:"40",
    alignItems:"center",
  },
  button:{
    padding:10,
    width:80,
    justifyContent:"center",
    color:"#fff",
    backgroundColor:"black",
    borderRadius:20,
    alignItems:"center",
    marginHorizontal:20,
    marginVertical:20
  }
});
