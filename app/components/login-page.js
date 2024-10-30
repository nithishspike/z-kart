import Ember from 'ember';
export default Ember.Component.extend({
    email:'',
    actions:{
        submitEmail(){
            // this.event.preventDefault;
            console.log("submitted the data");
            this.transitionToRoute("/");
            // if (this.email) {
            //     this.transitionToRoute('login/password', { queryParams: { email: this.email } });
            //   } else {
            //     alert('Please enter a valid email');
            //   }
        }
    }
});
