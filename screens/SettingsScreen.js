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
} from 'react-native'

import { Card,
   ListItem,
    Button  ,
    Divider,
    Input
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
  handleLogout=()=>{
    this.props.logoutCurrentUser()
    this.props.navigation.navigate('loginScreen')

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


  renderLogoutButton(){
    return (
      <View style={styles.buttons}>
        <Button
          icon={<Icon name="user" color="#4F8EF7" />}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='Logout'
          onPress={this.handleLogout}
         />
      </View>
    )
  }


  render() {
    return (
      <>


        {this.renderNavBar()}
        {this.renderLogoutButton()}
      </>
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
})
