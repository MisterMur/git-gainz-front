import React from 'react';

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import LoginForm from '../components/LoginForm.js'
import {  navigate, NavigationActions, navigation } from 'react-navigation';

import { Input,Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  renderLogin=()=>{
    return (

      <>
      <Input
        placeholder='USERNAME'
        leftIcon={
          <Icon
            name='user'
            size={24}
            color='black'/>
        }/>
      <Input
        placeholder='PASSWORD'
        leftIcon={
          <Icon
            name='plus'
            size={24}
            color='black'/>
        }/>
      </>
    )


  }

  render() {
    // <Button title="Show me more of the app" onPress={this._showMoreApp} />
    // <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
    return (

      <View style={styles.container}>

          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Welcome to Git Gainz</Text>
          </View>

        <LoginForm navigation={this.props.navigation} />

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a Monkeybar</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>MainTabNavigator.js</MonoText>
          </View>
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  //custom
inputMain: {
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
  alignSelf:  'flex-start',
},
inputContainer: {
  flex: 1,
  backgroundColor: 'red',
  padding: 1,
  alignContent: 'flex-start',
  alignItems: 'flex-start',
  alignSelf:  'flex-start'
},
input: {
  height: 26,
  width: 200,
  fontSize: 12,
  justifyContent: 'center',
  alignItems: 'center'
},
});
