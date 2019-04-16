import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Alert,AppRegistry, TextInput,Text,ScrollView,View,Button} from 'react-native';
import {  Button as ButtonElement ,Input} from 'react-native-elements'
import {postNewExercise,postNewCompleteWorkout,fetchSchedules,fetchWorkoutsExercises,fetchWorkouts,addWorkout} from '../reducers/reducer.js'

import Exercise from '../components/Exercise.js'
import MusclePicker from '../components/Dropdown.js'

import {styles} from '../constants/Styles.js'



class WorkoutScreen extends Component {
  static navigationOptions = {
    title: 'Workout',

  };

  constructor(props) {
    super(props);

  }
  componentDidMount(){
    if(this.props.currentWorkout){
      this.props.dispatch(fetchWorkoutsExercises(this.props.currentWorkout))
    }
  }
  state={
    text:'',
    workout:{
      exercises:{}
    },
    showAddExercise:false,
    muscle: 'Please Select a Muscle Group'
  }

  //**************************************************************************************
  //********************         EVENT HANDLERS           ********************************
  //**************************************************************************************

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
    if(this.state.showAddExercise){
      if((this.state.text) && (this.state.muscle!='Please Select a Muscle Group')){
        this.props.dispatch(postNewExercise({
          name:this.state.text,
          muscle:this.state.muscle,
          sets:[]
        },this.props.currentWorkout))
        this.setState({text:''})
      }else{
        this.renderAlert()
      }
    }
    this.setState({showAddExercise:!this.state.showAddExercise})
  }
  handleAddExercise=()=>{
    this.props.dispatch(postNewExercise({
      name:this.state.text,
      sets:[]
    }))
    this.props.dispatch(fetchSchedules())
  }
  handleCancelExerciseForm=()=>{
    this.setState({showAddExercise:false})
  }
  handleCompleteWorkout=()=>{
    this.props.dispatch(postNewCompleteWorkout(this.props.currentUser,this.props.currentWorkout))

  }
  handleMuscleChange = (muscle) => {
     this.setState({  muscle })
  }

  //**************************************************************************************
  //********************         RENDER FUNCTIONS
  //**************************************************************************************

  renderAlert=()=>{
    // Works on both iOS and Android
    Alert.alert(
      'Invalid Exercise Information',
      'Please Enter a Workout Name and select a muscle group before continuing',
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
        onPress={() => this.props.navigation.navigate('WorkoutList')}
      />

      </>
    )
  }

  renderAddExerciseForm=()=>{
    return (
      <View style={{flex:1,flexDirection:'column',justifycontent:'space-between'}}>
        <View >
          <Input
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          <MusclePicker handleMuscleChange={this.handleMuscleChange} muscle={this.state.muscle}/>
        </View>
        <ButtonElement
          backgroundColor={styles.button.backgroundColor}
          buttonStyle={styles.buttonStyle}
          title='Cancel'
          onPress={this.handleCancelExerciseForm}
        />

      </View>
    )
  }
  renderWorkoutScreen=()=>{
    return (
      <>
        <ButtonElement
          backgroundColor={styles.button.backgroundColor}
          buttonStyle={styles.buttonStyle}
          title='Add New Exercise'
          onPress={this.addNewExercise}
        />
        {this.state.showAddExercise? this.renderAddExerciseForm():null}
        {this.renderExercises()}
        <ButtonElement
          backgroundColor={styles.button.backgroundColor}
          buttonStyle={styles.buttonStyle}
          title='Finish Workout'
          onPress={this.handleCompleteWorkout}
        />
        {this.renderNav()}
      </>
    )
  }
  renderNoWorkoutError=()=>{
    return (
      <Text>Please select a workout</Text>
    )
  }


  render() {

    return (
      <ScrollView>
        {this.props.currentWorkout?this.renderWorkoutScreen():this.renderNoWorkoutError()}


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
