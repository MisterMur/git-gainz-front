import React, { Component } from 'react';
import { AppRegistry, TextInput,Text,View,Button,ScrollView} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Card, ListItem, Button as ButtonElements ,Divider,Input} from 'react-native-elements'

import ScheduleList from '../components/ScheduleList.js'

import { fetchSchedules,postNewSchedule} from '../actions/scheduleActions.js'


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
    // console.log('in did mount')
    this.props.dispatch(fetchSchedules())

  }

  handleAddSchedule=(e)=>{
    this.props.dispatch(postNewSchedule({
      name:this.state.text,
      workouts:[]
    }))
    this.props.dispatch(fetchSchedules())
  }



  render() {
    console.log('rendering props in schedule',this.props)
    const {error,loading,schedules}=this.props
    return (
      <ScrollView>


        <ScheduleList
          schedules={schedules}
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
// const mapDispatchToProps = dispatch => ({
//   fetchSchedules: () => dispatch(fetchSchedules()),
//   postNewSchedule: (s)=>dispatch(postNewSchedule(s))
// })

function mapStateToProps(state){
  console.log('mappingstate in schedulelist:',state)
  const {schedule}=state;
  return {
    schedules:schedule.schedules,
    loading:state.loading,
    error:state.error

  }
}

export default connect(mapStateToProps)(ScheduleListScreen)
