import React from "react"
import {View,Text} from 'react-native'
import {connect} from 'react-redux'
import Workout from './Workout.js'
// import uuid from 'uuid'

const WorkoutList = (props) => {
  const renderWorkouts=()=>{
    console.log('in render workouts',props)
    if(props.workouts){
      return props.workouts.map((workout,id)=>{
        console.log('workout:',workout)
        return (

            <Workout
              key={workout.id}
              workout={workout}
              handlePress={props.handlePress}
            />
        )
      })
    }
  }
  return (
  <View className="WorkoutList">
      {renderWorkouts()}
  </View>
  )
}
// function mapStateToProps(state){
//   return{
//     workouts: state.workouts
//   }
// }

export default connect()(WorkoutList)
