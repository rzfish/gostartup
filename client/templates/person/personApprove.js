Template.personApprove.events({
    'click #btn_agree': function(e) {
		var referralAsk = Logs.findOne({u: this.person._id,a:'ref'});
		this.person.personStatus = 1;
		Persons.update({_id: this.person._id}, {$set:{personStatus:1}});
		Logs.remove({_id: referralAsk._id});
		gostart.actLogUser(referralAsk.u, 'acpt', 'psn', referralAsk.i, false);//申请者的message
		gostart.actLog('acpt', 'psn', referralAsk.u, false);//审批者的message
        Router.go('/person/' + referralAsk.i);
    },
    'click #btn_disAgree' : function(e) {
        var referralAsk = Logs.findOne({u: this.person._id,a:'ref', c:'psn'});
		Logs.remove({_id: referralAsk._id})
		gostart.actLogUser(referralAsk.u, 'rej', 'psn', referralAsk.i, false);//申请者的message
		gostart.actLog('rej', 'psn', referralAsk.u, false);//审批者的message
        Router.go('/person/' + referralAsk.i);
    },
});