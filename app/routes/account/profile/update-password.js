import Ember from 'ember';

export default Ember.Route.extend({
    resetController(controller,isExisting){
        if (isExisting) {
            controller.set('password','');
            controller.set('newPassword','');
            controller.set('confirmPassword','');
            controller.set('passwordError','');
            controller.set('newPasswordError','');
            controller.set('confirmPasswordError','');
            controller.set('isVerified',false);
            controller.set('error','');
        }
    }
});
