import React from "react"
import {
	View,ScrollView,Text,
	StyleSheet,

}from 'react-native'

//library imports
// import { Pie } from 'react-native-pathjs-charts'
import {
	VictoryBar, VictoryChart, VictoryTheme,
	VictoryPie,
 } from "victory-native";

//style imports
import {styles} from '../../styles/styles.js'

// const data = [
//   { quarter: 1, earnings: 13000 },
//   { quarter: 2, earnings: 16500 },
//   { quarter: 3, earnings: 14250 },
//   { quarter: 4, earnings: 19000 }
// ];
const data=[
	 { x: "Cat", y: 62 },
	 { x: "Dog", y: 91 },
	 { x: "Fish", y: 55 },
	 { x: "Bird", y: 55 },
 ]

class WorkoutMuscleChart extends React.Component {
	state={
		data: [{
		"name": "Washington",
		"population": 7694980
	},
	 {
		"name": "Oregon",
		"population": 2584160
	}, {
		"name": "Minnesota",
		"population": 6590667,
		"color": {'r':223,'g':154,'b':20}
	}, {
		"name": "Alaska",
		"population": 7284698
	}],
	options: {
		margin: {
			top: 20,
			left: 20,
			right: 20,
			bottom: 20
		},
		width: 350,
		height: 350,
		color: '#2980B9',
		r: 50,
		R: 150,
		legendPosition: 'topLeft',
		animate: {
			type: 'oneByOne',
			duration: 200,
			fillTransition: 3
		},
		label: {
			fontFamily: 'Arial',
			fontSize: 8,
			fontWeight: true,
			color: '#ECF0F1'
		}
	}
	}
	render(){
		// <VictoryPie
		// innerRadius={75}
		// labelRadius={125}
		// style={{ labels: { fontSize: 20 } }}
		// data={data}
		// animate={{ duration: 1500 }}
		// colorScale={[
		// 	"#D85F49",
		// 	"#F66D3B",
		// 	"#D92E1D",
		// 	"#D73C4C",
		// 	"#FFAF59",
		// 	"#E28300",
		// 	"#F6A57F"
		// ]}
		// />
		return (
			<View style={chartStyles.container}>

			 <VictoryPie
					style={{
						data: {
							stroke: ({ datum }) => (datum.y > 75 ? "black" : "none"),
							opacity: ({ datum }) => (datum.y > 75 ? 1 : 0.4)
						}
					}}
					data={[
						{ x: "Cat", y: 62 },
						{ x: "Dog", y: 91 },
						{ x: "Fish", y: 55 },
						{ x: "Bird", y: 55 }
					]}
				/>

			</View>
		)

	}

}

export default WorkoutMuscleChart
const chartStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});
