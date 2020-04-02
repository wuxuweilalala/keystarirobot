export default function timeFormatter(params) {
    let time = new Date()
    let y = time.getFullYear();
    let month = time.getMonth() + 1;
    let d = time.getDate();
    if (params && params.prefix) {
        month = time.getMonth() + 1 > 10 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1);
        d = time.getDate() > 10 ? time.getDate() : '0' + time.getDate();
    }
    let h = time.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = time.getMinutes();
    let s = time.getSeconds();
    m = m < 10 ? ('0' + m) : m;
    s = s < 10 ? ('0' + s) : s;
    // let w = this.getWeek(time.getDay());
    let obj = {};
    obj.date = y + '/' + month + '/' + d;
    obj.nowTime = h + ':' + m + ':' + s;
    // obj.w = w;
    if (params && params.format) {
        switch (params.format) {
            case "local":
                obj.date = y + '年' + month + '月' + d + '日';
                break;
            case "dash":
                obj.date = y + '-' + month + '-' + d;
                break;
        }
    }
    return obj
}
