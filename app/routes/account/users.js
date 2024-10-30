import Ember from 'ember';

export default Ember.Route.extend({

    resetController(controller,isExisting){
        if (isExisting) {
                controller.set('userDetail','');
                controller.set('searchValue','');
        }
    }
});
