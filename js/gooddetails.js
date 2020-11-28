$(function() {

    var mask = $('.main .detailHd .slide .minBox .mask')
    var minBox = $('.main .detailHd .slide .minBox div')
    var maxBox = $('.main .detailHd .maxBox')
    var maxImg = $('.main .detailHd .maxBox img')
    $('.main .detailHd .slide .tab li').each(function(index, item) {
        $(item).click(function() {
            $(this).addClass('active').siblings().removeClass('active')
            $('.main .detailHd .slide .minBox div').eq(index).addClass('show').siblings().removeClass('show')
        })
    })

    minBox.each(function(index, item) {
        $(item).mousemove(function(e) {
            var maskLeft = e.pageX - $(this).offset().left - mask.width() / 2;
            var maskTop = e.pageY - $(this).offset().top - mask.height() / 2;
            //限制mask的移动范围
            // console.log(maskLeft);
            if (maskLeft < 0) {
                maskLeft = 0;
            }
            if (maskLeft >= $(this).width() - mask.width()) {
                maskLeft = $(this).width() - mask.width();
            }
            if (maskTop < 0) {
                maskTop = 0;
            }
            if (maskTop >= $(this).height() - mask.height()) {
                maskTop = $(this).height() - mask.height();
            }
            // console.log(maskLeft);
            mask.css('left', maskLeft);
            mask.css('top', maskTop);
            var sccalX = -maskLeft / ($(this).width() - mask.width()) * maxBox.width();
            var sccalY = -maskTop / ($(this).height() - mask.height()) * maxBox.height();

            //大图也跟随运动
            maxImg.eq(index).css('left', sccalX)
            maxImg.eq(index).css('top', sccalY);

        })
        $(item).mouseenter(function() {
            mask.css('display', 'block')
            maxImg.eq(index).css('display', 'block')
        })
        $(item).mouseleave(function() {
            mask.css('display', 'none')
            maxImg.eq(index).css('display', 'none')
        })

    })

})


$.ajax({
    url: './../data/list.json',
    type: 'get',
    dataType: 'json',
    success: function(json) {}
})
$('.detailCt').click(function() {
    // 获取当前点击商品的编号
    var code = parseInt(Math.random() * 8 + 1)
        // console.log(code);
    var hasGoods = false
    if (localStorage.getItem('goods')) {
        var goodsArr = JSON.parse(localStorage.getItem('goods'))
    } else {
        var goodsArr = []
    }

    if (goodsArr.length > 0) {
        // 判断当前选中商品是否在购物车中
        $.each(goodsArr, function(index, item) {
            console.log(index)
            console.log(item)
            if (item.code === code) { // 商品存在购物车中，数量+1
                item.num++
                    hasGoods = true
                return false
            }
        })
    }

    // 如果购物车没有当前选中的商品，添加一条数据
    if (!hasGoods) {
        // var objStr = JSON.stringify({code:code,num:1})
        goodsArr.push({ code: code, num: 1 })
    }

    // 更新本地存储的数据
    localStorage.setItem('goods', JSON.stringify(goodsArr))

    alert('添加购物车成功')

})