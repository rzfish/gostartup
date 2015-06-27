Template.personList.helpers({
        persons: function() {
            return Persons.find();
        }
});

Template.personList.onRendered(function() {
    gostart.strippedRow("person_list", "bg-light");
});