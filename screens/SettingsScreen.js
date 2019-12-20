import React from 'react';
import { DrawerActions } from 'react-navigation';
import {connect} from 'react-redux'

import FAIcon from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
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
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('authStack');
  };
  handleLogout=()=>{
    this.props.logoutCurrentUser()
    this.props.navigation.navigate('authStack')

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
          <Text style={styles.buttonText}>this.state.user.phonenumber</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={null}
          style={styles.inactiveButtons}>
          <Text style={styles.buttonText}>this.state.user.email</Text>
        </TouchableOpacity>
        <TouchableOpacity
           onPress={this.handleLogout}
           style={styles.inactiveButtons}>
           <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

      </View>
    )

}


  renderLogoutButton(){
    return (
      <>
        <Button
          style={styles.buttons}
          icon={<Icon name="user" color="#4F8EF7" />}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='Logout'
          onPress={this._signOutAsync}
         />
      </>
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
// const mapDispatchToProps= dispatch=> ({
//   setCurrentSchedule:(schedule)=>dispatch(setCurrentSchedule(schedule))
// })

function mapStateToProps(state){
  const {auth}=state

  return {
    currentUser:auth.currentUser,

  }

}

export default connect(mapStateToProps,{logoutCurrentUser})(SettingsScreen)

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
