import RSVP from "rsvp";
import Ember from "ember";
import ENV from 'online-shopping-client/config/environment';
export default function ajaxReq({endpoint,data={},method='GET'}) {

  // console.log(ENV);
  // console.log(ENV.API_BASE_URL);
  
  const url=`http://localhost:8002/api/v1/${endpoint}`;

  return new RSVP.Promise((resolve,reject)=>{
    Ember.$.ajax({
      url,
      data,
      type:method,
      credentials:'include',
      contentType: 'application/json',
    })
    .done((res)=>{
      resolve(res);
    })
    .fail((error)=>{
      reject(error);
    })
  })
}
