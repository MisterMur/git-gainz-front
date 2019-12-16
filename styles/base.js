// app/styles/base.js

import {StyleSheet, Dimensions} from 'react-native'

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}

export const colors  = {
  primary: '#226B74',
  secondary: '#254B5A',
  tertiary: '#5DA6A7'
}

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
