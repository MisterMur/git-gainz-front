import React from "react";
import {Text,View,FlatList,StyleSheet} from 'react-native'
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
  // addCircuitsButton=()=>{
  //   // console.log('in handle press return set')
  //   // let newCircuits = []
  //   // this.state.circuits.map(c=>{newCircuits.push({...c})})
  //   // let newCurentCircuit ={ ...this.state.curentCircuit}
  //   newCircuits.push(  newCurentCircuit)
  //   this.props.postNewCircuit({
  //     this.state.reps,
  //     this.state.weight,
  //     this.state.exercise_id,
  //     this.state.rest
  //   })
  //   // this.setState({circuit:{exercise_id:this.props.exercise.id,rest:0,reps:0,weight:0},circuits:newCircuits})
  // }
  renderCompleteCircuit=()=>{
    return(
      <Button
        backgroundColor='#03A9F4'
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='Complete Set'
        onPress={()=>this.props.addCircuitsButton(this.state.reps,this.state.weight,this.state.rest)}
       />
    )
  }


  renderCircuitInput=()=>{
    return (
      <>
      <View style={{width: 40, height: 40, backgroundColor: 'powderblue'}}>
        <Text>Reps </Text>
      </View>
      <View style={{width:100,height:50}}>
        <Input
          value={this.state.reps}
          onChangeText={reps=>this.handleRepsOnChange(reps)}
          placeholder='Reps'
          leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
        />
      </View>
      <View style={{width: 50, height: 40, backgroundColor: 'powderblue'}}>
        <Text>Weight </Text>
      </View>
      <View style={{width:110,height:50}}>
        <Input
          value={this.state.weight}
          onChangeText={weight=>this.handleWeightOnChange(weight)}
          placeholder='Weight'
          leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
        />
      </View>
      </>
    )
  }

  render() {


    return (
      <View style={{
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch'
      }}>
        {this.renderCircuitInput()}
        {this.renderCompleteCircuit()}

      </View>
    )
  }
}

const actions={
  postNewCircuit
}
export default connect(null,actions) (Set)
