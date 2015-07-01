Template.replyItem.helpers({
    ownsReply: function() {
        return (this.userId == Meteor.userId()) || 
            (Meteor.user().username == 'root');  // tmp solution for admin        
    }
});

Template.replyItem.events({
    "click .del_reply": function(e) {
        e.preventDefault();        
        Replies.remove({_id: this._id});
        Asks.update({_id: this.askId}, {$inc:{reCnt: -1}});
    }
});