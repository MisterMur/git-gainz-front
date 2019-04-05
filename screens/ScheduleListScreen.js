import React, { Component } from 'react';
import { AppRegistry, TextInput,Text,View,Button,ScrollView} from 'react-native';
import {connect} from 'react-redux'
import { Card, ListItem, Button as ButtonElements ,Divider,Input} from 'react-native-elements'

import ScheduleList from '../components/ScheduleList.js'

import { fetchSchedules,postNewSchedule} from '../reducers/reducer.js'


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
    console.log('in did mount')
    this.props.dispatch(fetchSchedules())

  }

  handleAddSchedule=(e)=>{
    this.props.dispatch(postNewSchedule({
      name:this.state.text,
      workouts:[]
    }))
    console.log('posted schedule')
    this.props.dispatch(fetchSchedules())
    console.log('fetched new schedule')



  }
  


  render() {
    // const {navigation} = this.props
    // console.log('navigation in render schedule screen: ',navigation)
    // const scheduleName = navigation.getParam("name",'NO-SCHEDULES')
    // console.log('schedule name',scheduleName)
    // const exercises = navigation.getParam("exercises",'NO-EXERCISES')
    // console.log('exercises',exercises)
    const {error,loading,schedules}=this.props

    console.log('scheduleListScreen props:',this.props)
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
const mapStateToProps=state=>({
  schedules:state.schedules,
  loading:state.loading,
  error:state.error
})
export default connect(mapStateToProps)(ScheduleListScreen)
