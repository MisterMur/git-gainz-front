import {AsyncStorage} from 'react-native'
import {API_URL} from '../constants/types.js'

export default class ScheduleAdapter {
  static async getSchedules() {
  const item = await AsyncStorage.getItem('access_token')
  // console.log('in schedule adapter',item)
  return fetch(`${API_URL+`schedules`}`, {
    method: "GET",
    headers: {
      Authorization: item
    }
    })
    .then(res => res.json())
  }


  static async fetchSchedules(){
    const item = await AsyncStorage.getItem('access_token')
    return fetch(API_URL+'schedules',{
      method:"GET",
      headers:{Authorization:item}
    })
    .then(this.handleErrors)
    .then(res=>{
      return res.json()
    })

  }

  static async  addNewSchedule(schedule){
    const userToken = await AsyncStorage.getItem('access_token')
    return fetch(API_URL+'schedules',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'Accepts':'application/json',
        'Authorization':userToken
      },
      body:JSON.stringify({
        schedule
      })
    })
    .then(res=>{return res.json() })
    .then(sched=>{
      return fetch( API_URL+'user_schedules',{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'Accepts':'application/json',
          Authorization:userToken
        },
        body:JSON.stringify({
          schedule_id:sched.id,
          user_id: userToken.split(':')[0]
        })
      }).then(this.handleErrors)
    }).then(this.handleErrors)

  }


  static async getSchedulesWorkouts(schedule){
    const userToken = await AsyncStorage.getItem('access_token')
    console.log('in getschedulewokouts schedule:',schedule)
    return fetch(API_URL+`schedules/${schedule.id}`,{
      method:"GET",
      headers:{Authorization:userToken}
    })
    .then(this.handleErrors)
    .then(sched=> sched.json())

  }


    handleErrors(response) {
      console.error('in handle errors, response:', response)
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

}
