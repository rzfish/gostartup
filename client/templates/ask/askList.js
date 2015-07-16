
Template.askList.helpers({
    asks: function() {
        return Asks.find({}, {sort:{created: -1}});
    },
});

Template.askList.events({
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

function update_vote_button_color(id, vote_cnt) {
    switch(vote_cnt) {
    case 0:
        $("#a_up_" + id).removeClass("voted");
        $("#a_down_" + id).removeClass("voted");
        $("#vc" + id).attr("class","");
        break;
    case 1: 
        $("#a_up_" + id).addClass("voted");
        $("#a_down_" + id).removeClass("voted");
        $("#vc_" + id).attr("class","a_vote_up voted");
        break;
    case -1: 
        $("#a_up_" + id).removeClass("voted");
        $("#a_down_" + id).addClass("voted");
        $("#vc_" + id).attr("class","a_vote_down voted");
        break;
    }

}

Template.askItem.events({
    "click .a_vote_up" : function(e) {
        e.preventDefault();
        var ret = askHelper.vote("vup", this._id);
        update_vote_button_color(this._id, ret);
    },

    "click .a_vote_down" : function(e) {
        e.preventDefault();
        var ret = askHelper.vote("vdn", this._id);
        update_vote_button_color(this._id, ret);
    }
});

Template.askItem.onRendered(function() {
    var ret = askHelper.getVoted(this.data._id);
    update_vote_button_color(this.data._id, ret);
})