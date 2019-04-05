import React from "react"
import {View,Text} from 'react-native'
import {connect} from 'react-redux'
import Schedule from './Schedule.js'
// import uuid from 'uuid'
import {FormInput,FormLabel} from 'react-native-elements'

const ScheduleList = (props) => {

  const renderSchedules=()=>{
    // console.log('schedule list props:',props)
    if(props.schedules){
      // console.log('in render schedules',props.schedules)
      return props.schedules.map((schedule,id)=>{
        // console.log('schedule:',schedule)
        return (
          <View>
            <Schedule
            key={id}
            schedule={schedule}
            handlePress={props.handlePress}
            />
          </View>
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
