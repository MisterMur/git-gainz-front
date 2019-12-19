import React from "react";


import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import { WebBrowser } from 'expo';
import colors from '../styles/colors'
import FAIcon from 'react-native-vector-icons/FontAwesome'

import { MonoText } from '../components/StyledText';
import LoginForm from '../components/LoginForm.js'
import { DrawerActions } from 'react-navigation';
import DemoScreen from './drawers/DemoScreen'
import Container from '../components/Container'
import { Input,Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux'
import {setCurrentUser}from '../actions/authActions.js'

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: "Login",
    drawerLabel: 'Login Screen',

  };
  componentDidMount() {
    item = AsyncStorage.getItem('access_token')
    console.log('login access_token',item)
    if (item) {
      //navigate to away from login screen if already loggedin

      this.props.navigation.navigate('ScheduleList')
    }
  }
  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }
  renderNavBar() {
      return (
          <View style={ styles.navBar }>
              <TouchableOpacity onPress={ this.openDrawer }>
                  <FAIcon name='bars' size={22} style={{ color: colors.txtWhite }} />
              </TouchableOpacity>
          </View>
      )
  }

  renderHeader() {
    // <FAIcon name='bomb' size={100} style={ styles.logo } />

      return (
          <View style={ styles.headerHolder }>
            <Text type='h1White' style={ styles.siteName }>Welcome to Git-Gainz</Text>
              <Image
                size={100}
                style={styles.logo}
                source={require('../assets/images/gitgainzicon.png')}
              />
          </View>
      )
  }


  render() {
    // { this.renderNavBar() }
    return (
      <Container style={[ styles.container, this.props.style || {} ]}>
        { this.renderHeader() }
          <LoginForm navigation={this.props.navigation} />
      </Container>
    )
  }
}
function mapStateToProps(state) {
  const {auth} = state
  return {
    currentUser: auth.currentUser
  }
}

export default connect(mapStateToProps)(LoginScreen);


const styText = { color: colors.txtWhite }
const styles = StyleSheet.create({
    container: {
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowOffset: { height: -5, width:-5},
        shadowRadius: 10,
        backgroundColor: colors.bgMain,
    },
    navBar: {
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 25
    },
    headerHolder: {
        padding: 25,
        flex: 1
    },
    logo: {
        // ...styText,
        marginTop: 10
    },
    siteName: {
        marginTop: 30,
        width: 250
    },
    btnHeader: {
        width: 160,
        height: 40,
        marginVertical: 70,
        borderWidth: 2,
        borderColor: colors.bdWhite,
        backgroundColor: 'transparent'
    },
    btnHeaderTitleStyle: {
        fontSize: 14,
        fontWeight: '700'
    }
})
