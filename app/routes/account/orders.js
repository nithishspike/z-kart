import Ember from 'ember';
import transformData from '../../utils/transform-data';
import ajaxReq from "../../utils/ajax-req"

export default Ember.Route.extend({
    dataStore: Ember.inject.service('data-store'), 
    model() {
        
        if (localStorage.getItem("isAdmin")=="false") {
            
            return ajaxReq ({
                endpoint:'orders',
                data: { page_size: 5, page_number: 1 },
            })
            .then((res) => {
                console.log(res);
                
                return transformData(res); // Return the transformed data
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
                return { error: 'Error fetching orders' }; // Return error to handle in the template
            });
            // return Ember.$.ajax({
            //     url: 'http://localhost:8002/api/v1/orders',
            //     data: { page_size: 5, page_number: 1 },
            //     type: 'GET',
            //     contentType: 'application/json'
            // })
            // .then((res) => {
            //     console.log(res);
                
            //     return transformData(res); // Return the transformed data
            // })
            // .catch((error) => {
            //     console.error('Error fetching orders:', error);
            //     return { error: 'Error fetching orders' }; // Return error to handle in the template
            // });
        }
    },
    resetController(controller,isExisting){
        
        if (isExisting) {
            
            controller.set('orders', []); // Reset orders
            controller.set('currentPage', 0); // Reset current page
            controller.set('searchValue', null); // Reset search value
            controller.set('totalPage', null); // Reset total pages
            controller.set('adminMsg', ""); // Reset admin message
            controller.set('disableNextPage', false); // Reset disable next page flag
            controller.set('model','');
        }
    }
});
