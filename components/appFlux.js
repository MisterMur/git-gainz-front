import Authentication from './screens/LoginScreen'
import ScheduleListScreen from './screens/ScheduleListScreen'
import WorkoutListScreen from './screens/WorkoutListScreen'
import WorkoutScreen from './screens/WorkoutScreen'


import LoginScreen from './screens/AuthScreens/LoginScreen'

export const fluxrender() {
    if (!this.state.isLoaded) {
      return (
      )
    } else {
      return(
        <Provider store={store}>
          <Router>
            <Scene key='root'>
              <Scene
                component={LoginScreen}
                initial={!this.state.hasToken}
                hideNavBar={true}
                key='Authentication'
                title='Authentication'
              />
            {this.renderWorkoutScenes()}



            </Scene>
          </Router>
        </Provider>
      )
    }
  }

  renderWorkoutScenes(){
    return (
      <>
      <Scene
        key="WorkoutTab"
        tabs={true}
        tabBarStyle={{ backgroundColor: '#FFFFFF' }}
      >
  {/* Tab and it's scenes */}
        <Scene key="osu" title="OSU" icon={TabIcon}>
          <Scene
            component={ScheduleListScreen}
            initial={this.state.hasToken}
            hideNavBar={true}
            key='Home'
            title='Schedules'
            />
          <Scene
            component={WorkoutListScreen}
            initial={this.state.hasToken}
            hideNavBar={true}
            key='WorkoutList'
            title='Workout List'
            />
          <Scene
            component={WorkoutScreen}
            initial={this.state.hasToken}
            hideNavBar={true}
            key='Workout'
            title='Workout'
            />
        </Scene>
      </Scene>
      </>
    )

  }
  const TabIcon = ({ selected, title }) => {
    return (
      <Text style={{color: selected ? 'red' :'black'}}>{title}</Text>
    );
  }
