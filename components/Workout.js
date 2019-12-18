import React from "react";
import {Text,View,FlatList,StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

// import {viewWorkouts} from '../reducer'
import {setCurrentWorkout} from '../actions/workoutActions.js'
import {SET_CURRENT_WORKOUT} from '../constants/types.js'
import store from '../store.js'

// import {colors, fonts, padding, dimensions} from '../styles/base.js'
import { Card, ListItem, Button ,Divider} from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';


class Workout extends React.Component {

  constructor(props){
    super(props)
  }

  handlePressButton=()=>{
    // console.log('in handlepressbutton workout',this.props.workout
    // console.log('in handlepressbutton store',store)
    // store.dispatch({
    //   type:SET_CURRENT_WORKOUT,
    //   payload:this.props.workout
    // })
    this.props.setCurrentWorkout(this.props.workout)
    this.props.handlePress('Workout')
  }

  render() {
    // console.warn('workout props',this.props.workout)
    return (
      <View>
        <Card  dividerStyle="3">
          <Text style={{marginBottom: 10}}>
            {this.props.workout.name}
          </Text>
          <Divider style={{ backgroundColor: 'red' }} />

          <Button
            icon={<Icon name="user" color="#4F8EF7" />}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW NOW'
            onPress={()=>this.handlePressButton()} />
        </Card>
      </View>
    )
  }
}
const mapDispatchToProps=dispatch=>({
  setCurrentWorkout:(w)=>dispatch(setCurrentWorkout(w))
})
function mapStateToProps(state){
  const {workout}=state
  return {

    currentWorkout:state.currentWorkout
  }

}


// function mapDispatchToProps(dispatch,ownProps) {
//   return bindActionCreators({ setCurrentWorkout}, dispatch)
// }

export default connect(mapStateToProps,mapDispatchToProps)(Workout)
