import React, { Component } from 'react';
import WorkoutList from '../components/WorkoutList.js'
import { AppRegistry,Text,ScrollView,Button} from 'react-native';

import { Card,Input, Button as ButtonElement } from 'react-native-elements'


import Workout from '../components/Workout.js'
import {connect} from 'react-redux'
import {fetchSchedulesWorkouts,fetchWorkout,postNewWorkout} from '../actions/workoutActions.js'
// import { fetchSchedulesWorkouts,fetchWorkouts,postNewWorkout} from '../reducers/reducer.js'


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
    this.props.fetchSchedulesWorkouts(this.props.currentSchedule)

  }

  handleAddWorkout=()=>{
    console.log('in handle add workout', this.props.currentSchedule)
    const workout = {
      name:this.state.text,
      exercises:[]
    }
    this.props.postNewWorkout(workout, this.props.currentSchedule)
    this.setState({text:''})
  }
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
    return (
      <ScrollView className="WorkoutList">
        {this.props.currentSchedule?this.renderWorkoutList():null}
        {this.renderAddWorkoutForm()}
        {this.renderNav()}

      </ScrollView>
    );
  }
}
const mapDispatchToProps=dispatch=>({
  fetchSchedulesWorkouts:(w)=>dispatch(fetchSchedulesWorkouts(w)),
  postNewWorkout:(w,s)=>dispatch(postNewWorkout(w,s)),
})


function mapStateToProps(state){
  // console.log('workoutlistscreen mapstateprops',state)
  const {schedule} = state
  return {
    currentSchedule:schedule.currentSchedule,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(WorkoutListScreen)
