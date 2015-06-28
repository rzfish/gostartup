
Template.prodList.helpers({
        data: function() {
            return {prods: Products.find()};
        }
});

Template.prodTable.onRendered(function() {
    gostart.strippedRow("prod_list", "bg-light");
});