import React from "react";
import {Text,View,FlatList,StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import SET_CURRENT_SCHEDULE from '../constants/types.js'
// import {viewWorkouts} from '../reducer'
import store from '../store.js'


// import {colors, fonts, padding, dimensions} from '../styles/base.js'
import { Card, ListItem, Button ,Divider,FormInput,FormLabel} from 'react-native-elements'
import {setCurrentSchedule} from '../actions/scheduleActions.js'
import {Actions} from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/FontAwesome';


class Schedule extends React.Component {

  constructor(props){
    super(props)
  }
  handlePressButton=()=>{
    this.props.setCurrentSchedule(this.props.schedule)
    this.props.handlePress('WorkoutList')
    // Actions.WorkoutList()
  }

  render() {
    return (
      <View>
        <Card  title={this.props.schedule.name} dividerStyle="3">
          <Text style={{marginBottom: 10,flex:2}}>
            {this.props.schedule.workouts.length} Workout(s)
          </Text>
          <Divider style={{ backgroundColor: 'red' }} />

          <Button
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW NOW'
            onPress={this.handlePressButton}
           />
        </Card>
      </View>
    )
  }
}
const mapDispatchToProps= dispatch=> ({
  setCurrentSchedule:(schedule)=>dispatch(setCurrentSchedule(schedule))
})

function mapStateToProps(state){
  const {schedule}=state

  return {

    currentSchedule:schedule.currentSchedule,
    schedules:schedule.schedules,
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(Schedule)
