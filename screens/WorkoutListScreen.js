import React, { Component } from 'react';
import WorkoutList from '../components/WorkoutList.js'
import { AppRegistry,Text,ScrollView,Button} from 'react-native';

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
    this.props.dispatch(fetchWorkouts())

  }

  handleAddWorkout=()=>{
    // console.log('in handle add workout', this.props)
    this.props.dispatch(postNewWorkout({
      name:this.state.text,
      exercises:[]
      // schedule_id: this.props.currentSchedule.id,
    },this.props.currentSchedule))

    // this.props.dispatch(fetchSchedulesWorkouts(this.props.currentSchedule))
    // console.warn('handle add workout',this.props.currentSchedule.workouts)
  }


  render() {

    return (
      <ScrollView className="WorkoutList">
        <WorkoutList
          workouts={this.props.currentSchedule.workouts}
          handlePress={this.props.navigation.navigate}
        />
        <Input
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <ButtonElement
          title="Add New Workout"
          onPress={() => this.handleAddWorkout()}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.navigate('ScheduleList')}
        />



      </ScrollView>
    );
  }
}
function mapStateToProps(state){
  console.log('workoutlistscreen mapstateprops',state)
  return {
    currentSchedule:state.currentSchedule,
  }
}

export default connect(mapStateToProps)(WorkoutListScreen)
