Template.personList.helpers({
        persons: function() {
            return Persons.find();
        }
})