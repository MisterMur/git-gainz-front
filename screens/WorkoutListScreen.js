import React, { Component } from 'react';
import WorkoutList from '../components/WorkoutList.js'
import { AppRegistry, TextInput,Text,View,Button} from 'react-native';

import Workout from '../components/Workout.js'
import {connect} from 'react-redux'


export default class WorkoutListScreen extends Component {
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
    const workouts = this.props.navigation.getParam("workouts",'NO-EXERCISES')
    console.log('in render workoutlistscreen workouts ',workouts)
    // console.log('in render workoutlistscreen props',this.props)
    return (
      <View className="WorkoutList">
        <WorkoutList
          workouts={workouts}
          handlePress={this.props.navigation.navigate}
        />
      </View>
    );
  }
}
function mapStateToProps(state){
  return {
    workouts:state.workouts
  }
}
function mapDispatchToProps(prevState){

}
// export default connect(mapStateToProps,mapDispatchToProps)(WorkoutListScreen)
