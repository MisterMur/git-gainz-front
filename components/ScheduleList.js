import React from "react"
import {View,Text} from 'react-native'
import {connect} from 'react-redux'
import Schedule from './Schedule.js'
// import uuid from 'uuid'
import {FormInput,FormLabel} from 'react-native-elements'

const ScheduleList = (props) => {

  const renderSchedules=()=>{
    if(props.schedules){
      return props.schedules.map((schedule,id)=>{
        return (

            <Schedule
            key={schedule.id}
            schedule={schedule}
            handlePress={props.handlePress}
            />

        )
      })
    }
  }
  return (
  <View className="ScheduleList">
      {renderSchedules()}

  </View>
  )
}
export default connect()(ScheduleList)
