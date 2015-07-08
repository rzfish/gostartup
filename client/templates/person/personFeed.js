Template.personFeed.helpers({
    data: function() {
        var flw = Follows.find({u:Meteor.userId(), t:'ask'}, {_id:0, i:1});
        var ia = new Array();
        flw.forEach(function(r) {
            console.log('follow targets: ' + r);
            ia.push(r.i);
        });
        var ret = Logs.find({i:{$in: ia}, u:{$not: Meteor.userId()}});
        return ret;
    }
});

Template.personFeedItem.helpers({
    name: function() {
        var p = Persons.findOne({_id:this.u}, {name: 1, _id: 0});
        return p.name;
    },
    action: function() {return actLog.action(this);},
    target: function() {return actLog.target(this);},
});