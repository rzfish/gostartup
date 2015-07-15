
Template.personDetail.events({
    'click #btn_update': function(e) {
        Router.go('/person/update/' + this._id)
    },
    'click #btn_del' : function(e) {
        e.preventDefault();
        var r = confirm("你确定要删除这个用户吗？");
        if (r == true){
            Persons.remove({_id: this._id});
            Router.go('personList');
        }
    },
    "click #a_showPersonInfo": function() {
        $('#personInfo').toggleClass('hidden');
    },
});

Template.personDetail.helpers({
    isMe: function() {
        return this.person._id == Meteor.userId();
    },
    data: function() { 
        var prod = Products.find({userId: this.person._id});
        if (prod.count() == 0) {
            prod = null;
        }
        return {
            prods: prod,
            asks: Asks.find({userId: this.person._id}),
            feeds: Logs.find({u: this.person._id}, {sort: {t: -1}}),
            referralAsks: Logs.find({i: this.person._id,a:'ref',c:'psn'},{sort: {t: -1}}),            
        };
    },
});

Template.personDetail.onRendered(function(){
    if(this.data.person._id != Meteor.userId()) {
        $('#personInfo').toggleClass('hidden');
    }
});

Template.personInfo.helpers({
    owns: function() {
        return (this._id == Meteor.userId()) || 
            (Meteor.user().username == 'root');  // tmp solution for admin
    },
    isRoot: function() {
        return (Meteor.user().username == 'root');  // tmp solution for admin
    },
});

