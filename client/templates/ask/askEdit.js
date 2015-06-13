
Template.askEdit.events({
    'submit form' : function(e) {
        e.preventDefault();
        t = $(e.target);

        var ask = {
            title: t.find('[name=title]').val(),
            tag: t.find('[name=tag]').val(),
            detail: t.find('[name=detail]').val(),
        };

        alert(gostart.printObject(Meteor.user()));
        return;
        var id = t.find('[name=id]').val();
        if(id == "") {  //new ask
            author: Meteor.user().username;
            ask.created = gostart.getTimeStr();
            ask.updated = ask.created;
            ask.reCnt = 0;
            ask.up = 0;
            Asks.insert(ask);
        } else {
            Asks.update({_id: id}, {$set: ask});
        }
        Router.go('askList');
    },
});

Template.askEdit.onRendered(function() {
        this.$('#tag').val(this.data.tag);
    }
);