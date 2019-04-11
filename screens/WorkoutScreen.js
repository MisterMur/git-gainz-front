import React, { Component } from 'react';
import { AppRegistry, TextInput,Text,ScrollView,View,Button} from 'react-native';
import {  Button as ButtonElement ,Input} from 'react-native-elements'

import Exercise from '../components/Exercise.js'
import {connect} from 'react-redux'
import {postNewExercise,fetchSchedules} from '../reducers/reducer.js'

class WorkoutScreen extends Component {
  static navigationOptions = {
    title: 'Workout',

  };

  constructor(props) {
    super(props);

  }
  state={
    text:''
  }

  renderExercises=()=>{
    console.log('workout screen render exercises',this.props.currentWorkout)
    if(this.props.currentWorkout.exercises){
      console.log('render exercises currentworkoutExercises',this.props.currentWorkout.exercises)
      return this.props.currentWorkout.exercises.map((exercise,id)=>{
        console.log(exercise)
        return(
          <View>
            <Exercise
            key={id}
            exercise={exercise}
            />
          </View>
        )
      })
    }
  }
  addNewExercise=()=>{
    console.log('in handle add new exercise', this.props.currentWorkout)
    this.props.dispatch(postNewExercise({
      name:this.state.text,
      sets:[]

      // schedule_id: this.props.currentSchedule.id,
    },this.props.currentWorkout))

    this.props.dispatch(fetchSchedules())
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
        {this.renderExercises()}
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
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.navigate('WorkoutList')}
        />
      </ScrollView>
    );
  }
}
function mapStateToProps(state){
  return {
    currentWorkout:state.currentWorkout
  }

}
export default connect(mapStateToProps)(WorkoutScreen)
