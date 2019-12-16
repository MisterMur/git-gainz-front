import {AsyncStorage} from 'react-native'
import {API_URL} from '../constants/types.js'

export default class ScheduleAdapter {
  static async getSchedules() {
  const item = await AsyncStorage.getItem('user_id')
  console.log('in user adapter',item)
  return fetch(`${API_URL+`schedules`}`, {
    method: "GET",
    headers: {
      Authorization: item
    }
    })
    .then(res => res.json())
  }
  export async function fetchSchedules(){
    // const schedulesUrl='http://localhost:3000/api/v1/schedules'
    const item =  AsyncStorage.getItem('user_id')
    console.log('async storage item',item)
    return dispatch=>{
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
      .then(schedules=>{
        // console.log('schedules *************',schedules)
        dispatch(fetchSchedulesSuccess(schedules))
        return schedules
      })
      .catch(error=> dispatch(fetchSchedulesFailure(error)))
    }
  }

  export async function postNewSchedule(schedule){
    // const scheduleUrl='http://localhost:3000/api/v1/schedules'
    // console.log('in handle add schedule',e)
    return dispatch=>{
      return fetch(API_URL+'schedules',{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'Accepts':'application/json'
        },
        body:JSON.stringify({
          schedule
        })
      })
      .then(this.handleErrors)
    }
  }

  export function handleErrors(response) {
    if (!response.ok) {
      console.log('in handle errors, response:', response)

      throw Error(response.statusText);
    }
    return response;
  }


}
