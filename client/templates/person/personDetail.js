
Template.personDetail.events({
    'click #btn_update': function(e) {
        Router.go('/person/update/' + this._id)
    }
});

Template.personDetail.helpers({
    owns: function() {
        return (this._id == Meteor.userId()) || 
            (Meteor.user().username == 'root');  // tmp solution for admin
    }
})