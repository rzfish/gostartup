
Template.personEdit.events({
    'submit #person_edit' : function(e) {
        e.preventDefault();
        var t = $(e.target);
        var person = {
            name: t.find('[name=name]').val(),
            wxid: t.find('[name=weixinId]').val(),
            mail: t.find('[name=email]').val(),
            mobile: t.find('[name=mobile]').val(),
            sex: t.find('[name=sex]').val(),
            loc: t.find('[name=current_location]').val(),
            bthLoc: t.find('[name=borth_location]').val(),
            birth: t.find('[name=birth_period]').val(),
            status: t.find('[name=status]').val(),
            timeIn: t.find('[name=time_input]').val(),
            capIn: t.find('[name=money_input]').val(),
            career: t.find('[name=career_area]').val(),
            tgtArea: t.find('[name=target_area]').val(),
            tag: gostart.getCheckboxGroupValues(t.find('[name=my_tag]')),
            frndTag: gostart.getCheckboxGroupValues(t.find('[name=friend_tag]')),
            intro: t.find('[name=intro]').val(),
        };

        id = t.find('[name=id]').val();
        if(id.length > 0) {
            person._id = id;
            Persons.update({_id: id}, person);

        } else {
            Persons.insert(person);
        }

        Router.go('personList');
    },

    'load #person_edit' : function(e) {
        alert('hello');
    }
})