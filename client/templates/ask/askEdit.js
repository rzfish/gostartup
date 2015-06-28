
Template.askEdit.events({
    'submit form' : function(e) {
        e.preventDefault();
        t = $(e.target);

        var tlt = t.find('[name=title]').val();
        var tg = t.find('[name=tag]').val();
        var dtl = t.find('[name=detail]').val();
        var prid = t.find('[name=product]').val() || "";
        var err_str = "";
        if(tlt == "") {
            err_str += " － 标题不能为空\n";
        }
        if(tg == "") {
            err_str += " － 必须选一个求助标签\n";
        }
        if(dtl.length < 10) {
            err_str += " － 内容不能少于10个字\n"
        }
        if(prid == "") {
            err_str += " － 必须选择一个产品\n";
        }

        if(err_str.length > 0) {
            alert("请检查输入是否符合以下要求：\n" + err_str);
            return;
        }
        var ask = {
            title: tlt,
            tag: tg,
            detail: dtl,
            prodId: t.find('[name=product]').val(),
        };

        var id = t.find('[name=id]').val();
        if(id == "") {  //new ask
            ask.author = Meteor.user().username;
            ask.userId = Meteor.userId();
            ask.created = $.now();
            ask.updated = ask.created;
            ask.reCnt = 0;
            ask.pv = 0;
            ask.up = 0;
            Asks.insert(ask);
            gostart.actLog('crtAsk', id, false)
            log.o = "crAsk";
        } else {
            ask.updated = $.now();
            log.i = id;
            Asks.update({_id: id}, {$set: ask});
            gostart.actLog('upAsk', id, false)
        }

        Router.go('askList');
    },
});

Template.askEdit.onRendered(function() {
    var pcnt = Products.find({userId:Meteor.userId()}).count();
    if(pcnt <= 0) {
        alert("新建求助前必须先新建产品");
        Router.go("prodNew");
        return;
    }

    if(this.data) {
        this.$('#tag').val(this.data.tag);
        this.$('#product').val(this.data.prodId);
    } else {
        this.$('#product').val(Session.get('prodIdForNewAsk'));
        Session.set('prodIdForNewAsk', null);
    }
});

Template.askEdit.helpers({
    myProducts: function() {
        return Products.find({userId: Meteor.userId()});
    },
})