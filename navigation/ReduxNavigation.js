import React from 'react'
import * as ReactNavigation from 'react-navigation'
import { connect } from 'react-redux'
import PrimaryNav from './AppNavigation'

// here is our redux-aware our smart component
function ReduxNavigation (props) {
  const { dispatch, nav } = props
  // const navigation = ReactNavigation.addNavigationHelpers({
  //   dispatch,
  //   state: nav
  // })

  // return <PrimaryNav navigation={navigation} />
  return   <PrimaryNav navigation={{
     dispatch: props.dispatch,
     state: props.nav,
  }} />
}

const mapStateToProps = state => ({ nav: state.nav })
export default connect(mapStateToProps)(ReduxNavigation)
