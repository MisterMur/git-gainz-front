//react imports
import React from "react";
import {Text,View,FlatList,StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

//libaray imports
import { Card, ListItem, Button ,Divider} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

//action imports
import {setCurrentWorkout} from '../actions/workoutActions.js'
import {resetExercises} from '../actions/exerciseActions.js'

//constants imports
import {SET_CURRENT_WORKOUT} from '../constants/types.js'

//styles imports
import {styles} from '../styles/styles.js'


class Workout extends React.Component {

  constructor(props){
    super(props)
  }
	componentDidMount(){
		// const {pastWorkout}= this.props.navigation.state.params
	}

  handlePressButton=()=>{
    // store.dispatch({
    //   type:SET_CURRENT_WORKOUT,
    //   payload:this.props.workout
    // })
    this.props.setCurrentWorkout(this.props.workout)
    this.props.resetExercises()
    this.props.handlePress('Workout')
  }

  render() {
    return (
      <View>
        <Card
					containerStyle={styles.card}
					dividerStyle="3" title={this.props.workout.name}>
          <Text style={{marginBottom: 10,flex:2,textAlign:'center'}}>
            {this.props.workout.exercises.length} Exercises
          </Text>

          <Button
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
  setCurrentWorkout:(w)=>dispatch(setCurrentWorkout(w)),
  resetExercises:()=>dispatch(resetExercises()),
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
