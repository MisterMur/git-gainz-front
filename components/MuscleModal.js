//react imports
import React, {Component} from 'react';
import {
	Modal, Text, TouchableHighlight,TouchableOpacity,
	View, Alert,Button,
} from 'react-native';

//library imports

//styles imports
import {modalStyle,styles} from '../styles/styles'

class MuscleModal extends Component {
  state = {
    modalVisible: false,
		selectedItems:[],
  };









	setModalVisible=(visible) =>{
		this.setState({modalVisible: visible});
	}

	renderMuscleSelect = ()=>{
		return this.props.muscles.map((m,idx)=>{
			return(
					this.renderMuscle(m,idx)

			)
		})
	}

	renderMuscle=(muscle,idx)=>{
		if(this.props.selectedMuscles.includes(muscle)){
			return (
				<TouchableOpacity
				key={idx}
				style={modalStyle.itemUnselected}
				onPress={()=>this.props.addMuscle(muscle)}>
				<Text key={idx} style={modalStyle.itemText}>{muscle.name}</Text>
				</TouchableOpacity>
			)
		}
		else if(!this.props.selectedMuscles.includes(muscle)){
			return (
				<TouchableOpacity
					key={idx}
					style={modalStyle.itemSelected}
					onPress={()=>this.props.addMuscle(muscle)}>
					<Text key={idx} style={modalStyle.itemText}>{muscle.name}</Text>
				</TouchableOpacity>

			)
		}
	}


	renderModal=()=>{
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={this.props.modalVisible}
				onRequestClose={() =>this.props.closeModal()}>
				<View style={modalStyle.modal}>
					<View>
						<View style={modalStyle.itemContainer}>
						{this.renderMuscleSelect()}
							<View styles={{marginBottom:'90%',width:'100%'}}>
								<TouchableHighlight
								style={styles.button}
								onPress={() =>this.props.closeModal()}>
								<Text style={modalStyle.itemText}>Hide Modal</Text>
								</TouchableHighlight>
							</View>
						</View>

					</View>
				</View>
			</Modal>
		)
	}

  render() {
		// console.warn('rendering modal',this.props.modalVisible)

    return (
      <View >
				{this.renderModal()}

      </View>
    );
  }

}
export default MuscleModal
