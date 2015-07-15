Template.registerHelper('timeStr', function(ts) {
    var dt = new Date(ts);
    return  + dt.getFullYear() + "/"
            + (dt.getMonth()+1)  + "/" 
            + dt.getDate() + " "
            + dt.getHours() + ":"  
            + dt.getMinutes() + ":" 
            + dt.getSeconds();    
});

Template.registerHelper('timeDiff', function(ts){
    var dt = new Date(ts);
    var d = new Date();
    var diff = (d - dt) / 1000;
    var day_diff = Math.floor(diff / 86400);

    return day_diff == 0 && (
            diff < 60 && "刚才" ||
            diff < 120 && "1分钟前" ||
            diff < 3600 && Math.floor( diff / 60 ) + "分钟前" ||
            diff < 7200 && "1 hour ago" ||
            diff < 86400 && Math.floor( diff / 3600 ) + "小时前") ||
        day_diff == 1 && "昨天" ||
        day_diff < 7 && day_diff + "天前" ||
        day_diff < 31 && Math.ceil( day_diff / 7 ) + "星期前";
});