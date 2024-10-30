import Route from '@ember/routing/route';
import $ from 'jquery';
import RSVP from 'rsvp'; // Import RSVP
import ajaxReq from '../utils/ajax-req';

export default Route.extend({
  model() {
    return RSVP.hash({  // Use RSVP.hash to handle multiple promises
      products:ajaxReq({
        endpoint:'product',
        data:{'page_number':1,'page_size':20},
      }),
    }).then((response) => {
        console.log("success",response)
      return response; // Response will be an object containing products, categories, and brands
    }).catch((error) => {
      console.error('Error fetching data:', error,"value " +{});
      return {};
    });
  }
});



