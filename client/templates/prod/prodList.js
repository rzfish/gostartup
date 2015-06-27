
Template.prodList.helpers({
        data: function() {
            return {prods: Products.find()};
        }
});

Template.prodList.onRendered(function() {
    gostart.strippedRow("prod_list", "bg-light");
});