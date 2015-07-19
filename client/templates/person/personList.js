Template.personList.helpers({
        persons: function() {
            return Persons.find();
        },		
});

Template.personList.onRendered(function() {
    gostart.strippedRow("person_list", "bg-light");
});

Template.personListItem.helpers({
        isVIP: function() {
            return this.money >= 99;
        },	
});