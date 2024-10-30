import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('products');
  this.route('login');
  this.route('signup');
  this.route('product',{path:'/product/:pid'});
  this.route('account', function() {
    this.route('profile', function() {
      this.route('update-password',{path:'updatepassword'});
    });
    this.route('orders');
    this.route('users');
  });
  this.route('checkout', function() {
    this.route('order-confirmation');
  });

});

export default Router;
