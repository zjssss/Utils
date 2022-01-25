let dateUtil = {};
/**
 *
 * @param {Number} date JavaScript时间对象
 * @param {Number} startType 格式化后的时间，"2018-11-26"
 */
dateUtil.getDate = (date) => {
    let day = new Date(date);
    let cmonth = (day.getMonth() + 1) < 10 ? '0' + (day.getMonth() + 1) : (day.getMonth() + 1);
    let cday = day.getDate() < 10 ? '0' + day.getDate() : day.getDate();
    let strDay = day.getFullYear() + '-' + cmonth + '-' + cday;
    return strDay;
};

/**
 *
 * @param {Number} date JavaScript时间对象
 * @param {Number} startType 格式化后的时间，"2018-11-26 09:00"
 */
dateUtil.getDateTime = (date) => {
    let day = new Date(date);
    let cmonth = (day.getMonth() + 1) < 10 ? '0' + (day.getMonth() + 1) : (day.getMonth() + 1);
    let cday = day.getDate() < 10 ? '0' + day.getDate() : day.getDate();
    let hour = (day.getHours()) < 10 ? '0' + (day.getHours()) : (day.getHours());
    let min = (day.getMinutes()) < 10 ? '0' + (day.getMinutes()) : (day.getMinutes());
    let strDay = day.getFullYear() + '-' + cmonth + '-' + cday + ' ' + hour + ':' + min;
    return strDay;
};

/**
 *
 * @param {Number} date JavaScript时间对象
 * @param {Number} startType 格式化后的时间，"2018年11月26 09:00"
 */
dateUtil.getDateTime_zh = (date) => {
    let day = new Date(date);
    let cmonth = (day.getMonth() + 1) < 10 ? '0' + (day.getMonth() + 1) : (day.getMonth() + 1);
    let cday = day.getDate() < 10 ? '0' + day.getDate() : day.getDate();
    let hour = (day.getHours()) < 10 ? '0' + (day.getHours()) : (day.getHours());
    let min = (day.getMinutes()) < 10 ? '0' + (day.getMinutes()) : (day.getMinutes());
    let strDay = day.getFullYear() + '年' + cmonth + '月' + cday + '日 ' + hour + ':' + min;
    return strDay;
};

/**
 * @param datetime javascript时间对象
 * @param format 转换时间格式 eg:"yyyy-MM-dd hh:mm:ss"
 */
dateUtil.getDateTimeFormat = (datetime, format) => {
    // debugger
    let date = new Date(datetime);
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}
/** 
 * 比当前年份少一年
*/
dateUtil.getLessYear = (datetime, format) => {
    let date = new Date(datetime);
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, ((date.getFullYear()-1) + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}
/** 
 * 当前日期之后的第七天，即一个星期的周期
*/
dateUtil.afterSevenDay=(datetime, format)=>{
    let date = new Date(datetime);
    // date.setDate(date.getDate()+6)
   let time= date.getTime(date);
    let oneDay = 1000*60*60*24;
    let sevenDay = oneDay*7;
    let after = time + sevenDay;
    date.setTime(after)
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, ((date.getFullYear()) + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

/** 
 * 当前日期的上一年份 的一个星期后
*/
dateUtil.LastYear_SevenDay=(datetime, format)=>{
    let date = new Date(datetime);
    // date.setDate(date.getDate()+6)
   let time= date.getTime(date);
    let oneDay = 1000*60*60*24;
    let sevenDay = oneDay*7;
    let after = time + sevenDay;
    date.setTime(after)
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, ((date.getFullYear()-1) + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

/** 
 * 当前日期的 的一个星期前
*/
dateUtil.beforeSevenDay=(datetime, format)=>{
    let date = new Date(datetime);
    // date.setDate(date.getDate()+6)
   let time= date.getTime(date);
    let oneDay = 1000*60*60*24;
    let sevenDay = oneDay*7;
    let after = time - sevenDay;
    date.setTime(after)
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, ((date.getFullYear()) + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}
/**
 *
 * @param {Number} date JavaScript时间对象
 * @return eg:传入"2019-11-26 12:10:11"返回"2018-11-26 00:00:00"
 */
dateUtil.getDateZero = (date) => {
    let day = new Date(date);
    let cmonth = (day.getMonth() + 1) < 10 ? '0' + (day.getMonth() + 1) : (day.getMonth() + 1);
    let cday = day.getDate() < 10 ? '0' + day.getDate() : day.getDate();
    let strDay = day.getFullYear() + '-' + cmonth + '-' + cday;
    strDay = strDay + " 00:00:00";
    return strDay;
};

/**
 * 获取当前时间前的x分钟
 * @param {Number} x 
 * @return eg:返回"2018-11-26 00:00:00"
 */
dateUtil.getTimeBeforeMin = (x) => {
    let minuteToTime = 1000 * 60 * x;
    let time = new Date().getTime() - minuteToTime;
    let strDay = dateUtil.getDateTimeFormat(time,'yyyy-MM-dd hh:mm:ss');
    return strDay;
};

export default dateUtil;