
Template.askEdit.events({
    'submit form' : function(e) {
        e.preventDefault();
        t = $(e.target);
        var ask = {
            //author: Meteor.user(),
            title: t.find('[name=title]').val(),
            tag: t.find('[name=tag]').val(),
            detail: t.find('[name=detail]').val(),
        };

        var id = t.find('[name=id]').val();
        if(id == "") {
            Asks.insert(ask);
        } else {
            ask._id = id;
            Asks.update({_id: id}, ask);
        }
        Router.go('askList');
    },
});

Template.askEdit.onRendered(function() {
        this.$('#tag').val(this.data.tag);
    }
);