
Template.askList.helpers({
        asks: function() {
            return Asks.find({}, {sort:{created: -1}});
        }
})