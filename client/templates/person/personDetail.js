
Template.personDetail.events({
    'click #btn_update': function(e) {
        Router.go('/person/update/' + $(e.target).find('[name=' + this._id + ']'))
    }
})