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

import UserAdapter from '../adapters/userAdapter'

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: "Login",
    drawerLabel: 'Login Screen',

  };
  componentDidMount() {
    if (this.props.currentUser) {
      this.props.navigation.navigate('drawerStack')
    }
  }

  renderSignup(){
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
      <TouchableOpacity style={styles.signupButton}  onPress={ ()=>{this.props.navigation.navigate('signupScreen')} }>
        <Text style={styles.buttonText}>Sign Up!</Text>
        <FAIcon name='sign-out' size={30} style={styles.buttonIcon}  />


      </TouchableOpacity>
    </View>
    )
  }

  renderHeader() {

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
        {this.renderSignup()}
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

    signupButton: {
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
    buttonIcon:{
        color:colors.bdWhite,
        marginLeft:80,
        marginTop:-27
    }

})
