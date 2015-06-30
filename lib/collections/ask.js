
Asks = new Mongo.Collection('asks');
//Asks = new Meteor.Collection('asks');


Replies = new Mongo.Collection('replies');

Meteor.methods({
    askVote: function(id) {
        var voted = Logs.find({u:Meteor.userId(), o: "upAsk", i: id}).count();
        if(voted == 0) {
            gostart.actLog('upAsk', id);
            Asks.update({_id: id}, {$inc: {up: 1}});
        }
    }
}
)