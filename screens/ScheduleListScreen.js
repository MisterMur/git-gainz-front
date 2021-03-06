//react imports
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {
   StyleSheet,
   TouchableOpacity,
    TextInput,
    Text,
    View,
    Button,
    ScrollView,
    AsyncStorage
  } from 'react-native';
	import { DrawerActions } from 'react-navigation';

//library imports
import { Card, ListItem, Button as ButtonElements ,Divider,Input} from 'react-native-elements'
import FAIcon from 'react-native-vector-icons/FontAwesome'

//component imports
import ScheduleList from '../components/ScheduleList.js'
// import Container from '../components/Container.js'

//action ipmorts
import { fetchMySchedules,fetchSchedules,postNewSchedule} from '../actions/scheduleActions.js'

//styles import
import colors from '../styles/colors'
import {styles} from '../styles/styles'
import addButton from '../styles/base'

class ScheduleListScreen extends Component {
  static navigationOptions = {
    title: 'Schedule List Screen',

  };
  state={
    text:''
  }


  constructor(props) {
    super(props);

  }
  componentDidMount(){
    this.props.fetchMySchedules()

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

  handleAddSchedule=(e)=>{
    if(this.state.text!=''){

      this.props.postNewSchedule({
        name:this.state.text,
        workouts:[]
      })
      this.setState({text:''})
    }
  }



  render() {
    return (
      <>
        {this.renderNavBar()}
        <TextInput
					style={styles.input}
          placeholder='Enter a Schedule Name'
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          />
        <TouchableOpacity
          style={styles.addButton}
          title="Add New Schedule"
          onPress={() => this.handleAddSchedule()}
          >
          <FAIcon name='plus' size={35} style={{ color: colors.txtWhite,bottom:-5,right:-5, }} />

      </TouchableOpacity>
        <ScrollView style={[ styles.container, this.props.style || {} ]}>


          <ScheduleList
            schedules={this.props.schedules}
            handlePress={this.props.navigation.navigate}
            />



        </ScrollView>
      </>
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

// const styles = StyleSheet.create({
//   navBar: {
//       height: 50,
//       justifyContent: 'center',
//       paddingHorizontal: 25
//   },
//   addButton:{
//     position: 'absolute',
//     bottom:20,
//     right:20,
//     padding: 5,
//     height: 50,
//     width: 50,  //The Width must be the same as the height
//     borderRadius:100, //Then Make the Border Radius twice the size of width or Height
//     backgroundColor:colors.bgMainRed,
//     zIndex:999,
//
//   },
//
// })
