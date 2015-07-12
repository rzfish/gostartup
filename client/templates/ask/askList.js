
Template.askList.helpers({
    asks: function() {
        return Asks.find({}, {sort:{created: -1}});
    },
});

Template.askList.events({
    // "click .vote": function(e) {
    //     e.preventDefault();
    //     Meteor.call('askVote', this._id); 
    // }
});

Template.askItem.helpers({
    abs: function() {
        var str = this.detail;
        var truncated = false;
        var target_len = 20;
        var idx = str.indexOf('\n');
        if( idx > 0) {
            truncated = true;
            str = str.substr(0, idx);
        } 
        if( str.length > target_len) {
            truncated = true;
            str = str.substr(0, target_len);
        }

        if (truncated) {
            str += " ...";
        }
        return str;
    },
    vote: function() {
        return this.up - this.down;
    }

});

Template.askItem.events({
    "click .a_vote_up" : function(e) {
        e.preventDefault();
        var ret = askHelper.vote("vup", this._id);
        $("#a_up_" + this._id).toggleClass("voted");
    },

    "click .a_vote_down" : function(e) {
        e.preventDefault();
        var ret = askHelper.vote("vdn", this._id);
        $("#a_down_" + this._id).toggleClass("voted");
    }
});

Template.askItem.onRendered(function() {
    var upid = "#a_up_" + this.data._id;
    var dnid = "#a_down_" + this.data._id;
    if(askHelper.isVoted("vup", this.data._id)) {
        $(upid).toggleClass("voted");
    }
    if(askHelper.isVoted("vdn", this.data._id)) {
        $(dnid).toggleClass("voted");
    }
})