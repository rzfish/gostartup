
Template.askEdit.events({
    'submit form' : function(e) {
        e.preventDefault();
        t = $(e.target);
        var ask = {
            title: t.find('[name=title]').val(),
            detail: t.find('[name=detail]').val(),
        };
        Asks.insert(ask);
        Router.go('askList');
    }
})