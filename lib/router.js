
Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: '404',
});

Router.route('/', {name: 'index'});
Router.route('/ask/list', {name:'askList'});
Router.route('/ask/new', {name:'askNew'});
Router.route('/ask/detail/:_id', {
    name:'askDetail',
    data: function() {return {
      ask: Asks.findOne(this.params._id),
      replies:Replies.find({askId: this.params._id}, {sort:{created: -1}})
      };}
});
Router.route('/ask/update/:_id', {
    name:'askUpdate',
    data: function() {return Asks.findOne(this.params._id);}
});

Router.route('/person/list', {name:'personList'});
Router.route('/person/new', {
    name: 'personNew',
    data: function() {return Persons.findOne({_id: Meteor.userId()});}
});
Router.route('/person/:_id', {
    name: 'personDetail', 
    data: function() {
      if(this.params._id == 'me') {
        return Persons.findOne({_id: Meteor.userId()});
      }
      return Persons.findOne(this.params._id);}
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