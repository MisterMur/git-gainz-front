//react imports
import React from "react"
import {View,Text} from 'react-native'
import {connect} from 'react-redux'

//library imports
import {FormInput,FormLabel} from 'react-native-elements'

//component imports
import Schedule from './Schedule.js'

const ScheduleList = (props) => {

  const renderSchedules=()=>{
    if(props.schedules){
      return props.schedules.map((schedule,idx)=>{
        return (
            <Schedule
              key={idx}
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
