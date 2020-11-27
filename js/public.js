//二级列表显示隐藏
var mark = $('.topest .topNav .topNavRight .mark');
var markList = $('.topest .topNav .topNavRight .markList');
mark.mouseenter(function() {
    markList.css('display', 'block');
})
markList.mouseenter(function() {
    markList.css('display', 'block');
})
mark.mouseleave(function() {
    markList.css('display', 'none');
})
markList.mouseleave(function() {
    markList.css('display', 'none');
})
var service = $('.topest .topNav .topNavRight .service');
var serviceList = $('.topest .topNav .topNavRight .serviceList');
service.mouseenter(function() {
    serviceList.css('display', 'block');
})
service.mouseleave(function() {
    serviceList.css('display', 'none');
})
serviceList.mouseenter(function() {
    serviceList.css('display', 'block');
})
serviceList.mouseleave(function() {
    serviceList.css('display', 'none');
})


window.addEventListener('scroll', function() {
    var sTop = $('body,html').scrollTop(); // 目前监听的是整个body的滚动条距离
    // console.log(sTop);
    if (sTop > 150) {
        $('.fixHeader').css({ 'top': '0px' });
    } else {
        $('.fixHeader').css({ 'top': '-100px' });

    }
})

//获取时间差
function getDifTime(startDate, endDate) {
    return (endDate.getTime() - startDate.getTime()) / 1000;
}