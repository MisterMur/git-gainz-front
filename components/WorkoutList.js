//react imports
import React from "react"
import {View,Text} from 'react-native'
import {connect} from 'react-redux'

//component imports
import Workout from './Workout.js'

const WorkoutList = (props) => {
  const renderWorkouts=()=>{
    if(props.workouts){
      return props.workouts.map((workout,idx)=>{
        return (
            <Workout
              key={idx}
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
