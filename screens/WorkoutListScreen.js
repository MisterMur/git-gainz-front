import React, { Component } from 'react';
import WorkoutList from '../components/WorkoutList.js'
import { Alert,AppRegistry,Text,ScrollView,Button} from 'react-native';

import { Card,Input, Button as ButtonElement } from 'react-native-elements'


import Workout from '../components/Workout.js'
import {connect} from 'react-redux'
import { fetchSchedulesWorkouts,fetchWorkouts,postNewWorkout} from '../reducers/reducer.js'


class WorkoutListScreen extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: 'Workout List',

  };
  state={
    text:''
  }


  componentDidMount(){
    this.props.dispatch(fetchSchedulesWorkouts(this.props.currentSchedule))

  }
  //**************************************************************************************
  //********************         EVENT HANDLERS
  //**************************************************************************************

  handleAddWorkout=()=>{
    if(this.state.text){
      this.props.dispatch(postNewWorkout({
        name:this.state.text,
        exercises:[]
      },this.props.currentSchedule))
    }else{
      this.renderAlert()
    }
    this.setState({text:''})
  }

  //**************************************************************************************
  //********************         RENDER FUNCTIONS
  //**************************************************************************************

  renderWorkoutList=()=>{
    return (
      <WorkoutList
        workouts={this.props.currentSchedule.workouts}
        handlePress={this.props.navigation.navigate}
      />
    )
  }

  renderAddWorkoutForm=()=>{
    return (
      <>
        <Input
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <ButtonElement
          title="Add New Workout"
          onPress={() => this.handleAddWorkout()}
        />
      </>
    )
  }

  renderAlert=()=>{
    // Works on both iOS and Android
    Alert.alert(
      'Missing Workout Name',
      'Please Enter a Workout Name before continuing',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
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
    // console.warn(this.props)
    return (
      <ScrollView className="WorkoutList">
        {this.props.currentSchedule?this.renderWorkoutList():null}
        {this.renderAddWorkoutForm()}
        {this.renderNav()}

      </ScrollView>
    );
  }
}
function mapStateToProps(state){
  // console.log('workoutlistscreen mapstateprops',state)
  return {
    currentSchedule:state.currentSchedule,
  }
}

export default connect(mapStateToProps)(WorkoutListScreen)
