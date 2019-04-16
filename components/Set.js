import React from "react";
import {Text,View,FlatList,StyleSheet} from 'react-native'
import {connect} from 'react-redux'

import { Card, ListItem, Button ,Divider,Input} from 'react-native-elements'
import fonts from '../styles/base.js'

import {postNewCircuit} from '../reducers/reducer.js'


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
      <View style={{
        flex:1,
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'stretch'
      }}>
      <View style={{width: 40,alignItems:'center', height: 40}}>
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
      <View style={{width: 50, height: 40,alignItems:'center'}}>
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
      </View>
    )
  }

  render() {


    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}>
        {this.renderCircuitInput()}
        {this.props.showButton?this.renderCompleteCircuit():null}

      </View>
    )
  }
}

const actions={
  postNewCircuit
}
export default connect(null,actions) (Set)
