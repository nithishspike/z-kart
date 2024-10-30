import Ember from 'ember';
import ajaxReq from '../utils/ajax-req';

export default Ember.Route.extend({
    queryParams: {
        filter_brand: {
            refreshModel: true 
        },
        filter_category: {
            refreshModel: true
        },
        max_price: {
            refreshModel: true
        },
        min_price: {
            refreshModel: true
        },
        max_stock: {
            refreshModel: true
        },
        page_number: {
            refreshModel: true
        },
        page_size: {
            refreshModel: true
        },
        filter_name: {
            refreshModel: true
        },
    },
    beforeModel(transition) {
        // this._super(controller, model);
        console.log(transition);
    },
    model(params) {
        console.log("Query parameters:", params);

        // Build the query string
        let query = {
            page_number: params.page_number || 0, // Default value if not provided
            page_size: params.page_size || 20, // Default value if not provided
            filter_brand: params.filter_brand,
            filter_category: params.filter_category,
            max_price: params.max_price,
            min_price: params.min_price,
            max_stock: params.max_stock , // Default value if not provided
            filter_name: params.filter_name
        };
        // Make the AJAX request with query parameters
        return ajaxReq({
            endpoint:'product',
            data:query,
        })
        // return $.ajax({
        //     url: 'http://localhost:8002/api/v1/product',
        //     data: query, // Send the query parameters as data
        //     credentials: 'include',
        //     type: 'GET'
        // });
    }
});
