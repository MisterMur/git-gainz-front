// app/styles/base.js

import {StyleSheet, Dimensions} from 'react-native'
import colors from './colors'

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}

// export const colors  = {
//   primary: '#226B74',
//   secondary: '#254B5A',
//   tertiary: '#5DA6A7'
// }

export const padding = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40
}

export const fonts = {
  sm: 12,
  md: 18,
  lg: 28,
  primary: 'Cochin'
}
// export const login = {
//
// }
export const inputMain= {
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#e3e3e3',
    /*padding: 1,*/
    marginBottom: 15,
    overflow: 'hidden',
    height: 26,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf:  'flex-start'
  }
  export const inputContainer= {
    flex: 1,
    backgroundColor: 'red',
    padding: 1,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf:  'flex-start'
  }
  export const input= {
    height: 26,
    width: 200,
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center'
  }
  export const navBar = {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 25

  }
  export const addButton = {
      position: 'absolute',
      bottom:20,
      right:20,
      padding: 5,
      height: 50,
      width: 50,  //The Width must be the same as the height
      borderRadius:100, //Then Make the Border Radius twice the size of width or Height
      backgroundColor:colors.bgMainRed,
      zIndex:999,
  }

  export const styles = {
    navBar: {
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 25
    },
    container: {
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowOffset: { height: -5, width:-5},
        shadowRadius: 10,
        backgroundColor: colors.bgMain,
    },
    authButton: {
        width: '90%',
        marginLeft:'5%',
        marginVertical: 70,
        height: 50,
        borderColor: colors.bdWhite,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#e3e3e3',
        borderRadius:50,
    },
    authInputs: {
      borderRadius: 4,
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: '#e3e3e3',
      /*padding: 1,*/
      width:'90%',
      marginBottom: 150,
      marginLeft:'5%',
    },
    addButton:{
      position: 'absolute',
      bottom:20,
      right:20,
      padding: 5,
      height: 50,
      width: 50,  //The Width must be the same as the height
      borderRadius:100, //Then Make the Border Radius twice the size of width or Height
      backgroundColor:colors.bgMainRed,
      zIndex:999,

    },

  }


  const s = {
      viewStyle: {
        marginTop: 50,
        padding: 10,
      },

      headerHolder: {
          padding: 25,
          flex: 1
      },

      navBar: {
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 25,

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
      buttonText:{
          fontSize:20,
          color:'white',
          textAlign:'center',
      },
      authInputs: {
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
          marginVertical: 70,
          height: 50,
          borderColor: colors.bdWhite,
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderWidth: 2,
          borderColor: '#e3e3e3',
          borderRadius:50,
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
      logo: {
          // ...styText,
          marginTop: 10
      },

  }
