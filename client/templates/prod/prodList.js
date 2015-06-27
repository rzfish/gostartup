
Template.prodList.helpers({
        prods: function() {
            return Products.find();
        }
});

Template.prodList.onRendered(function() {
    gostart.strippedRow("prod_list", "bg-light");
});