import React, { Component } from 'react';
import { AppRegistry, TextInput,Text,View,Button,ScrollView} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Card, ListItem, Button as ButtonElements ,Divider,Input} from 'react-native-elements'

import ScheduleList from '../components/ScheduleList.js'
import Drawer from 'react-native-circle-drawer'

class StatisticsScreen extends React {

 constructor(props){
   super(props)
 }

 render() {
   return (
     <View>

     </View>
   )
 }

}
const mapStateToProps=state=>({
  currentUser:state.currentUser,
  completedWorkouts:state.completedWorkouts,
  error:state.error
})

export default connect(mapStateToProps)(StatisticsScreen)
