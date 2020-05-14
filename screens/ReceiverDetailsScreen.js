import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';
import { RFValue } from "react-native-responsive-fontsize";
import db from '../config.js';

export default class ReceiverDetailsScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      userId          : firebase.auth().currentUser.email,
      userName          :'',
      receiverId      : this.props.navigation.getParam('details')["username"],
      exchangeId       : this.props.navigation.getParam('details')["exchangeId"],
      itemName        : this.props.navigation.getParam('details')["item_name"],
      description  : this.props.navigation.getParam('details')["description"],
      receiverName    : '',
      receiverContact : '',
      receiverAddress : '',
      receiverRequestDocId : ''
    }
  }

  getUserDetails=(userId)=>{
      db.collection("users").where('email_id','==', userId).get()
      .then((snapshot)=>{
        snapshot.forEach((doc) => {
          console.log(doc.data().first_name);
          this.setState({
            userName  :doc.data().first_name + " " + doc.data().last_name
          })
        })
      })
    }


getreceiverDetails(){
  console.log("receiver ",this.state.receiverId);
  db.collection('users').where('username','==',this.state.receiverId).get()
  .then(snapshot=>{
    snapshot.forEach(doc=>{
      this.setState({
        receiverName    : doc.data().first_name,
        receiverContact : doc.data().mobile_number,
        receiverAddress : doc.data().address,
      })
    })
  });

  db.collection('exchange_requests').where('exchangeId','==',this.state.exchangeId).get()
  .then(snapshot=>{
    snapshot.forEach(doc => {
      this.setState({receiverRequestDocId:doc.id})
   })
})}

updateBarterStatus=()=>{
  db.collection('all_Barters').add({
    item_name           : this.state.itemName,
    exchange_id          : this.state.exchangeId,
    requested_by        : this.state.receiverName,
    donor_id            : this.state.userId,
    request_status      :  "Donor Interested"
  })
}



  addNotification=()=>{
    console.log("in the function ",this.state.rec)
    var message = this.state.userName + " has shown interest in exchanging the item"
    db.collection("all_notifications").add({
      "targeted_user_id"    : this.state.receiverId,
      "donor_id"            : this.state.userId,
      "exchangeId"          : this.state.exchangeId,
      "item_name"           : this.state.itemName,
      "date"                : firebase.firestore.FieldValue.serverTimestamp(),
      "notification_status" : "unread",
      "message"             : message
    })
  }



componentDidMount(){
  this.getreceiverDetails()
  this.getUserDetails(this.state.userId)
}


  render(){
    return(
      <View style={styles.container}>
        <View style={{flex:0.1}}>
          <Header
            leftComponent ={<Icon name='arrow-left' type='feather' color='#ffff'  onPress={() => this.props.navigation.goBack()}/>}
            centerComponent={{ text:"Exchange Items", style: { color:'#ffff', fontSize:20,fontWeight:"bold", } }}
            backgroundColor = "#32867d"
          />
        </View>
        <View style={{flex:0.3,marginTop:RFValue(20)}}>
          <Card
              title={"Item Information"}
              titleStyle= {{fontSize : 20}}
            >
            
              <Text style={{fontWeight:'bold'}}>Name : {this.state.itemName}</Text>
            
              <Text style={{fontWeight:'bold'}}>Reason : {this.state.description}</Text>
          
          </Card>
        </View>
        <View style={{flex:0.3}}>
          <Card
            title={"Receiver Information"}
            titleStyle= {{fontSize : 20}}
            >
            <Card>
              <Text style={{fontWeight:'bold'}}>Name: {this.state.receiverName}</Text>
            
              <Text style={{fontWeight:'bold'}}>Contact: {this.state.receiverContact}</Text>
            
              <Text style={{fontWeight:'bold'}}>Address: {this.state.receiverAddress}</Text>
            </Card>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {
            this.state.receiverId !== this.state.userId
            ?(
              <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{
                    this.updateBarterStatus()
                    this.addNotification()
                    this.props.navigation.navigate('MyBarters')
                  }}>
                <Text style={{color:'#ffff'}}>I want to Exchange</Text>
              </TouchableOpacity>
            )
            : null
          }
        </View>
      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center',
    marginTop:RFValue(30)
  },
  button:{
    width:200,
    height:50,
    justifyContent:'center',
    alignItems : 'center',
    borderRadius: 10,
    backgroundColor: '#32867d',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  }
})
