followHelper = {};

followHelper.toggle = function(id) {
    var flw = Follows.findOne({u: Meteor.userId(), t: 'ask', i: id});
    var ret = false;
    if (flw == null){
        var f = {
            t: $.now(),
            u: Meteor.userId(),
            t: 'ask',
            i: id
        }
        Follows.insert(f);

        Asks.update({_id: id}, {$inc: {follow: 1}});
        gostart.actLog('flw', 'ask', id, false);
        ret = true;
    } else {
        // cancel follow
        Follows.remove({_id: flw._id});
        Asks.update({_id: id}, {$inc: {follow: -1}});
        gostart.actLog('ufl', 'ask', id, false);
        ret = false
    }

    return ret;
};

followHelper.get = function(id) {
   return Follows.find({u: Meteor.userId(), t: 'ask', i: id}).count() > 0;
}