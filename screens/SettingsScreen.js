import React from 'react';
import { DrawerActions } from 'react-navigation';
import {connect} from 'react-redux'

import FAIcon from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  View,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native'

import { Card,
   ListItem,
    Button  ,
    Divider,
    Input,
} from 'react-native-elements'

import colors from '../styles/colors'

import {logoutCurrentUser} from '../actions/authActions'


class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };
  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }

 logout= ()=>{
    this.props.logoutCurrentUser()
    this.props.navigation.navigate('loginStack')
  }
  renderNavBar() {
      return (
          <View style={ styles.navBar }>
              <TouchableOpacity onPress={ this.openDrawer }>
                  <FAIcon name='bars' size={22} style={{ color: colors.bgMainRed }} />
              </TouchableOpacity>
          </View>
      )
  }
  renderUserDetails = () => {

    return (
      <View style={{backgroundColor: '#FFFFFF', width: '98%', marginLeft: '1%', borderRadius: 5}}>
        <TouchableOpacity
          onPress={null}
          style={styles.inactiveButtons}>
          <Text style={styles.buttonText}>Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={null}
          style={styles.inactiveButtons}>
          <Text style={styles.buttonText}>Username</Text>
        </TouchableOpacity>
        <TouchableOpacity
           onPress={this.logout}
           style={styles.inactiveButtons}>
           <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

      </View>
    )

}



  render() {
    return (
      <View>


        {this.renderNavBar()}
        {this.renderUserDetails()}
      </View>
    )
  }
}
const mapDispatchToProps= dispatch=> ({
  logoutCurrentUser:()=>dispatch(logoutCurrentUser())
})

function mapStateToProps(state){
  const {auth}=state

  return {
    currentUser:auth.currentUser,

  }

}

export default connect(mapStateToProps,mapDispatchToProps)(SettingsScreen)

const styles = StyleSheet.create({
    navBar: {
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 25
    },
    settingsContainer: {
      flex: 1,
      paddingTop: 45
    },
    logInSignUp: {
      width: '95%',
      height: 55,
      backgroundColor: '#00b894',
      margin: 10,
      padding: 8,
      color: 'white',
      borderRadius: 14,
      fontSize: 20,
      fontWeight: '500',
    },
    buttonText:{
      color: 'white',
      fontSize: 18,
      marginTop: 5,
      textAlign: 'center'
    },
    petButtons: {
      width: '95%',
      height: 55,
      backgroundColor: 'white',
      margin: 10,
      padding: 8,
      color: '#00b894',
      borderRadius: 14,
      fontSize: 20,
      fontWeight: '500',
    },
    inactiveButtons: {
      width: '95%',
      height: 55,
      backgroundColor: '#03A9F4',
      opacity: 1.0,
      margin: 10,
      padding: 8,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 14,
      fontSize: 20,
      fontWeight: '500',
    },
})
