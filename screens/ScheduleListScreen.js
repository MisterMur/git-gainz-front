import React, { Component } from 'react';
import { AppRegistry, Alert,TextInput,Text,View,Button,ScrollView} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Card, ListItem, Button as ButtonElements ,Divider,Input} from 'react-native-elements'

import ScheduleList from '../components/ScheduleList.js'
import Drawer from 'react-native-circle-drawer'


import { fetchSchedules,postNewSchedule} from '../reducers/reducer.js'

class ScheduleListScreen extends Component {
  static navigationOptions = {
    title: 'Schedules List',

  };
  state={
    text:''
  }


  constructor(props) {
    super(props);

  }
  componentDidMount(){
    // console.log('in did mount')
    this.props.dispatch(fetchSchedules())

  }
  //**************************************************************************************
  //********************         EVENT HANDLERS           ********************************
  //**************************************************************************************

  handleAddSchedule=(e)=>{
    if(this.state.text){
      this.props.dispatch(postNewSchedule({
        name:this.state.text,
        workouts:[]
      }))
      this.props.dispatch(fetchSchedules())
    }else{
      this.renderAlert()
    }
    this.setState({text:''})

  }

  //**************************************************************************************
  //********************         RENDER FUNCTIONS
  //**************************************************************************************
  renderAlert=()=>{
    // Works on both iOS and Android
    Alert.alert(
      'Missing Schedule Name',
      'Please Enter a Schedule Name before continuing',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );

  }
  renderNewScheduleForm=()=>{
    return (
      <>
        <Input
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <ButtonElements
          title="Add New Schedule"
          onPress={() => this.handleAddSchedule()}
        />
      </>
    )
  }
  renderNav=()=>{
    return (
      <>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.navigate('ScheduleList')}
        />
      </>
    )
  }

  render() {
    const {error,loading,schedules}=this.props
    return (
      <ScrollView>

        <ScheduleList
        schedules={schedules}
        handlePress={this.props.navigation.navigate}
        />
        {this.renderNewScheduleForm()}
        {this.renderNav()}
      </ScrollView>
    );
  }
}
const mapStateToProps=state=>({
  schedules:state.schedules,
  loading:state.loading,
  error:state.error
})

export default connect(mapStateToProps)(ScheduleListScreen)
