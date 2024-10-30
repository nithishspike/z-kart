import Ember from 'ember';

export default Ember.Component.extend({
    showOverlay: false, 
    message: 'Are you sure?', 
    yesAction: null,        
    noAction: null,          

    actions: {
        handleYesClick() {
            if (this.yesAction) {
                this.yesAction();
            }
            this.set("showOverlay", false); 
        },
        handleNoClick() {
            if (this.noAction) {
                this.noAction();
            }
            this.set("showOverlay", false); 
        },
        handleCloseClick() {
            this.set("showOverlay", false); 
        }
    }
});
