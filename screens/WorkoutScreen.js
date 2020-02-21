//screens/WorkkoutScreen.js

//react imports
import React, { Component } from 'react';
import {
   ScrollView,
   View,
   StyleSheet,
   TextInput,
   Text,
   Button,
   TouchableOpacity,
	 Alert,
 } from 'react-native';
 import {connect} from 'react-redux'
 import { DrawerActions } from 'react-navigation';

//library imports
import { Input} from 'react-native-elements'
import FAIcon from 'react-native-vector-icons/FontAwesome'


//component imports
import Exercise from '../components/Exercise.js'
import MuscleModal from '../components/MuscleModal.js'
import WorkoutMuscleChart from './StatScreen/workoutMuscleChart'

//action imports
import {postNewExercise} from '../actions/exerciseActions'
import {fetchSchedules} from '../actions/scheduleActions.js'
import {
	postNewCompleteWorkout,
	fetchWorkoutsExercises,fetchWorkouts,
	addWorkout,startStopWorkout,startWorkout,
	stopWorkout,
} from '../actions/workoutActions.js'
import {fetchMuscles} from '../actions/muscleActions.js'

//styles imports
import colors from '../styles/colors'
import {styles} from '../styles/styles'

class WorkoutScreen extends Component {
  static navigationOptions = {
    // title: 'Workout',

  };

  constructor(props) {
    super(props);

  }
  componentDidMount(){
    this.props.fetchWorkoutsExercises(this.props.currentWorkout)
		this.props.fetchMuscles()
  }
  state={
    text:'',
		pastWorkout:this.props.navigation.state.params.pastWorkout,
		startTime:null,
		endTime:null,
    workout:{
      workout_id:this.props.currentWorkout.id,
      exercises:[]

    },
		modalVisible:false,
		selectedMuscles:[],
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
							pastWorkout={this.state.pastWorkout}
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

      this.props.postNewExercise(ex,this.props.currentWorkout,this.state.selectedMuscles)
      this.setState({
				text:'',
        workout:{
          ...this.state.workout,
          exercises:[...this.state.workout.exercises,ex]
        },
				selectedMuscles:[],
			})
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
		this.props.stopWorkout()
    this.props.postNewCompleteWorkout(this.props.currentWorkout)
    this.props.navigation.navigate('historyStack')

  }
	handleStartWorkout=()=>{
		this.props.startWorkout()
		// this.setState({
		// 	inProgress:true,
		// })
	}

	setModalVisible=(visible) =>{
		this.setState({modalVisible: visible});
	}
	onSelectedItemsChange = selectedMuscles => {
		this.setState({ selectedMuscles });
	};
	addMuscle=(m)=>{
		if(!this.state.selectedMuscles.includes(m)){
			let tempItems = [...this.state.selectedMuscles,m]
			this.setState({selectedMuscles:tempItems})
		}
		else if (this.state.selectedMuscles.includes(m)) {

			let tempItems = [...this.state.selectedMuscles]
			tempItems.pop(m)
			this.setState({selectedMuscles:tempItems})
		}

	}
	closeModal=()=>{

		this.setModalVisible(!this.state.modalVisible);
		this.addNewExercise()

	}
	renderCharts=()=>{
		if(this.state.pastWorkout){
			return (
				<WorkoutMuscleChart
					completedWorkout={this.props.currentWorkout}
					/>
			)

		}
	}
	renderMuscleModal=()=>{
		return (
			<MuscleModal
				addMuscle={this.addMuscle}
				closeModal={this.closeModal}
				onSelectedItemsChange={this.onSelectedItemsChange}
				selectedMuscles={this.state.selectedMuscles}
				setModalVisible={this.setModalVisible}
				modalVisible={this.state.modalVisible}
				exercise={this.state.text}
				muscles={this.props.muscles}
				/>

		)
	}

  renderAddExerciseForm=()=>{
		if(this.state.pastWorkout===false){
			return (
				<>
				<TextInput
					style={styles.input}
					placeholder='Enter a Exercise Name'
					onChangeText={(text) => this.setState({text})}
					value={this.state.text}
					/>
				{this.renderMuscleModal()}

				<TouchableOpacity
					style={styles.addButton}
					title="Add New Exercise"
					onPress={() => this.setModalVisible(true)}>
					<FAIcon name='plus' size={35} style={{ color: colors.txtWhite,bottom:-5,right:-5, }} />
				</TouchableOpacity>

				</>
		)

		}

  }

	renderStartFinishWorkoutButton=()=>{

		if(this.state.pastWorkout===false){
			if(this.props.inProgress===false){
				return (
					<View style={[{width:'100%'}]}>
						<TouchableOpacity
							onPress={this.handleStartWorkout}
							style={styles.startButton}
							title="Start Workout"
							>
							<Text style={styles.buttonText}>
								Start Workout
							</Text>
						</TouchableOpacity>
					</View>
				)
			}else{
				return (
					<View style={[{width:'100%'}]}>
						<TouchableOpacity
							onPress={this.handleCompleteWorkout}
							style={styles.stopButton}
							title="Complete Workout"
							>
							<Text style={styles.buttonText}>
								Complete Workout
							</Text>
						</TouchableOpacity>
					</View>
				)
			}
		}
	}


  render() {
    return (
      <>
      {this.renderNavBar()}
      {this.renderAddExerciseForm()}
			<ScrollView style={[ styles.container, this.props.style || {} ]}>
				{this.renderCharts()}

        {this.renderExercises()}



      </ScrollView>
				{this.renderStartFinishWorkoutButton()}

      </>
    );
  }
}
const mapDispatchToProps={
  postNewExercise,
  fetchSchedules,
  fetchWorkoutsExercises,
  postNewCompleteWorkout,
	fetchMuscles,
	startStopWorkout,
	startWorkout,
	stopWorkout,
}
function mapStateToProps(state){
  const {workout,user,muscles} = state

  return {
		startTime:workout.startTime,
		endTime:workout.endTime,
		inProgress:workout.inProgress,
    currentWorkout:workout.currentWorkout,
    currentUser:user.currentUser,
		muscles:muscles.muscles,
  }

}
export default connect(mapStateToProps,mapDispatchToProps)(WorkoutScreen)
