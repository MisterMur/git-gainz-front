import React from "react";
import {
  Text,
  View,FlatList,
  StyleSheet,Dimensions,
} from 'react-native'
import {connect} from 'react-redux'

import { Card, ListItem, Button ,Divider,Input} from 'react-native-elements'
import fonts from '../styles/base.js'

import {postNewCircuit} from '../actions/workoutActions.js'


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
  handleRepsOnChange=(reps)=>{
    this.setState({reps})
  }
  handleWeightOnChange=(weight)=>{
    this.setState({weight})
  }
	handleCompleteCircuit=()=>{
		this.props.addCircuitsButton(this.state.reps,this.state.weight,this.state.rest)
		this.setState((prevState)=>{return {showButton:!prevState.showButton}})

	}

  renderCompleteCircuit=()=>{
    return(
      <Button
        backgroundColor='#03A9F4'
        buttonStyle={{borderRadius: 0.5, marginLeft: 0, marginRight: 0, marginTop: 10}}
        title='Complete Set'
        onPress={this.handleCompleteCircuit}
       />
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
          leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
          />
      </View>

      <View style={{flex:1, }}>
        <Text>Weight </Text>
        <Input
          value={this.state.weight}
          onChangeText={weight=>this.handleWeightOnChange(weight)}
          placeholder='Weight'
          leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
          />
      </View>
      <View style={{flex:1}}>
        {this.state.showButton? this.renderCompleteCircuit():null}
      </View>



    </View>
    )
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

const actions={
  postNewCircuit
}
export default connect(null,actions) (Set)
