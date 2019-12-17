import {AsyncStorage} from 'react-native'
import {API_URL} from '../constants/types.js'

export default class ScheduleAdapter {
  static async getSchedules() {
  const item = await AsyncStorage.getItem('access_token')
  console.log('in schedule adapter',item)
  return fetch(`${API_URL+`schedules`}`, {
    method: "GET",
    headers: {
      Authorization: item
    }
    })
    .then(res => res.json())
  }


  static async fetchSchedules(){
    // const schedulesUrl='http://localhost:3000/api/v1/schedules'
    const item = await AsyncStorage.getItem('access_token')
    console.log('async storage item',item)

      // dispatch(fetchSchedulesBegin())

    console.log('in fetchschedules reducer: ',API_URL+'schedules')
    return fetch(API_URL+'schedules',{
      method:"GET",
      headers:{Authorization:item}
    })
    .then(this.handleErrors)
    .then(res=>{
      console.log('res',res)
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
          user_id: userToken[0]
        })
      }).then(this.handleErrors)
    }).then(this.handleErrors)

  }


    handleErrors(response) {
      console.log('in handle errors, response:', response)
      if (!response.ok) {

        throw Error(response.statusText);
      }
      return response;
    }

}
