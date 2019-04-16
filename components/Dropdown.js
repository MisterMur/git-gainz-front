import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native'

class MusclePicker extends Component {


   render() {
      return (
         <View>
            <Picker selectedValue = {this.props.muscle} onValueChange = {this.props.handleMuscleChange}>
               <Picker.Item label = "Biceps" value = "Biceps" />
               <Picker.Item label = "Triceps" value = "Triceps" />
               <Picker.Item label = "Chest" value = "Chest" />
               <Picker.Item label = "Back" value = "Back" />
               <Picker.Item label = "Quads" value = "Quads" />
               <Picker.Item label = "Calves" value = "Calves" />
               <Picker.Item label = "Shoulders" value = "Shoulders" />
               <Picker.Item label = "Core" value = "Core" />
            </Picker>
            <Text style = {styles.text}>{this.props.muscle}</Text>
         </View>
      )
   }
}
export default MusclePicker

const styles = StyleSheet.create({
   text: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'black'
   }
})
