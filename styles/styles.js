
import {StyleSheet, Dimensions} from 'react-native'
import colors from './colors'

export const modalStyle = StyleSheet.create({
	modal:{
		width:'80%',
		height:'75%',
		backgroundColor:colors.bdWhite,
		borderColor:'black',
		borderWidth:3,
		borderRadius:0.3,
		opacity:0.9,
		marginTop:'20%',
		marginLeft:'auto',
		marginRight:'auto',

	},
	musclesButton:{
		width:'50%',
		height:50,
		marginLeft:'auto',
		marginRight:'auto',
		borderRadius: 50,
		borderStyle: 'solid',
		borderWidth: 4,
		borderColor: '#e3e3e3',
		backgroundColor:'skyblue',

	},
	buttonText:{
		fontSize:30,
		color:'black',
		textAlign:'center',
	},

	itemContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  // item: {
  //   width: '50%' // is 50% of container width
  // }
	itemSelected:{
		width:'50%',
		height:50,
		borderStyle:'solid',
		borderWidth:3,
		borderColor: '#e3e3e3',
		backgroundColor:'red',
		padding:1,
		marginLeft:'auto',
		marginRight:'auto',
	},
	itemUnselected:{
		width:'50%',
		height:50,
		borderStyle:'solid',
		borderWidth:3,
		borderColor: '#e3e3e3',
		backgroundColor:'green',
		padding:1,
		marginLeft:'auto',
		marginRight:'auto',
	},
	itemText:{
		fontSize:25,
		color:'black',
		textAlign:'center',

	},

	closeModal:{
		height:50,
		borderRadius: 50,
		borderStyle: 'solid',
		borderWidth: 4,
		borderColor: '#e3e3e3',
		backgroundColor:'red',
		padding: 1,
		width:'90%',
		marginLeft:'auto',
		marginRight:'auto',
		marginBottom: 10,
	},

})

export const  styles = StyleSheet.create({
  logo: {
      marginTop: 10,
  },

  viewStyle: {
    marginTop: 50,
    padding: 10,
  },

  headerHolder: {
      padding: 25,
      flex: 1,
  },

  navBar: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 25,

  },

  container: {
      shadowColor: '#000000',
      shadowOpacity: 0.4,
      shadowOffset: { height: -5, width:-5},
      shadowRadius: 10,
      backgroundColor: colors.bg,
  },

  input: {
    width: '80%',
    height: 55,
		marginLeft:'auto',
		marginRight:'auto',
    backgroundColor: colors.input,
		color: 'black',
    opacity: 0.6,
    margin: 10,
    padding: 8,
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
    justifyContent: 'center'
  },


  authInputs: {
    padding:5,
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#e3e3e3',
    width:'90%',
    marginBottom: '10%',
    marginLeft:'5%',
  },
  authButton: {
      width: '90%',
      marginLeft:'5%',
      height: 50,
      borderColor: colors.bdWhite,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: '#e3e3e3',
      borderRadius:50,
      padding:10,
  },
  authButtonText:{
    fontSize:20,
    color:'white',
    textAlign:'center',

  },
	startButton: {
			height:50,
			borderRadius: 50,
			borderStyle: 'solid',
			borderWidth: 4,
			borderColor: '#e3e3e3',
			backgroundColor:'green',
			padding: 1,
			width:'90%',
			marginLeft:'auto',
			marginRight:'auto',
			// marginLeft:'50%',
			marginBottom: 10,
			// marginLeft:'5%',
	},
	stopButton: {
			height:50,
			borderRadius: 50,
			borderStyle: 'solid',
			borderWidth: 4,
			borderColor: '#e3e3e3',
			backgroundColor:'red',
			padding: 1,
			width:'90%',
			marginLeft:'auto',
			marginRight:'auto',
			// marginLeft:'50%',
			marginBottom: 10,
			// marginLeft:'5%',
	},

	button: {
			height:50,
			borderRadius: 50,
			borderStyle: 'solid',
			borderWidth: 4,
			borderColor: '#e3e3e3',
			backgroundColor:'skyblue',
			padding: 1,
			width:'90%',
			marginLeft:'auto',
			marginRight:'auto',
			// marginLeft:'50%',
			marginBottom: 10,
			// marginLeft:'5%',
	},
  buttonText:{
      fontSize:20,
      color:'white',
      textAlign:'center',
			padding:5,
  },
  buttonIcon:{
      color:colors.bdWhite,
      marginLeft:80,
      marginTop:-27
  },
	addButton:{
		position: 'absolute',
		bottom:60,
		right:20,
		padding: 5,
		height: 50,
		width: 50,  //The Width must be the same as the height
		borderRadius:100, //Then Make the Border Radius twice the size of width or Height
		backgroundColor:colors.bgMainRed,
		zIndex:999,

	},

	card:{
		borderRadius:20,
		// backgroundColor:'orange'
	}


})
