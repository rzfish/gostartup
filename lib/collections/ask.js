
Asks = new Mongo.Collection('asks');
//Asks = new Meteor.Collection('asks');


Replies = new Mongo.Collection('replies');

askHelper = {};
askHelper.vote = function(act, id) {
    var ret = 0;
    var vote = Logs.findOne({u:Meteor.userId(), a: act, c: "ask", i: id}, {_id: 1});
    if(vote == null) {
        // new vote
        if(act == "vup") {
            Asks.update({_id: id}, {$inc: {up: 1}});
        } else if (act == "vdn") {
            Asks.update({_id: id}, {$inc: {down: 1}});                
        } else {
            return -1;
        }

        gostart.actLog(act, 'ask', id, false);

        ret = 1;
    } else {
        Logs.remove({_id: vote._id});
        if(act == "vup") {
            Asks.update({_id: id}, {$inc: {up: -1}});
        } else if (act == "vdn") {
            Asks.update({_id: id}, {$inc: {down: -1}});                
        } else {
            return -1;
        }
        ret = 0;
    }
    return ret;
};

askHelper.isVoted = function (act, id) {
    return Logs.find({u:Meteor.userId(), a: act, c: "ask", i: id}).count() > 0;
}
