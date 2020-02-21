import React from "react"
import {
	View,ScrollView,Text,
	StyleSheet,

}from 'react-native'
import {connect} from 'react-redux'
//library imports
// import { Pie } from 'react-native-pathjs-charts'
import {
	VictoryBar, VictoryChart, VictoryTheme,
	VictoryPie,
 } from "victory-native";

 import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'

//style imports
import {styles} from '../../styles/styles.js'

//action imports
import {fetchMuscleRepsData,fetchMuscleSetsData} from '../../actions/completedWorkoutActions.js'



 const barData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43],
        },
      ],
    };

class WorkoutMuscleChart extends React.Component {
	state={

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
	convertData=(data)=>{
		if(data){
			arr=[]
			Object.entries(data).map(el=>{
				let obj = {x:el[0],y:el[1],label:el[0]}
				return arr.push(obj)
			})
			// console.warn(arr)
			return arr;

		}
	}
	componentDidMount(){
		this.props.fetchMuscleRepsData(this.props.completedWorkout)
		this.props.fetchMuscleSetsData(this.props.completedWorkout)
	}
	render(){
		// <BarChart
		// 		// style={graphStyle}
		// 	data={barData}
		// 	width={300}
		// 	height={220}
		// 	yAxisLabel={'$'}
		// 	chartConfig={{
		// 		backgroundColor: '#e26a00',
		// 		backgroundGradientFrom: '#fb8c00',
		// 		backgroundGradientTo: '#ffa726',
		// 		decimalPlaces: 2, // optional, defaults to 2dp
		// 		color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
		// 		style: {
		// 			borderRadius: 16
		// 		}
		// 	}}
		// />
		return (
			<View style={chartStyles.container}>

				<VictoryPie
					 innerRadius={60}
					 labelRadius={90}
					 style={{labels: { fontSize: 22 } }}
					 data={this.convertData(this.props.workoutSetsData)}
					 animate={{ duration: 2500 }}
					 colorScale={[
					 	"#D85F49",
					 	"#F66D3B",
					 	"#D92E1D",
					 	"#D73C4C",
					 	"#FFAF59",
					 	"#E28300",
					 	"#F6A57F"
					 ]}
					 />

			</View>
		)

	}

}
const mapDispatchToProps={

	fetchMuscleRepsData,
	fetchMuscleSetsData,

}

function mapStateToProps(state){
	const {history}= state

	return {
		workoutSetsData:history.workoutSetsData,
		workoutRepsData:history.workoutRepsData,

	}
}

export default connect (mapStateToProps,mapDispatchToProps) (WorkoutMuscleChart)

const chartStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#f5fcff"
  }
});
