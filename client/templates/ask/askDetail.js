
Template.askDetail.events({
    'click #a_reply' : function(e) {
        e.preventDefault();
        t = $(e.target);
        var div = $('#div_reply');
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
    'submit form' : function(e) {
        e.preventDefault();
        t = $(e.target);
        var rep = {
            comment: t.find('[name=comment]').val(),
        };

        rep.author = Meteor.user().username;
        rep.userId = Meteor.userId();
        rep.created = gostart.getTimeStr();
        rep.updated = rep.created;
        rep.askId = this._id;
        Replies.insert(rep);
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