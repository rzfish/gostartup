
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

});

Template.personDetail.helpers({
    owns: function() {
        return (this._id == Meteor.userId()) || 
            (Meteor.user().username == 'root');  // tmp solution for admin
    },
    isRoot: function() {
        return (Meteor.user().username == 'root');  // tmp solution for admin
    },
    prods: function() {
        return Products.find({userId: this._id});
    },
    myAsks: function() {
        return Asks.find({userId: this._id});
    }
})