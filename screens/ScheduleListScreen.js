import React, { Component } from 'react';
import { AppRegistry, TextInput,Text,View,Button,ScrollView,AsyncStorage} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Card, ListItem, Button as ButtonElements ,Divider,Input} from 'react-native-elements'

import ScheduleList from '../components/ScheduleList.js'

import { fetchMySchedules,fetchSchedules,postNewSchedule} from '../actions/scheduleActions.js'


class ScheduleListScreen extends Component {
  static navigationOptions = {
    title: 'Schedules List',

  };
  state={
    text:''
  }


  constructor(props) {
    super(props);

  }
  componentDidMount(){
    // this.props.dispatch(fetchSchedules())

  }

  handleAddSchedule=(e)=>{
    this.props.postNewSchedule({
      name:this.state.text,
      workouts:[]
    })
    this.setState({text:''})
  }



  render() {
    return (
      <ScrollView>

        <ScheduleList
          schedules={this.props.schedules}
          handlePress={this.props.navigation.navigate}
        />

        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.navigate('ScheduleList')}
        />

        <Input
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <ButtonElements
          title="Add New Schedule"
          onPress={() => this.handleAddSchedule()}
        />

      </ScrollView>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  fetchMySchedules: () => dispatch(fetchMySchedules()),
  postNewSchedule: (s)=>dispatch(postNewSchedule(s))
})

function mapStateToProps(state){

  const {schedule}=state;
  return {
    schedules:schedule.schedules,
    loading:state.loading,
    error:state.error
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ScheduleListScreen)
