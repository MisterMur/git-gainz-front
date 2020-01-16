import React from "react";
import {connect} from 'react-redux'

import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';
import { DrawerActions } from 'react-navigation';

import { Card,Input, Button as ButtonElement } from 'react-native-elements'
import FAIcon from 'react-native-vector-icons/FontAwesome'

import {fetchSchedulesWorkouts,fetchWorkout,postNewWorkout} from '../actions/workoutActions.js'

import WorkoutList from '../components/WorkoutList.js'
import Workout from '../components/Workout.js'

import colors from '../styles/colors'


class WorkoutListScreen extends React.Component {
  static navigationOptions = {
    title: 'Workout List',

  };
  state={
    text:'Enter Workout Name Here'
  }

  componentDidMount(){
    this.props.fetchSchedulesWorkouts(this.props.currentSchedule)

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

  handleAddWorkout=()=>{
    if ( this.state.text!=''){

      const workout = {
        name:this.state.text,
        exercises:[]
      }
      this.props.postNewWorkout(workout, this.props.currentSchedule)
      this.setState({text:''})
    }
  }
  renderWorkoutList=()=>{
    return (
      <WorkoutList
        workouts={this.props.workouts}
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
        {this.renderNavBar()}
        {this.props.currentSchedule?this.renderWorkoutList():null}
        {this.renderAddWorkoutForm()}

      </ScrollView>
    );
  }
}
const mapDispatchToProps=dispatch=>({
  fetchSchedulesWorkouts:(w)=>dispatch(fetchSchedulesWorkouts(w)),
  postNewWorkout:(w,s)=>dispatch(postNewWorkout(w,s)),
})


function mapStateToProps(state){

  const {schedule,workout} = state
  return {
    workouts: schedule.currentSchedule.workouts,
    currentSchedule:schedule.currentSchedule,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(WorkoutListScreen);



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
