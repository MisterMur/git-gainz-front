//screens/WorkkoutScreen.js

//react imports
import React, { Component } from 'react';
import {
   ScrollView,
   View,
   StyleSheet,
   TextInput,
   Text,
   // Button,
   TouchableOpacity,
 } from 'react-native';
 import {connect} from 'react-redux'
 import { DrawerActions } from 'react-navigation';

//library imports
import { Input} from 'react-native-elements'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import { Button } from 'react-native-material-design';


//component imports
import Exercise from '../components/Exercise.js'

//action imports
import {postNewExercise} from '../actions/exerciseActions'
import {fetchSchedules} from '../actions/scheduleActions.js'
import {
	postNewCompleteWorkout,
	fetchWorkoutsExercises,fetchWorkouts,
	addWorkout
} from '../actions/workoutActions.js'

//styles imports
import colors from '../styles/colors'

class WorkoutScreen extends Component {
  static navigationOptions = {
    // title: 'Workout',

  };

  constructor(props) {
    super(props);

  }
  componentDidMount(){
		console.warn(this.props.navigation.state.params.pastWorkout)
    this.props.fetchWorkoutsExercises(this.props.currentWorkout)
  }
  state={
    text:'',
		pastWorkout:this.props.navigation.state.params.pastwpastWorkout,
    workout:{
      workout_id:this.props.currentWorkout.id,
      exercises:[]

    }
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

  renderExercises=()=>{
    if(this.props.currentWorkout.exercises){
      return this.props.currentWorkout.exercises.map((exercise,idx)=>{
        return(
            <Exercise
              key={idx}
              exercise={exercise}
            />
        )
      })
    }
  }
  addNewExercise=()=>{
    if(this.state.text){
      let ex = {name:this.state.text,sets:[]}

      this.props.postNewExercise(ex,this.props.currentWorkout)
      this.setState({text:'',
        workout:{
          ...this.state.workout,
          exercises:[...this.state.workout.exercises,ex]
        }})
    }


  }

  handleAddExercise=()=>{
    this.props.postNewExercise({
      name:this.state.text,
      sets:[]
    })
    this.props.fetchSchedules()
  }
  handleCompleteWorkout=()=>{
    this.props.postNewCompleteWorkout(this.props.currentWorkout)
    this.props.navigation.navigate('historySack')

  }
  renderNav=()=>{
    return (
      <>
      <Button
        title="Go to Home"
        onPress={() => this.props.navigation.navigate('Home')}
      />
      <Button
        title="Go back"
        onPress={() => this.props.navigation.navigate('WorkoutList')}
      />

      </>
    )
  }
  renderAddExerciseForm=()=>{
    return (
      <>
      <Input
        placeholder='Enter a Exercise Name'
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
      <TouchableOpacity
        style={styles.addButton}
        title="Add New Exercise"
        onPress={() => this.addNewExercise()}>
        <FAIcon name='plus' size={35} style={{ color: colors.txtWhite,bottom:-5,right:-5, }} />
      </TouchableOpacity>

      </>
    )
  }
	renderFinishWorkoutButon=()=>{
		// <View style={[{height:100}]}>
		// 	<Button
		// 		backgroundColor='#03A9F4'
		// 		buttonStyle={{backgroundColor:'teal',borderRadius: 0.5, }}
		// 		title='Finish Workout'
		// 		onPress={this.handleCompleteWorkout}
		// 		>
		// 		<Text>Copmlete Workout</Text>
		// 	</Button>
		// </View>
		if(!this.state.pastWorkout){
			return (
				<View style={[{height:100,width:'100%'}]}>
					<Button
						value="NORMAL FLAT"
						onPress={this.handleCompleteWorkout} />
				</View>
			)
		}
	}


  render() {

    // <TouchableOpacity
    //   backgroundColor='#03A9F4'
    //   buttonStyle={{width:'100%',backgroundColor:'teal',borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
    //   title='Finish Workout'
    //   onPress={this.handleCompleteWorkout}
    //   ><Text>FInish Workout</Text>
    // </TouchableOpacity>
    return (
      <>
      {this.renderNavBar()}
      {this.renderAddExerciseForm()}
      <ScrollView>
        {this.renderExercises()}

      </ScrollView>
			{this.renderFinishWorkoutButon()}


      </>
    );
  }
}
const mapDispatchToProps=dispatch=>({
  postNewExercise:(e,w)=>dispatch(postNewExercise(e,w)),
  fetchSchedules:()=>dispatch(fetchSchedules()),
  fetchWorkoutsExercises:(w)=>dispatch(fetchWorkoutsExercises(w)),
  postNewCompleteWorkout:(w)=>dispatch(postNewCompleteWorkout(w))
})
function mapStateToProps(state){
  const {workout,user} = state

  return {
    currentWorkout:workout.currentWorkout,
    currentUser:user.currentUser
  }

}
export default connect(mapStateToProps,mapDispatchToProps)(WorkoutScreen)

const styles = StyleSheet.create({
  navBar: {
      height: 50,
      justifyContent: 'center',
      paddingHorizontal: 25
  },
  addButton:{
    position: 'absolute',
    bottom:60,
    right:20,
    padding: 5,
    height: 50,
    width: 50,  //The Width must be the same as the height
    borderRadius:100, //Then Make the Border Radius twice the size of width or Height
    backgroundColor:colors.bgMainRed,
    zIndex:999,

  },

})
