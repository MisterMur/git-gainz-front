import React from "react";
import {Text,View,FlatList,StyleSheet} from 'react-native'
import {connect} from 'react-redux'
// import {viewWorkouts} from '../reducer'

// import {colors, fonts, padding, dimensions} from '../styles/base.js'
import { Card, ListItem, Button ,Divider} from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';


class Workout extends React.Component {

  constructor(props){
    super(props)
  }
  

  render() {
    console.log('workout props',this.props)
    return (
      <View>
        <Card  title={this.props.workout.name} dividerStyle="3">
          <Text style={{marginBottom: 10}}>
            {this.props.workout.name}
          </Text>
          <Divider style={{ backgroundColor: 'red' }} />

          <Button
            icon={<Icon name="user" color="#4F8EF7" />}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW NOW'
            onPress={()=>this.props.handlePress('Workout',this.props.workout)} />
        </Card>
      </View>
    )
  }
}

export default Workout
