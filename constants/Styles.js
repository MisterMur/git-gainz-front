import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

export const styles = StyleSheet.create({
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  button:{
    backgroundColor:'#03A9F4'
  },
  buttonStyle:{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0},


});
export const cardStyles=StyleSheet.create({
  cardColor:{backgroundColor:'steelblue'},
  cardContainer:{backgroundColor:'skyblue'},
  
})

export default class LotsOfStyles extends Component {
  render() {
    return (
      <View>
        <Text style={styles.red}>just red</Text>
        <Text style={styles.bigBlue}>just bigBlue</Text>
        <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
        <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
      </View>
    );
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => LotsOfStyles);
