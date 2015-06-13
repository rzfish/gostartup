
Template.prodList.helpers({
        prods: function() {
            return Products.find();
        }
})