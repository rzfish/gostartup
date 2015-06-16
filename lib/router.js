
Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: '404',
});

Router.route('/', {name: 'index'});
Router.route('/ask/list', {name:'askList'});
Router.route('/ask/new', {name:'askNew'});
Router.route('/ask/update/:_id', {
    name:'askUpdate',
    data: function() {return Asks.findOne(this.params._id);}
});
Router.route('/person/new', {name:'personNew'});
Router.route('/person/list', {name:'personList'});
Router.route('/person/:_id', {
    name: 'personDetail', 
    data: function() {return Persons.findOne(this.params._id);}
});
Router.route('/person/update/:_id', {
    name: 'personUpdate', 
    data: function() {return Persons.findOne(this.params._id);}
});

Router.route('/product/new', {name:'prodNew'});
Router.route('/product/list', {name:'prodList'});
Router.route('/product/detail/:_id', {
    name: 'prodDetail', 
    data: function() {return Products.findOne(this.params._id);}
});
Router.route('/product/update/:_id', {
    name: 'prodUpdate', 
    data: function() {return Products.findOne(this.params._id);}
});
Router.route('/product/reply/:_id', {
    name: 'prodReply', 
    data: function() {return Products.findOne(this.params._id);}
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin, {except: "index"});