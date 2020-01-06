
import {StyleSheet, Dimensions} from 'react-native'
import colors from './colors'



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
      backgroundColor: colors.bgMain,
  },

  input: {
    width: 350,
    height: 55,
    backgroundColor: '#00b894',
    opacity: 0.6,
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
    justifyContent: 'center'
  },

  button: {
      height:20,
      borderRadius: 50,
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: '#e3e3e3',
      padding: 1,
      width:'90%',
      marginBottom: 20,
      marginLeft:'5%',
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
  buttonText:{
      fontSize:20,
      color:'white',
      textAlign:'center',
  },
  buttonIcon:{
      color:colors.bdWhite,
      marginLeft:80,
      marginTop:-27
  },


})
