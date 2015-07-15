Template.personApprove.events({
    'click #btn_agree': function(e) {
		var referralAsk = Logs.findOne({u: this.person._id,a:'referral'});
		this.person.personStatus = 1;
		Persons.update({_id: this.person._id}, {$set:{personStatus:1}});
		Logs.remove({_id: referralAsk._id});
		gostart.actLog('acpt', 'psn', referralAsk.i, false);//TODO
        Router.go('/person/' + referralAsk.i);
    },
    'click #btn_disAgree' : function(e) {
        var referralAsk = Logs.findOne({u: this.person._id,a:'fef', c:'ask'});
		Logs.remove({_id: referralAsk._id})
		gostart.actLog('rej', 'psn', referralAsk.i, false);//TODO
        Router.go('/person/' + referralAsk.i);
    },
});


