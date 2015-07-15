
Template.askList.helpers({
        asks: function() {
            return Asks.find({}, {sort:{created: -1}});
        }
});

Template.askList.events({
    "click .vote": function(e) {
        e.preventDefault();
        Meteor.call('vuAsk', this._id); 
    }
})