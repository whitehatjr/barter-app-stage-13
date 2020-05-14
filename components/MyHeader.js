import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import db from '../config'
import firebase from 'firebase';

export default class MyHeader extends Component{
  constructor(props){
    super(props)
    this.state={
      userId : firebase.auth().currentUser.email,
      value:""
    }
  }

getNumberOfUnreadNotifications(){
  db.collection('all_notifications').where('notification_status','==',"unread").where('targeted_user_id','==',this.state.userId)
  .onSnapshot((snapshot)=>{
    var unreadNotifications = snapshot.docs.map((doc) => doc.data())
    this.setState({
      value: unreadNotifications.length
    })
  })
}

componentDidMount(){
  this.getNumberOfUnreadNotifications()
}


 BellIconWithBadge=()=>{
    return(
      <View>
        <Icon name='bell' type='font-awesome' color='#ffffff' size={25}
          onPress={() =>this.props.navigation.navigate('Notification')}/>
         <Badge
          value={this.state.value}
         containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
      </View>
    )
  }

  render(){
    return(
        <Header
          leftComponent={<Icon name='bars' type='font-awesome' color='#ffffff'  onPress={() => this.props.navigation.toggleDrawer()}/>}
          centerComponent={{ text: this.props.title, style: { color: '#ffffff', fontSize:20,fontWeight:"bold", } }}
          rightComponent={<this.BellIconWithBadge {...this.props}/>}
          backgroundColor = "#32867d"
        />

)
}

}
