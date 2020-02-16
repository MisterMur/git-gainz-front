//react imports
import React from "react";
import {Text,View,FlatList,StyleSheet} from 'react-native'
import {connect} from 'react-redux'

//library ipmorts
import { Card, ListItem, Button ,Divider,FormInput,FormLabel} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

//component imports

//actions imports
import {setCurrentSchedule} from '../actions/scheduleActions.js'
import {resetWorkouts} from '../actions/workoutActions.js'

//constants imports

//styles imports
import {styles} from '../styles/styles'


class Schedule extends React.Component {

  constructor(props){
    super(props)
  }
  handlePressButton=()=>{
    this.props.resetWorkouts()
    this.props.setCurrentSchedule(this.props.schedule)
    this.props.handlePress('WorkoutList')
  }

  render() {
    return (
      <View>
        <Card style={styles.card} title={this.props.schedule.name} dividerStyle="3">
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
  setCurrentSchedule:(schedule)=>dispatch(setCurrentSchedule(schedule)),
  resetWorkouts:()=>dispatch(resetWorkouts()),
})

function mapStateToProps(state){
  const {schedule}=state

  return {

    currentSchedule:schedule.currentSchedule,
    schedules:schedule.schedules,
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(Schedule)
