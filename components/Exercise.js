import React from "react";
import {Text,View,FlatList,StyleSheet} from 'react-native'
import {connect} from 'react-redux'

import { Card, ListItem, Button ,Divider,Input} from 'react-native-elements'

import fonts from '../styles/base.js'


class Exercise extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <View>
        <Card title={this.props.exercise}>
          <Text>Reps </Text>
          <Input
            placeholder='REPS'
            leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
          />
          <Text>Weight </Text>
          <Input
            placeholder='Weight'
            leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
          />

        </Card>

      </View>
    )
  }
}
export default Exercise
