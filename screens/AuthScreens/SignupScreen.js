import React from "react";

import {connect} from 'react-redux'
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage,
} from 'react-native';
import { WebBrowser } from 'expo';

// 3rd party lib imports
import { Input,Button} from 'react-native-elements'
import * as EmailValidator from 'email-validator';
import FAIcon from 'react-native-vector-icons/FontAwesome'
import { Hoshi } from 'react-native-textinput-effects';


//components imports
import LoginForm from '../../components/LoginForm.js'
import Container from '../../components/Container.js'

//actions imports
import {postNewUser,setCurrentUser} from '../../actions/authActions'

//constants imports
import {API_URL} from '../../constants/types.js'
//style imports
import colors from '../../styles/colors'

class SignupScreen extends React.Component {
  static navigationOptions = {
    header: null,
    drawerLabel: 'SignUpScreen',
    // drawerIcon: ({ }) => (   ),
  };
  state = {
    name: "",
    email: "",
    username:'',
    password: '',
    passwordConfirmation: '',
    phone: "",
    token: { },
    loading: true,
    error: null,
    passSel: false,
    passConfSel: false,
    credsChecked: true,

}

signup = () => {
  // e.preventDefault()
  // await this._attemptGeocodeAsync()
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      // phone: this.state.phone,
      // username: this.state.username,
    }
    if ((this.state.password.length > 5)
       && (this.state.password === this.state.passwordConfirmation)
        && EmailValidator.validate(this.state.email)
         // && (this.state.phone.length === 3)
          && (this.state.name !== null)
          // &&(this.state.username !==null)
        )   {
            this.setState({credsChecked: false})
            this.props.postNewUser(user)
            .then(() => this.setUserToken())

            //try to refecator these fetches out and only pull setcurrentuser from
            //action
      }
      else {
          Alert.alert(
          'Invalid Credentials',
          'Please verify your information is correct and unique',
          [
            {
              text: 'OK',
              onPress: () => console.log('Ok Pressed'),
              style: 'cancel',
            },
          ],
          {cancelable: false},
        )
      }
  }
  async saveLoginToken(userTok){
    try{
      await AsyncStorage.setItem('access_token',userTok);
    } catch(error){
      console.error('AsyncStorage error: '+error.message);
    }
  }

setUserToken = () => {
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    fetch(API_URL+`login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({user})
    })
    .then(res => res.json())
    .then(response => {
      if (response.errors) {
        console.log("response: ", response);
          this.setState({ error: true, errMsg: response.errors })
          Alert.alert(
          'Invalid Credentials',
          'Please verify your information is correct and unique',
          [
            {
              text: 'OK',
              onPress: () => this.setState({credsChecked: true}),
              style: 'cancel',
            },
          ],
          {cancelable: false},
        )
      } else {
        this.saveLoginToken(response.access_token)
        // AsyncStorage.setItem('access_token', response.access_token)
        this.setState({loading: false})
        this.props.setCurrentUser()
        this.props.navigation.navigate('drawerStack')

      }
    })
  }

  renderHeader() {

      return (
          <View style={ styles.headerHolder }>
            <Text type='h1White' style={ styles.siteName }>Welcome to Git-Gainz</Text>
              <Image
                size={100}
                style={styles.logo}
                source={require('../../assets/images/gitgainzicon.png')}
              />
          </View>
      )
  }

  renderSignupButon(){
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
      <TouchableOpacity style={styles.signupButton}  onPress={ ()=>{this.signup()} }>
        <Text style={styles.buttonText}>Sign Up!</Text>
        <FAIcon name='sign-out' size={30} style={styles.buttonIcon}  />


      </TouchableOpacity>
    </View>
    )
  }
  renderInputs() {
  if (this.state.credsChecked) {
  return (

      <View style={styles.authInputs}>

        <Hoshi
          label={'Name'}
          borderColor={'#b76c94'}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          />

        <Hoshi
          label={'Email'}
          borderColor={'#b76c94'}
          onChangeText={(email)=>this.setState({email})}
          value={this.state.email}
          />


        {this.state.password.length < 6 && this.state.passSel ? <Text style={{color: 'red', marginLeft: 10}}>Password must be at least 6 characters</Text>: null}
        <TextInput
          style={styles.input}
          placeholder='Password'
          onFocus={() => this.setState({passSel: true})}
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          />
        {this.state.password !== this.props.passwordConfirmation && this.state.passConfSel ? <Text style={{color: 'red', marginLeft: 10}}>Passwords do not match</Text>: null}
        <TextInput
          style={styles.input}
          placeholder='Confirm Password'
          onFocus={() => this.setState({passConfSel: true})}
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={(passwordConfirmation) => this.setState({passwordConfirmation})}
          value={this.state.passwordConfirmation}
          />
      </View>

        )
      }
  }
  render() {
    return (
      <Container style={[ styles.container, this.props.style || {} ]}>
        {this.renderHeader()}
        {this.renderInputs()}
        {this.renderSignupButon()}
      </Container>
    )
  }
}
const mapDispatchToProps=dispatch=>({
  postNewUser:(u)=>dispatch(postNewUser(u)),
  setCurrentUser:(email,res,nav,from)=>dispatch(setCurrentUser(email,res,nav,from)),
})
function mapStateToProps(state){
  const {auth}=state

  return {


  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignupScreen)

const styles = StyleSheet.create({
    viewStyle: {
      marginTop: 50,
      padding: 10,
    },
    container: {
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowOffset: { height: -5, width:-5},
        shadowRadius: 10,
        backgroundColor: colors.bgMain,
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
})
