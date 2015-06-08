
Template.personDetail.events({
    'click #btn_update': function(e) {
        Router.go('/person/update/' + this._id)
    }
})