import React from "react";
import {Text,View,FlatList,StyleSheet} from 'react-native'
import {connect} from 'react-redux'

import { Card, ListItem, Button ,Divider,Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import fonts from '../styles/base.js'
import {addNewCircuit} from '../actions/exerciseActions.js'

import Set from './Set.js'



class Exercise extends React.Component {

  constructor(props){
    super(props)
  }
  state={
    curentCircuit:{exercise_id:this.props.exercise.id,reps:0,weight:0,rest:0},
    reps:null,
    weight:null,
    circuits:[],
    counter:1

  }
  componentDidMount(){
    let newCircuits= [...this.state.circuits]
    newCircuits.push({reps:null,weight:null,rest:null})
    this.setState({circuits:newCircuits})
  }


  addCircuitsButton=(reps,weight,rest)=>{
    let newCircuits = {reps,weight,rest,exercise_id:this.props.exercise.id}
    let copyCircuits=[...this.state.circuits,newCircuits]
    this.setState({circuits:copyCircuits})
  }
  renderCompleteCircuit=()=>{
    return(
      <Button
        backgroundColor='#03A9F4'
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='Complete Set'
        onPress={this.addCircuitsButton}
       />
    )
  }


  renderSets(){
    return this.state.circuits.map( (s,id) =>
    <Set
      key={id}
      exercise={this.props.exercise}
      reps={s.reps}
      weight={s.weight}
      handleRepsOnChange={this.handleRepsOnChange} handleWeightOnChange={this.handleWeightOnChange}
      addCircuitsButton={this.addCircuitsButton}
    />)
  }




  render() {
    return (

        <Card  title={this.props.exercise.name}>
          {this.renderSets()}
        </Card>

    )
  }
}

function mapStateToProps(state){
  const {workout,user} = state

  return {
    currentWorkout:workout.currentWorkout,
    currentUser:user.currentUser
  }

}
export default connect(mapStateToProps) (Exercise)
