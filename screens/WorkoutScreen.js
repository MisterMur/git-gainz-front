import React, { Component } from 'react';
import { AppRegistry, TextInput,Text,ScrollView,View,Button} from 'react-native';
import {  Button as ButtonElement ,Input} from 'react-native-elements'

import Exercise from '../components/Exercise.js'
import {connect} from 'react-redux'
import {postNewExercise,postNewCompleteWorkout,fetchWorkoutsExercises,fetchWorkouts,addWorkout} from '../actions/workoutActions.js'
import {fetchSchedules} from '../actions/scheduleActions.js'
// import {postNewExercise,postNewCompleteWorkout,,fetchWorkouts,addWorkout} from '../reducers/reducer.js'

class WorkoutScreen extends Component {
  static navigationOptions = {
    title: 'Workout',

  };

  constructor(props) {
    super(props);

  }
  componentDidMount(){
    this.props.dispatch(fetchWorkoutsExercises(this.props.currentWorkout))
  }
  state={
    text:'',
    workout:{
      exercises:{}
    }
  }

  renderExercises=()=>{
    // console.log('workout screen render exercises',this.props.currentWorkout)
    if(this.props.currentWorkout.exercises){
      // console.log('render exercises currentworkoutExercises',this.props.currentWorkout.exercises)
      return this.props.currentWorkout.exercises.map((exercise,id)=>{
        // console.log(exercise)
        return(
            <Exercise
              key={exercise.id}
              exercise={exercise}
            />
        )
      })
    }
  }
  addNewExercise=()=>{
    // console.log('in handle add new exercise', this.props.currentWorkout)
    this.props.dispatch(postNewExercise({
      name:this.state.text,
      sets:[]

      // schedule_id: this.props.currentSchedule.id,
    },this.props.currentWorkout))

    // this.props.dispatch(fetchWorkouts())
    // this.props.dispatch(addWorkout({
    //   name:this.state.text,
    //   sets:[]
    // }))
    this.setState({text:''})
    // console.warn(this.props.workouts)
  }
  handleAddExercise=()=>{
    this.props.dispatch(postNewExercise({
      name:this.state.text,
      sets:[]
    }))
    this.props.dispatch(fetchSchedules())
  }
  handleCompleteWorkout=()=>{
    this.props.dispatch(postNewCompleteWorkout(this.props.currentUser,this.props.currentWorkout))

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
        onPress={() => this.props.navigation.navigate('WorkoutList')}
      />

      </>
    )
  }
  renderAddExerciseForm=()=>{
    return (
      <>
      <Input
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
      <ButtonElement
        backgroundColor='#03A9F4'
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='Add New Exercise'
        onPress={this.addNewExercise}
      />
      </>
    )
  }


  render() {
    // const {navigation} = this.props
    // console.log('workoutscreen props',this.props)
    // console.log('navigation in render workoutScreen: ',navigation)
    // const name = navigation.getParam("name",'NO-EXERCISES')
    // const exercises = navigation.getParam("exercises",'NO-EXERCISES')
    // console.log('exercises',exercises)
    return (
      <ScrollView>
        {this.renderAddExerciseForm()}
        {this.renderExercises()}
        <ButtonElement
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='Finish Workout'
          onPress={this.handleCompleteWorkout}
        />
        {this.renderNav()}

      </ScrollView>
    );
  }
}
function mapStateToProps(state){
  return {
    currentWorkout:state.currentWorkout,
    currentUser:state.currentUser
  }

}
export default connect(mapStateToProps)(WorkoutScreen)
