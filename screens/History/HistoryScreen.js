//react imports
import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  Button,
  TouchableOpacity,

} from 'react-native'
import {DrawerActions} from 'react-navigation'
import {connect} from 'react-redux'

//library imports
import FAIcon from 'react-native-vector-icons/FontAwesome'

//component imports
import Exercise from '../../components/Exercise.js'
import WorkoutList from '../../components/WorkoutList.js'


//action imports
import fetchCompletedWorkouts from '../../actions/completedWorkoutActions'


//constant imports


//style imports
import colors from '../../styles/colors'
import {styles} from '../../styles/styles'

class HistoryScreen extends Component {
  static navigationOptions = {
    title: 'History'
  }

  state = {

  }

  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }

  renderNavBar() {
      return (
          <View style={ styles.navBar }>
              <TouchableOpacity onPress={ this.openDrawer }>
                  <FAIcon name='bars' size={22} style={{ color: colors.bdMainRed }} />
              </TouchableOpacity>
          </View>
      )
  }

  renderCompletedWorkoutList=()=>{
    return (
      <WorkoutList
        workouts = {this.props.completedWorkouts}
        handlePress = {this.props.navigation.navigate}
        />
    )
  }

  render() {
    return (
      <>
      {this.renderNavBar()}
      <ScrollView className="WorkoutList">
        {this.renderCompletedWorkoutList()}

      </ScrollView>
      </>
    )
  }
}

const mapDispatchToProps=dispatch =>({
  fetchCompletedWorkouts:()=>dispatch(fetchCompletedWorkouts()),

})
function mapStateToProps(state){
  const {history} = state;
  return {
    completedWorkouts:history.completedWorkouts,
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (HistoryScreen);
