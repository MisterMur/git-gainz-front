//react imports
import React from "react";
import {
	ScrollView,View,
	TouchableOpacity,

} from 'react-native'


//navigation imports
import { DrawerActions } from 'react-navigation';

//component imports
import WorkoutMuscleChart from './workoutMuscleChart.js'
//library imports
import FAIcon from 'react-native-vector-icons/FontAwesome'

//style imports
import {styles} from '../../styles/styles.js'
import colors from '../../styles/colors.js'


class StatScreen extends React.Component {

	openDrawer = () => {
		this.props.navigation.dispatch(DrawerActions.openDrawer());
	}
	renderNavBar() {
			return (
					<View style={ styles.navBar }>
							<TouchableOpacity onPress={ this.openDrawer }>
									<FAIcon name='bars' size={22} style={{ color: colors.bdMainRed }} />
							</TouchableOpacity>
					</View>
			)
	}

  render() {
    return (
      <View>
				{this.renderNavBar()}
				<WorkoutMuscleChart/>

      </View>
    )
  }
}
export default StatScreen
