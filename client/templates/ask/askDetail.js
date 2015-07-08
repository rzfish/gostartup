
Template.askDetail.events({
    'click #a_reply' : function(e) {
        e.preventDefault();
        t = $(e.target);
        var div = $('#div_reply');
        $("#ta_comment").val("");
        div.toggleClass("hidden");
    },
    'click #a_del' : function(e) {
        e.preventDefault();
        var r = confirm("你确定要删除这个求助？");
        if (r == true){
            Asks.remove({_id: this._id});
            Router.go('askList');
        }
    },
    'click #a_vote' : function(e) {
        e.preventDefault();
        Meteor.call('askVote', this._id);
    },
    'click #a_follow' : function(e) {
        e.preventDefault();
        var res = followHelper.toggle(this._id);
        var title = '关注'
        if (res) {
            title = '取消关注';
        }
        $('#a_follow').text(title);
    },

    'submit form' : function(e) {
        e.preventDefault();
        t = $(e.target);
        content = t.find('[name=comment]').val();
        if (content.length < 10) {
            alert('回复内容不能小于10个字');
            return;
        }
        var rep = {
            comment: content,
        };

        rep.author = Meteor.user().username;
        rep.userId = Meteor.userId();
        rep.created = $.now();
        rep.updated = rep.created;
        rep.askId = this._id;

        Replies.insert(rep);
        Asks.update({_id: this._id}, {$inc: {reCnt: 1}});
        gostart.actLog('rep', 'ask', this._id, false);
        $("#div_reply").toggleClass("hidden");
    },
});

Template.askDetail.helpers({
  ownAsk: function() {
    return (this.userId == Meteor.userId()) || 
        (Meteor.user().username == 'root');  // tmp solution for admin
  },
  
  forProd: function() {
    return Products.findOne({_id: this.prodId}, {title: 1})
  }
});

Template.askDetail.onRendered(function(){
    var res = gostart.actLog('vst', 'ask', this.data.ask._id, true);
    if(res) {
        Asks.update({_id: this.data.ask._id}, {$inc: {pv: 1}})
    }

    res = followHelper.get(this.data.ask._id);
    if(res) {
        $('#a_follow').text("取消关注");
    }
});