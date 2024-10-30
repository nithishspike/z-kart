import Ember from 'ember';
import transformData from '../../utils/transform-data';
import ajaxReq from '../../utils/ajax-req';

export default Ember.Controller.extend({
    currentPage: 0, 
    totalPage:null,
    isLoggedIn: Ember.computed.alias('dataStore.isLoggedIn'),
    isAdmin:Ember.computed.alias('dataStore.isAdmin'),
    // orders: [], 
    searchValue: null, 
    adminMsg:"",
    disableNextPage:Ember.computed("currentPage","totalPage",function(){
        return this.get('currentPage') === this.get('totalPage')-1;
    }),
    userMsg:"No orders found. Please check back later or place a new order",
    isEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.get("searchValue"));
    },

    actions: {
        fetchOrdersHistory() {
            console.log("email is"+this.get("searchValue"));
            
            let data = {
                page_number: this.currentPage,
                page_size: 6
            };

            if(this.get("searchValue"))
            {
                if (this.isEmail()) {
                    data.email = this.get("searchValue");
                } else {
                    data.invoice_number = this.get("searchValue");
                }
            }
            ajaxReq({
                endpoint:'orders',
                data:data
            })
            .then((res)=>{
                if(res.length==0)
                    {
                        this.set("totalPage",this.currentPage-1);
                        if(localStorage.getItem("isAdmin")){
                            this.set("adminMsg","No results match your search");
                        }
                        if(this.currentPage!=0){
                            this.set("disableNextPage",true)
                        }
                    }
                    else{
                        this.set('model', transformData(res)); 
                        this.set("disableNextPage",false);
                    }
            })
        },
        //     Ember.$.ajax({
        //         url: 'http://localhost:8002/api/v1/orders',
        //         data: data,
        //         type: "GET",
        //         contentType : 'application/json',
        //         error: (error) => {
        //             console.error('Error searching orders:', error);
        //         }
        //     })
        //     .then((res) => {
        //         if(res.length==0)
        //         {
        //             this.set("totalPage",this.currentPage-1);
        //             if(localStorage.getItem("isAdmin")){
        //                 this.set("adminMsg","No results match your search");
        //             }
        //             if(this.currentPage!=0){
        //                 this.set("disableNextPage",true)
        //             }
        //         }
        //         else{
        //             this.set('model', transformData(res)); 
        //             this.set("disableNextPage",false);
        //         }
        //     });
        // },
        incrementPage() {
            this.set('currentPage', this.get('currentPage') + 1);
            this.send('fetchOrdersHistory');
        },
        decrementPage() {
            let newPage = this.get('currentPage') - 1;
            if (newPage >= 1) {
                this.set('currentPage', newPage);
                this.send('fetchOrdersHistory');
            }
        }
    }
});
