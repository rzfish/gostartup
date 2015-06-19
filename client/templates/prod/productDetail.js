
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
    }
});

Template.prodDetail.helpers({
  owns: function() {
    return (this.author == Meteor.user().username) || 
        (Meteor.user().username == 'root');  // tmp solution for admin
  },

})

