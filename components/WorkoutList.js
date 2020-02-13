import React from "react"
import {View,Text} from 'react-native'
import {connect} from 'react-redux'
import Workout from './Workout.js'
// import uuid from 'uuid'

const WorkoutList = (props) => {
  const renderWorkouts=()=>{
    if(props.workouts){
      return props.workouts.map((workout,id)=>{
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


export default connect()(WorkoutList)
