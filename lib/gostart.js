gostart = {};
gostart.getCheckboxGroupValues = function(boxes) {
    var all = new Array();
    for(var i in boxes) {
        if (boxes[i].checked){
            all.push(boxes[i].value);
        }
    }

    return all.join(',');
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
return gostart;