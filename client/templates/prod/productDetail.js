
Template.prodDetail.events({
    'click #btn_update': function(e) {
        Router.go('/product/update/' + this._id)
    },
    'click #btn_reply': function(e) {
        Router.go('/product/reply/' + this._id)
    }

})