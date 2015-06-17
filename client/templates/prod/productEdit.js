
Template.prodEdit.events({
    'submit form' : function(e) {
        e.preventDefault();
        t = $(e.target);

        var prod = {
            title: t.find('[name=title]').val(),
            tag: t.find('[name=tag]').val(),
            intro: t.find('[name=short_intro]').val(),
            url: t.find('[name=site_url]').val(),
            pain: t.find('[name=pain_point]').val(),
            painLvl: t.find('[name=pain_level]').val(),
            pnToMe: t.find('[name=pain_to_me]').val(),
            special: t.find('[name=special]').val(),
            //advtg: t.find('[name=advantage]').val(),
        };

        var id = t.find('[name=id]').val();
        if(id == "") {  //new prod
            author: Meteor.user().username;
            prod.created = gostart.getTimeStr();
            prod.updated = prod.created;
            prod.reCnt = 0;
            prod.up = 0;
            Products.insert(prod);
        } else {
            Products.update({_id: id}, {$set: prod});
        }
        Router.go('prodList');
    },
});

Template.prodEdit.onRendered(function() {
    this.$('#pain_level').val(this.data.painLvl)
    }
);