import React from "react";
import {Text,View,FlatList,StyleSheet} from 'react-native'
import {connect} from 'react-redux'

import { Card, ListItem, Button ,Divider,Input} from 'react-native-elements'
import fonts from '../styles/base.js'

class Set extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <View style={{
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch'
      }}>
        <View style={{width: 40, height: 40, backgroundColor: 'powderblue'}}>
          <Text>Reps </Text>
        </View>

        <View style={{width:100,height:50}}>
          <Input
            placeholder='Reps'
            leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
          />
        </View>

        <View style={{width: 50, height: 40, backgroundColor: 'powderblue'}}>
          <Text>Weight </Text>
        </View>

        <View style={{width:110,height:50}}>
          <Input
          placeholder='Weight'
          leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
          />
        </View>

      </View>
    )
  }
}
export default Set
