import Ember from 'ember';
import ajaxReq from '../../utils/ajax-req';

export default Ember.Controller.extend({
    userDetail:null,
    searchValue:null,
    isLoggedIn: Ember.computed.alias('dataStore.isLoggedIn'),
    isAdmin:Ember.computed.alias('dataStore.isAdmin'),
    actions:{
        fetchUser(){
            console.log(this.get("searchValue"));
            ajaxReq({
                endpoint:'users',
                data: {"email":this.get("searchValue") },
            })
            .then((res)=>{
                console.log(res);
                this.set("userDetail",res[0]);
            })
            // Ember.$.ajax({
            //     url:'http://localhost:8002/api/v1/users',
            //     type:'GET',
            //     data: {"email":this.get("searchValue") },
            //     contentType: 'application/json',
            // })
            // .then((res)=>{
            //     console.log(res);
            //     this.set("userDetail",res[0]);
            // })
        }
    }
});
