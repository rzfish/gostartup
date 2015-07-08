Template.logItem.helpers({
    action: function() {
        return actLog.action(this);
    },

    target: function() {
        return actLog.target(this);
    }
});