
Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: '404',
});

Router.route('/', {name: 'index'});
Router.route('/ask/new', {name:'askNew'});
Router.route('/ask/update/:_id', {
    name:'askUpdate',
    data: function() {return Asks.findOne(this.params._id);}
});
Router.route('/ask/list', {name:'askList'});
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

Router.route('/product/new', {name:'prodEdit'});

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