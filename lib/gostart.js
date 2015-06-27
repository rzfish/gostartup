gostart = {};
gostart.getCheckboxGroupValues = function(boxes) {
    var all = new Array();
    for(var i in boxes) {
        if (boxes[i].checked){
            all.push(boxes[i].value);
        }
    }

    var ret = all.join(',');
    if(ret == "") {
        ret = "无";
    }
    return ret;
}

gostart.setCheckboxGroup = function(boxes, values) {
    var va = values.split(',');

    for(var b in boxes) {
        var box = boxes[b];
        if(_.contains(va, box.value)) {
            box.checked = true;
        }
    }
}

gostart.setSelectOptions = function(select, options) {
    select.empty();
    for(o in options) {
        select.append("<option value='" + o + "'>" + o + "</option>");
    }
}

gostart.getTimeStr = function(ts) {
    var dt = new Date(ts);
    return  + dt.getFullYear() + "/"
            + (dt.getMonth()+1)  + "/" 
            + dt.getDate() + " "
            + dt.getHours() + ":"  
            + dt.getMinutes() + ":" 
            + dt.getSeconds();
}

gostart.printObject = function(obj) {
    var res = "{";
    for (var p in obj ) {
        if (typeof obj[p] === 'object') {
            res += p + ": " + this.printObject(obj[p]);
        }
        else {
            res += (p + ": " + obj[p] + "; ");
        }
    }
    res += "}";
    return res;
}

gostart.strippedRow = function(id, cls) {
    $("#" + id + " .row:odd").addClass(cls);
}

return gostart;