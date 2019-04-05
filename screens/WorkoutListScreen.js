import React, { Component } from 'react';
import WorkoutList from '../components/WorkoutList.js'
import { AppRegistry, TextInput,Text,View,Button} from 'react-native';

import Workout from '../components/Workout.js'
import {connect} from 'react-redux'


class WorkoutListScreen extends Component {
  static navigationOptions = {
    title: 'Workout List',

  };

  constructor(props) {
    super(props);
    // console.log('workoutlist screen',props)

  }
  componentDidMount(){
    // const userUrl='http://localhost:3000/api/v1/users/13'
    // fetch(userUrl)
    // .then(res=>{
    //
    //   return res.json()
    // })
    // .then(users=>{
    //   console.log('in fetch',users)
    //   this.props.dispatch({users})
    //
    // })
    // console.log('fetched')
  }


  render() {
    // const workouts = this.props.navigation.getParam("workouts",'NO-EXERCISES')
    // console.log('in render workoutlistscreen workouts ',workouts)
    console.log('in render workoutlistscreen props',this.props)
    return (
      <View className="WorkoutList">
        <WorkoutList
          workouts={this.props.currentSchedule.workouts}

          handlePress={this.props.navigation.navigate}
        />
      </View>
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
