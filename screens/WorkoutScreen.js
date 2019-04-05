import React, { Component } from 'react';
import { AppRegistry, TextInput,Text,View,Button} from 'react-native';

import Exercise from '../components/Exercise.js'


export default class WorkoutScreen extends Component {
  static navigationOptions = {
    title: 'Workout',

  };

  constructor(props) {
    super(props);

  }
  renderExercises=(exercises)=>{
    console.log('rendering exercises')
    if(exercises!='NO-EXERCISES'){
      console.log('in if exercises')
      return exercises.map((exercise,id)=>{
        console.log(exercise)
        return(
          <View>
            <Exercise
              key={id}
              exercise={exercise}
            />
          </View>
        )
      })
    }

  }

  render() {
    const {navigation} = this.props
    console.log('workoutscreen props',this.props)
    // console.log('navigation in render workoutScreen: ',navigation)
    const name = navigation.getParam("name",'NO-EXERCISES')
    const exercises = navigation.getParam("exercises",'NO-EXERCISES')
    // console.log('exercises',exercises)
    return (
      <View>


        {this.renderExercises(exercises)}
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.navigate('WorkoutList')}
        />
      </View>
    );
  }
}
