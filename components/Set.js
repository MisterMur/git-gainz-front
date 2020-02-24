///components/set.js

//react imports
import React from "react";
import {
  Text,TouchableOpacity,
  View,FlatList,
  StyleSheet,Dimensions,Button
} from 'react-native'
import {connect} from 'react-redux'


//library imports
import { Card, ListItem ,Divider,Input} from 'react-native-elements'

//actions imports
import {postNewCircuit,startStopWorkout,startWorkout} from '../actions/workoutActions.js'

// constants imports
import fonts from '../styles/base.js'
import colors from '../styles/colors.js'
import styles from '../styles/styles.js'



class Set extends React.Component {

  constructor(props){
    super(props)
  }
  state={

    reps:null,
    weight:null,
    rest:0,
    exercise_id:this.props.exercise.id,
    showButton:true
  }
	componentDidMount(){
		if(this.props.pastWorkout){
			this.setState({
				reps:this.props.reps.toString(),
				weight:this.props.weight.toString(),
				rest:this.props.rest.toString(),
			})
		}
	}
  handleRepsOnChange=(reps)=>{
    this.setState({reps})
  }
  handleWeightOnChange=(weight)=>{
    this.setState({weight})
  }
	handleCompleteCircuit=()=>{
		this.props.addCircuitsButton(this.state.reps,this.state.weight,this.state.rest)
		this.setState((prevState)=>{return {showButton:!prevState.showButton}})
		if(!this.props.inProgress){
			this.props.startWorkout()
		}

	}

  renderCompleteCircuit=()=>{
    return(
      <TouchableOpacity
				style={{
					// backgroundColor:'orange',
					backgroundColor:'#03A9F4',
					borderRadius: 25,
					marginLeft: 0,
					marginRight: 0, marginTop: 10}}
				onPress={this.handleCompleteCircuit}
				>
				<Text style={{
						fontSize:10,
						fontWeight: 'bold',
						marginTop:20,
						color:colors.bdWhite}}
					>Finish Set</Text>
			</TouchableOpacity>

    )
  }

  renderCircuitInput=()=>{
    var width = Dimensions.get('window').width;
    return (
      <View style={{flex:5,flexDirection:"row"}}>
      <View style={{flex:1, }}>
        <Text>Reps </Text>
        <Input
          value={this.state.reps}
          onChangeText={reps=>this.handleRepsOnChange(reps)}
          placeholder='Reps'
					keyboardType={'numeric'}
					editable={!this.props.pastWorkout}
          leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
          />
      </View>

      <View style={{flex:1, }}>
        <Text>Weight </Text>
        <Input
          value={this.state.weight}
          onChangeText={weight=>this.handleWeightOnChange(weight)}
          placeholder='Weight'
					keyboardType={'numeric'}
					editable={!this.props.pastWorkout}
          leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
          />
      </View>
			{this.state.showButton && !this.props.pastWorkout?
				 this.renderCompleteCircuit()
				 :null}



    </View>
    )
		// <View style={{flex:1}}>
		// </View>
  }

  render() {


    return (
      <>
      <View style={{
          flex: 6,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'stretch',
        }}>
        {this.renderCircuitInput()}

      </View>
      </>
    )
  }
}

const mapDispatchToProps={
  postNewCircuit,startStopWorkout,startWorkout,
}
function mapStateToProps(state){
	const {workout} = state
	return {
		inProgress:workout.inProgress
	}

}

export default connect(mapStateToProps,mapDispatchToProps) (Set)
