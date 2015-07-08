actLog = {}
actLog.log = function(act, cat, id, unique) {
    if(unique===true) {
        var sid = act + cat + id + Meteor.userId();
        if(sessionStorage[sid] != "1") {
            sessionStorage[sid] = "1";
        } else {
            return false;
        }
    }
    var log = {
        t: (new Date()).getTime(),
        u: Meteor.userId(),
        a: act,
        c: cat,     // category
        i: id,
    };
    Logs.insert(log);
    return true;
};

actLog.action = function(log) {
    var ret = '未知';
    var ac = log.a + log.c
    switch (ac) {
    case 'updask':
        ret = '更新求助';
        break;
    case 'crtask': 
        ret = '新建求助';
        break;
    case 'vstask':
        ret = '浏览求助';
        break;
    case 'repask': 
        ret = '回复求助';
        break;
    case 'vupask': 
        ret = '赞求助';
        break;
    case 'vdnask': 
        ret = '踩求助';
        break;
    case 'flwask': 
        ret = '关注求助';
        break;
    case 'uflask': 
        ret = '取消关注';
        break;

    case 'vstprd': 
        ret = '浏览产品';
        break;
    case 'updprd': 
        ret = '更新产品';
        break;
    case 'delprd': 
        ret = '删除产品';
        break;
    case 'updpsn': 
        ret = '更新个人信息';
        break;
    case 'crtpsn': 
        ret = '完善个人信息';
        break;
    }

    return ret;
};

actLog.target = function(log) {
    var ret = log.i;
    switch(log.c) {
    case 'ask':
        var ask = Asks.findOne({_id: log.i});
        ret = '<a href="/ask/detail/' + ask._id + '">' + ask.title +'</a>';
        break;
    case 'prd':
        var product = Products.findOne({_id: log.i});
        ret = '<a href="/product/detail/' + product._id + '">' + product.title + '</a>' ;           
        break
    }

    return ret;    
}
