
Template.prodDetail.events({
    'click #btn_update': function(e) {
        Router.go('/product/update/' + this._id)
    },
    'click #btn_reply': function(e) {
        Router.go('/product/reply/' + this._id)
    },

    'click #btn_del': function(e) {
        var r = confirm("你确定要删除该产品？")
        if(r == true) {
            Products.remove({_id: this._id});
            Router.go('prodList');
        }
    }, 
    'click #btn_ask': function(e) {
        Session.set('prodIdForNewAsk', this._id);
        Router.go('askNew');
    }

});

Template.prodDetail.helpers({
  owns: function() {
    return (this.userId == Meteor.userId()) || 
        (Meteor.user().username == 'root');  // tmp solution for admin
  },
  asks: function() {
    return Asks.find({prodId: this._id});
  }
});

Template.prodDetail.onRendered(function(){
    gostart.actLog('vst', 'prd', this._id, true);
});

