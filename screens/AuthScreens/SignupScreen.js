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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { WebBrowser } from 'expo';

import LoginForm from '../../components/LoginForm.js'

import { Input,Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';


import {postNewUser} from '../../actions/authActions'
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
    username:null,
    password: null,
    passwordConfirmation: null,
    phone: "",
    token: { },
    loading: true,
    error: null,
    passSel: false,
    passConfSel: false,
    credsChecked: true,

}

signup = async(e) => {
  e.preventDefault()
  // await this._attemptGeocodeAsync()
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone,
      username: this.state.username,
    }
    if ((this.props.password.length > 5)
       && (this.props.password === this.props.passwordConfirmation)
        && EmailValidator.validate(this.props.email)
         && (this.props.phone.length === 10)
          && (this.props.name !== null)
          &&(this.props.username !==null)) {
            this.setState({credsChecked: false})
            UserAdapter.addNewUser(data)
            .then(() => this.setUserToken())
            // .then(() => this.props.clearAddPet())

            //try to refecator these fetches out and only pull setcurrentuser from
            //action
            // .then(()=>this.props.setCurrentUser())
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

setUserToken = () => {
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    fetch(API_URL`login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
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
        AsyncStorage.setItem('access_token', response.access_token)
        this.setState({loading: false})
        this.props.setCurrentUser(this.state.email, response.access_token, this.props.navigation, "signup")
      }
    })
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
    <>
      <TextInput
        style={styles.input}
        placeholder='Name'
        autoCapitalize="words"
        placeholderTextColor='white'
        onChangeText={(name) => this.setState({name})}
        value={this.state.name}
      />
      <TextInput
        style={styles.input}
        placeholder='Email'
        keyboardType='email-address'
        autoCapitalize="none"
        placeholderTextColor='white'
        onChangeText={(email) => this.setState({email})}
        value={this.state.email}
      />
      <TextInput
        style={styles.input}
        placeholder='Username'
        autoCapitalize="none"
        placeholderTextColor='white'
        onChangeText={(username) => this.setState({username})}
        value={this.state.username}
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
        <TextInput
          style={styles.input}
          placeholder='Phone Number'
          keyboardType='phone-pad'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={(phone) => this.setState({phone})}
          value={this.state.phone}
        />

      </>
        )
      }
  }
  render() {
    return (
      <View>
        {this.renderInputs()}
        {this.renderSignupButon()}
      </View>
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

    navBar: {
      height: 50,
      justifyContent: 'center',
      paddingHorizontal: 25

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

})
