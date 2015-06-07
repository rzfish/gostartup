gostart = {};
gostart.getCheckboxGroupValues = function(boxes) {
    var all = new Array();
    for(var i in boxes) {
        if (boxes[i].checked){
            all.push(boxes[i].value);
        }
    }

    return '[' + all.join(',') + ']';
}

return gostart;