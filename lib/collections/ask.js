
Asks = new Mongo.Collection('asks');
//Asks = new Meteor.Collection('asks');


Replies = new Mongo.Collection('replies');

Meteor.methods({
    askVote: function(id) {
        var voted = Logs.find({u:Meteor.userId(), a: "vup", i: id}).count();
        if(voted == 0) {
            gostart.actLog('vup', 'ask', id, false);
            Asks.update({_id: id}, {$inc: {up: 1}});
        }
    }
}
)