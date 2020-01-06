import React from 'react';
import {  AsyncStorage, StatusBar, StyleSheet, View} from 'react-native';
import { connect } from 'react-redux';
import { getUserToken } from '../../Redux/actions'

class AuthLoadingScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor() {
        super();
    }

    componentDidMount() {
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = () => {

        this.props.getUserToken().then(() => {
            this.props.navigation.navigate('ScheduleList');
        })
            .catch(error => {
                this.setState({ error })
            })

    };

    // Render any loading content that you like here
    render() {
      console.log(this.props.token, this.props.token.token);
      // <ActivityIndicator/>
        return (
            <View style={styles.container}>
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

function mapStateToProps(state) {
  return {
    token: state.user.token,
  }
};


function mapDispatchToProps(dispatch) {
  return {
    getUserToken: () => dispatch(getUserToken()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
