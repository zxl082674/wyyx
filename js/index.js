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

//吸顶固定
window.addEventListener('scroll', function() {
    var sTop = $('body,html').scrollTop(); // 目前监听的是整个body的滚动条距离
    // console.log(sTop);
    if (sTop > 150) {
        $('.fixHeader').css({ 'top': '0px' });
    } else {
        $('.fixHeader').css({ 'top': '-100px' });

    }
    if (sTop > 556) {
        $('.fixleft').css({ 'position': 'fixed', 'top': '62px', 'left': '276px' })
        $('.fixright').css({ 'position': 'fixed', 'top': '77px', 'right': '0px' })

    } else {
        $('.fixleft').css({ 'position': 'absolute', 'top': '8px', 'left': '-135px' })
        $('.fixright').css({ 'position': 'absolute', 'top': '8px', 'right': '-404px' })
    }
    if (sTop > 600) {
        $('.fixright ul .returnTop').css({ 'display': 'block' })
    } else {
        $('.fixright ul .returnTop').css({ 'display': 'none' })

    }
})

//点击回顶部
$('.fixright ul .returnTop').click(function() {
    $('body,html').scrollTop(0);
})



// banner轮播图

var imgLength = $('.m_unit ul li').length;
//使轮播切换正常，克隆一张图片1
$('.m_unit ul').append($('.m_unit ul li').eq(0).clone());
//下标作为信号量
var idx = 0;
//自动轮播
var timer = setInterval(rightBtnHandler, 4000);
//鼠标进入banner,清除自动播放
$('.banner').mouseenter(function() {
    clearInterval(timer);
});
//离开
$('.banner').mouseleave(function() {
    timer = setInterval(rightBtnHandler, 4000);
});
//点击右按钮
$('.rightBtn').click(rightBtnHandler);

function rightBtnHandler() {
    idx++;
    $('.m_unit').animate({ 'left': -1920 * idx }, 1500, function() {
        if (idx > imgLength - 1) {
            idx = 0;
            $(this).css('left', '0px')
        }
    });
    //圆点同时切换
    circleChange();
}
//左按钮
$('.leftBtn').click(function() {

    idx--;
    if (idx < 0) {
        idx = imgLength - 1;
        $('.m_unit').css('left', -1920 * imgLength);
    }
    $('.m_unit').animate({ 'left': -1920 * idx }, 1500);
    circleChange();

});

//小圆点点击
$('.circle ul li').each(function(i) {
    $(this).click(function() {
        idx = i;
        $('.m_unit').animate({ 'left': -1920 * idx }, 1500);
        circleChange();
    });
});
//小圆点更改
function circleChange() {
    var idxx = idx;
    //排他
    if (idxx > imgLength - 1) {
        idxx = 0;
    }
    $('.circle ul li').eq(idxx).css('background', 'lightgreen').siblings().css('background', 'lightblue')

}
var common = async function() {
    await $.ajax({
        url: './../data/data.json',
        type: 'get',
        dataType: 'json',
        async: true,
        success: function(data) {
            var jsonData = data[0].data.cateList
            var i = 0
            for (var key in jsonData) {
                i++
                if (jsonData.hasOwnProperty(key)) {
                    var element = jsonData[key];
                    //    console.log(element)//element是获得每一个导航栏的值li下每一页的
                    var strA = "<a href='#'  index=" + i + " id=" + element.id + ">" + element.name + "</a>"

                    var li = $("<li class ='morePage this_li clearfix lis_" + i + "'>" + strA + "</li>")
                    $('.header .tabnav ul').append(li)
                    var subCateGroupList = element.subCateGroupList
                    var listDiv = $('<div class="list_items clearfix"><div>')

                    for (var valKey in subCateGroupList) { //val是每一页中的一列
                        if (subCateGroupList.hasOwnProperty(valKey)) {
                            var values = subCateGroupList[valKey];
                            var categoryList = values.categoryList
                            var strAll = "<dt>" + values.name + "</dt>"
                            for (var sampleKey in categoryList) { //sample是每一列的每一各商品
                                if (categoryList.hasOwnProperty(sampleKey)) {
                                    var samples = categoryList[sampleKey];
                                    //    console.log(samples)
                                    var str = "<dd id='" + samples.id + "'><a href='#'><img src='" + samples.bannerUrl + "'title = '" + samples.frontName + "'><span >" + samples.name + "</a></dd>"
                                    strAll += str
                                }
                            }
                            var dl = $("<dl class='list_items_dl'>" + strAll + "</dl>")

                            $(listDiv).append(dl)
                        }
                    }
                    $(li).append(listDiv)


                }
            }
            var lastLis = $("<li class ='morePage  lis_yx'> <a href='#'  class='liA liA_last'>为你严选</a></li><li class ='morePage clearfix lis_zc'> <a href='#'  class='liA liA_last'>众筹</a></li>")
            $('.main_nav .main_nav_ul').append(lastLis)
        }
    });
}()