
Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: '404',
});

Router.route('/', {name: 'index'});
Router.route('/ask/edit', {name:'askEdit'});
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
