
Template.prodEdit.events({
    'submit form' : function(e) {
        e.preventDefault();
        t = $(e.target);
        var tlt = t.find('[name=title]').val();
        var dtl = t.find('[name=short_intro]').val();
        var err_str = "";
        if(tlt == ""){
            err_str += " － 产品名称不能为空\n";
        }
        if(dtl.length < 10) {
            err_str += " － 简介不能小于10个字\n";
        }
        if (err_str.length > 0) {
            alert("请检查输入是否符合以下要求：\n" + err_str);
            return;
        }
        var prod = {
            title: tlt,
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
            prod.author = Meteor.user().username;
            prod.userId = Meteor.userId();
            prod.created = $.now();
            prod.updated = prod.created;
            prod.reCnt = 0;
            prod.up = 0;
            Products.insert(prod);
        } else {
            prod.updated = $.now();
            Products.update({_id: id}, {$set: prod});
        }
        Router.go('prodList');
    },
});

Template.prodEdit.onRendered(function() {
    this.$('#pain_level').val(this.data.painLvl)
    }
);