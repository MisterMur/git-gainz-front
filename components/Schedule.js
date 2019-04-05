import React from "react";
import {Text,View,FlatList,StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import SET_CURRENT_SCHEDULE from '../constants/types.js'
// import {viewWorkouts} from '../reducer'
import store from '../store.js'


// import {colors, fonts, padding, dimensions} from '../styles/base.js'
import { Card, ListItem, Button ,Divider,FormInput,FormLabel} from 'react-native-elements'
import {setCurrentSchedule} from '../reducers/reducer.js'

import Icon from 'react-native-vector-icons/FontAwesome';


class Schedule extends React.Component {

  constructor(props){
    super(props)
  }
  handlePressButton=()=>{
    console.log('in handlePressButton Schedule,',this.props.schedule)
    store.dispatch({
      type:'SET_CURRENT_SCHEDULE',
      payload:this.props.schedule
    }

    )


    console.log('in handlepressbutton after setcurrentschedule',this.props.currentSchedule)
    this.props.handlePress('WorkoutList')
    console.log('after handlepress ')
    // onChangeText={(text)=>this.handleChangeText(text)}
  }

  render() {
    // console.log('schedule props',this.props)
    return (
      <View>
        <Card  title={this.props.schedule.name} dividerStyle="3">
          <Text style={{marginBottom: 10,flex:2}}>
            {this.props.schedule.workouts.length} Workout(s)
          </Text>
          <Divider style={{ backgroundColor: 'red' }} />

          <Button
            icon={<Icon name="user" color="#4F8EF7" />}
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
const mapStateToProps=state=>({
  currentSchedule:state.currentSchedule,
  schedules:state.schedules,

})
// function mapDispatchToProps(dispatch,ownProps) {
//   return bindActionCreators({ setCurrentSchedule}, dispatch)
// }
export default connect(mapStateToProps)(Schedule)
