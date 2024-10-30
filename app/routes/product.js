import Ember from 'ember';
import $ from 'jquery';
import RSVP from 'rsvp';
import ajaxReq from '../utils/ajax-req';

export default Ember.Route.extend({
    queryParams: {
        categoryId: {
          refreshModel: true  // Ensure the model is refreshed when this query param changes
        }
      },
    model(params){
        console.log("pid and categoryid ",params.pid,params.categoryId,params);
        return RSVP.hash({  // Use RSVP.hash to handle multiple promises
            products:ajaxReq({
              endpoint:'product',
              data:{
                product_id:params.pid
              },
            }),
            similarProducts:ajaxReq({
              endpoint:'product',
              data:{
                filter_category:params.categoryId,
                page_number:0,
                page_size:10,
              },
            })
            // products: $.ajax({
            //   url: 'http://localhost:8002/api/v1/product',
            //   data:{
            //     product_id:params.pid
            //   },
            //   credentials: 'include',
            //   type: 'GET',
            // }),
            // similarProducts: $.ajax({
            //   url: 'http://localhost:8002/api/v1/product',
            //   data:{
            //     filter_category:params.categoryId,
            //     page_number:0,
            //     page_size:10,
            //   },
            //   credentials: 'include',
            //   type: 'GET'
            // }),
          })
          .then((response) => {
              console.log("success product and similar product",response)
              response={
                product:response.products[0],
                similarProducts:response.similarProducts
              }
          return response; 
          }).catch((error) => {
            console.error('Error fetching data:', error);
            return {};
          });
    },
    afterModel(model, transition) {
        // console.log(model[0],model);
        // return model[0];
    },
});

