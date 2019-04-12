import React from "react";
import {Text,View,FlatList,StyleSheet} from 'react-native'
import {connect} from 'react-redux'

import { Card, ListItem, Button ,Divider,Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import fonts from '../styles/base.js'
import {postNewCircuit} from '../reducers/reducer.js'

import Set from './Set.js'



class Exercise extends React.Component {

  constructor(props){
    super(props)
  }
  state={
    reps:null,
    weight:null,
    circuits:[],
    sets:[]


  }
  componentDidMount(){
    let newSets= [...this.state.sets]
    // newSets.push(<Set
    //   reps={this.state.reps}
    //   weight={this.state.weight}
    //   handleRepsOnChange={this.handleRepsOnChange} handleWeightOnChange={this.handleWeightOnChange}
    // />)
    newSets.push({reps:this.state.reps,weight:this.state.weights})
    this.setState({sets:newSets})
  }

  renderSets(){
    return this.state.sets.map( (s,id) =>
    <Set
      key={id}
      reps={this.state.reps}
      weight={this.state.weight}
      handleRepsOnChange={this.handleRepsOnChange} handleWeightOnChange={this.handleWeightOnChange}
    />)
  }
  addSetsButton=()=>{
    console.log('in handle press return set')
    let newSets = [...this.state.sets]
    newSets.push(<Set/>)
    this.setState({sets:newSets}, ()=> postNewCircuit({
        reps:this.state.reps,
        weight:this.state.weight,
        rest:0,
        exercise_id:this.props.exercise.id
      }))

  }
  handleRepsOnChange=(reps)=>{
    this.setState({reps})

  }
  handleWeightOnChange=(weight)=>{
    this.setState({weight})

  }


  render() {
    // {this.renderSet()*2}
    return (

        <Card  title={this.props.exercise.name}>
          {this.renderSets()}
          <Button
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='Complete Set'
            onPress={this.addSetsButton}
           />

        </Card>

    )
  }
}
export default Exercise
