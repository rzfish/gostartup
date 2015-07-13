
Template.personEdit.events({
    'submit #person_edit' : function(e) {
        e.preventDefault();
        var t = $(e.target);
        var nm = t.find('[name=name]').val();
        var email = t.find('[name=email]').val();
        var wx = t.find('[name=weixinId]').val();
        var phone = t.find('[name=mobile]').val();
        var dage = t.find('[name=dogAge]').val();
        var stat = t.find('[name=status]').val();
        var ti = t.find('[name=time_input]').val();
        var ci = t.find('[name=money_input]').val();
        var err_str = "";
        if(nm == "") { err_str += " － 必须填写真实姓名\n"; }
        if(email == "") {
            err_str += " － 必须填写email\n";
        } else if (email.match(/[^.]+@[^.]+\..*/) == null){
            err_str += " － email格式不正确\n";
        }
        if(wx == "") { err_str += " － 必须填写微信号\n";}
        if(phone == "") { err_str += " － 必须填写手机号\n"; }
        var need_invest = gostart.getCheckboxGroupValues(t.find('[name=need_invest]'));
        if (need_invest == "无") {
            need_invest = "否";
        } else {
            if (stat == "" || ti == "" || ci == "") {
                err_str += " － 需要投资时必须完整填写创投对接信息";
            }
        }

        if(err_str.length > 0) {
            alert("请检查输入是否符合以下要求：\n" + err_str);
            return;
        }
        var person = {
            name: nm,
            wxid: wx,
            mail: email,
            mobile: phone,
            sex: t.find('[name=sex]').val(),
            loc: t.find('[name=s_prov]').val() + "-" + 
                t.find('[name=s_city]').val(),
            birth: t.find('[name=birth_period]').val(),
            dogAge: dage,
            status: stat,
            timeIn: ti,
            capIn: ci,
            career: t.find('[name=career_area]').val(),
            tag: gostart.getCheckboxGroupValues(t.find('[name=my_tag]')),
            frndTag: gostart.getCheckboxGroupValues(t.find('[name=friend_tag]')),
            needInvest: need_invest,
            intro: t.find('[name=intro]').val(),
        };

        var id = t.find('[name=id]').val();
        if(id.length > 0) {
            Persons.update({_id: id}, {$set:person});
            gostart.actLog('upd', 'psn', id, false);
        } else {
            id = Meteor.userId();
            person._id = id;
            person.created = $.now();
            person.lastV = person.created;
            Persons.insert(person);
            gostart.actLog('crt', 'psn', id, false);
        }

        // update user profile
        if(id == Meteor.userId()){
            var pf = {name: person.name};
            Meteor.users.update({_id:Meteor.userId()}, {$set:{profile: pf}});
        }
        Router.go('personList');
    },
});

Template.personEdit.onRendered(function() {
        var t = this;
        if(this.data){
            t.$('#sex').val(this.data.sex);
            t.$('#birth_period').val(this.data.birth);
            t.$('#sel_dogAge').val(this.data.dogAge);
            t.$('#status').val(this.data.status);
            t.$('#time_input').val(this.data.timeIn);
            t.$('#money_input').val(this.data.capIn);
            t.$('#career_area').val(this.data.career);
            gostart.setCheckboxGroup(t.$('[name=my_tag]'), this.data.tag);
            gostart.setCheckboxGroup(t.$('[name=need_invest]'), this.data.needInvest);
            Cities.initOpts = this.data.loc.split("-");
        }
        Cities.selOpts = ["现居住省份", "现居住市"];
        Cities.init();
    }
);