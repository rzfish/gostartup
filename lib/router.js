
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
      var id = this.params._id;
      if(id == 'me') {
        id = Meteor.userId();
      }
      return {person: Persons.findOne(id)};
    }
});
Router.route('/person/update/:_id', {
    name: 'personUpdate', 
    data: function() {return Persons.findOne(this.params._id);}
});
Router.route('/person/approve/:_id',{
   name:'personApprove',
   data:function(){
       var id = this.params._id;
       return {person: Persons.findOne(id)};
   }
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

function requireLogin() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

function requirePersonInfo() {
  var pcnt = Persons.find({_id: Meteor.userId()}).count();
  if(pcnt == 0 && Meteor.user().username != "root") {
    this.render('personNew');
  } else {
    this.next();
  }
}

function requireRefereeAgreed() {
	person = Persons.findOne({_id: Meteor.userId()});
	if(person.personStatus == 0)//申请人未同意
	{
		alert("申请人批准前不能创建。");
	}else{
		this.next();
	}
}

function requireVIP() {
	person = Persons.findOne({_id: Meteor.userId()});
	if(person.money >= 99)//VIP
	{
		this.next();
	}else{
		alert("需要先成为VIP用户");
	}
}

Router.onBeforeAction(requireLogin, {except: ["index"]});
Router.onBeforeAction(requirePersonInfo, {except: ["index", "personNew"]});
Router.onBeforeAction(requireRefereeAgreed, {only: ["askNew","prodNew"]});
Router.onBeforeAction(requireVIP, {only: ["askNew","prodNew"]});