
Asks = new Mongo.Collection('asks');
//Asks = new Meteor.Collection('asks');


Replies = new Mongo.Collection('replies');

askHelper = {};
askHelper.vote = function(act, id) {
    var ret = 0;
    var vote = Logs.findOne({u:Meteor.userId(), c: "ask", i: id, $or:[{a:'vup'}, {a:'vdn'}]}, {_id: 1, a:1});

    if(vote == null) {
        // new vote
        if(act == "vup") {
            Asks.update({_id: id}, {$inc: {up: 1}});
            ret = 1;
        } else if (act == "vdn") {
            Asks.update({_id: id}, {$inc: {down: 1}});
            ret = -1;              
        } else {
            return -2;
        }

        gostart.actLog(act, 'ask', id, false);
    } else {
        if(act == 'vup') {
            if(vote.a == 'vdn') {
                ret = 0;
                Asks.update({_id: id}, {$inc: {down: -1}});                
                Logs.remove({_id: vote._id});
            } else {
                ret = 1;
            }
        } else if (act == 'vdn') {
            if(vote.a == 'vup') {
                ret = 0;
                Asks.update({_id: id}, {$inc: {up: -1}});
                Logs.remove({_id: vote._id});
            } else {
                ret = -1;
            }
        } else {
            ret = 0;
        }
    }
    return ret;
};

askHelper.getVoted = function (id) {
    var res = Logs.findOne({u:Meteor.userId(), $or: [{a: "vup"}, {a: "vdn"}], c: "ask", i: id}, {a: 1});
    ret = -2;
    if (res == null) {
        ret = 0;
    } else {
        if (res.a == 'vup') {
            ret = 1;
        } else if (res.a == 'vdn') {
            ret = -1
        }
    }

    return ret;
}
