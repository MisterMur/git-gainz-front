//react imports
import React from "react";
import {Text,View,FlatList,StyleSheet} from 'react-native'
import {connect} from 'react-redux'

//libary imports
import { Card, ListItem, Button ,Divider,Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

//component imports
import Set from './Set.js'

//actions imports
import {addCircuit} from '../actions/workoutActions.js'

//styles imports
import fonts from '../styles/base.js'




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

    reps==null? reps=0:null
    weight==null? weight=0:null
    let newCircuit = {reps,weight,rest,exercise_id:this.props.exercise.id}
    let copyCircuits=[...this.state.circuits,newCircuit]
    this.setState({circuits:copyCircuits})
    this.props.addCircuit(newCircuit)
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
			pastWorkout={this.props.pastWorkout}
      exercise={this.props.exercise}
      reps={s.reps}
      weight={s.weight}
			rest={s.rest}
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
const mapDispatchToProps=dispatch=>({
  addCircuit:(c)=>dispatch(addCircuit(c)),
})

function mapStateToProps(state){
  const {workout,user} = state

  return {
    currentWorkout:workout.currentWorkout,
    currentUser:user.currentUser
  }

}
export default connect(mapStateToProps,mapDispatchToProps) (Exercise)
