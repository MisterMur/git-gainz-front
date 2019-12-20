import React, { Component } from 'react';
import {
   ScrollView,
   View,
   StyleSheet,
   TextInput,
   Text,
   Button,
   TouchableOpacity,
 } from 'react-native';
 import { DrawerActions } from 'react-navigation';

import {  Button as ButtonElement ,Input} from 'react-native-elements'
import FAIcon from 'react-native-vector-icons/FontAwesome'


import Exercise from '../components/Exercise.js'
import {connect} from 'react-redux'
import {postNewExercise} from '../actions/exerciseActions'
import {postNewCompleteWorkout,fetchWorkoutsExercises,fetchWorkouts,addWorkout} from '../actions/workoutActions.js'
import {fetchSchedules} from '../actions/scheduleActions.js'

import colors from '../styles/colors'

class WorkoutScreen extends Component {
  static navigationOptions = {
    title: 'Workout',

  };

  constructor(props) {
    super(props);

  }
  componentDidMount(){
    this.props.fetchWorkoutsExercises(this.props.currentWorkout)
  }
  state={
    text:'',
    workout:{
      exercises:{}
    }
  }
  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }
  renderNavBar() {
      return (
          <View style={ styles.navBar }>
              <TouchableOpacity onPress={ this.openDrawer }>
                  <FAIcon name='bars' size={22} style={{ color: colors.bdMainRed }} />
              </TouchableOpacity>
          </View>
      )
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
    this.props.postNewExercise({
      name:this.state.text,
      sets:[]
    },this.props.currentWorkout)

    this.setState({text:''})
  }
  handleAddExercise=()=>{
    this.props.postNewExercise({
      name:this.state.text,
      sets:[]
    })
    this.props.fetchSchedules()
  }
  handleCompleteWorkout=()=>{
    this.props.postNewCompleteWorkout(this.props.currentWorkout)

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
        {this.renderNavBar()}
        {this.renderAddExerciseForm()}
        {this.renderExercises()}
        <ButtonElement
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='Finish Workout'
          onPress={this.handleCompleteWorkout}
        />

      </ScrollView>
    );
  }
}
const mapDispatchToProps=dispatch=>({
  postNewExercise:(e,w)=>dispatch(postNewExercise(e,w)),
  fetchSchedules:()=>dispatch(fetchSchedules()),
  fetchWorkoutsExercises:(w)=>dispatch(fetchWorkoutsExercises(w)),
  postNewCompleteWorkout:(w)=>dispatch(postNewCompleteWorkout(w))
})
function mapStateToProps(state){
  const {workout,user} = state

  return {
    currentWorkout:workout.currentWorkout,
    currentUser:user.currentUser
  }

}
export default connect(mapStateToProps,mapDispatchToProps)(WorkoutScreen)

const styles = StyleSheet.create({
  navBar: {
      height: 50,
      justifyContent: 'center',
      paddingHorizontal: 25
  },
  addButton:{
    position: 'absolute',
    bottom:20,
    right:20,
    padding: 5,
    height: 50,
    width: 50,  //The Width must be the same as the height
    borderRadius:100, //Then Make the Border Radius twice the size of width or Height
    backgroundColor:colors.bgMainRed,
    zIndex:999,

  },

})
