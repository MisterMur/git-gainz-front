//react imports
import React, {Component} from 'react';
import {
	Modal, Text, TouchableHighlight,TouchableOpacity,
	View, Alert, Picker,Button,
} from 'react-native';

//library imports

//styles imports
import {modalStyle,styles} from '../styles/styles'

class MuscleModal extends Component {
  state = {
    modalVisible: false,
		selectedItems:[],
  };





	onSelectedItemsChange = selectedItems => {
		this.setState({ selectedItems });
	};

	addMuscle=(m)=>{
		if(!this.state.selectedItems.includes(m)){
			let tempItems = [...this.state.selectedItems,m]
			this.setState({selectedItems:tempItems})
		}
		else if (this.state.selectedItems.includes(m)) {

			let tempItems = [...this.state.selectedItems]
			tempItems.pop(m)
			this.setState({selectedItems:tempItems})
		}

	}

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
		if(this.state.selectedItems.includes(muscle)){
			return (
				<TouchableOpacity
				key={idx}
				style={modalStyle.itemUnselected}
				onPress={()=>this.addMuscle(muscle)}>
				<Text key={idx} style={modalStyle.itemText}>{muscle.name}</Text>
				</TouchableOpacity>
			)
		}
		else if(!this.state.selectedItems.includes(muscle)){
			return (
				<TouchableOpacity
					key={idx}
					style={modalStyle.itemSelected}
					onPress={()=>this.addMuscle(muscle)}>
					<Text key={idx} style={modalStyle.itemText}>{muscle.name}</Text>
				</TouchableOpacity>

			)
		}
	}
	closeModal=()=>{

		this.props.setModalVisible(!this.props.modalVisible);
		Alert.alert('Modal has been closed.');
	}

	renderModal=()=>{
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={this.props.modalVisible}
				onRequestClose={() =>this.closeModal()}>
				<View style={modalStyle.modal}>
					<View>
						<View style={modalStyle.itemContainer}>
						{this.renderMuscleSelect()}
							<View styles={{marginBottom:'90%',width:'100%'}}>
								<TouchableHighlight
								style={styles.button}
								onPress={() =>this.closeModal()}>
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
