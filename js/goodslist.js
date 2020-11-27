var mySwiper = new Swiper('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    direction: 'horizontal', // 水平切换选项
    loop: true, // 循环模式选项

    // autoplay:true,
    autoplay: {
        delay: 4000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },

    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // 如果需要滚动条
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
})

//选项卡
$('.main .allgoods .allHeader .change1').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
    $('.main .allgoods .show1').css({ 'display': 'grid' }).next().css({ 'display': 'none' });
    // $('.main .allgoods .show2').css({ 'display': 'none' })

})
$('.main .allgoods .allHeader .change2').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
    $('.main .allgoods .show1').css('display', 'none')
        // console.log($('.main .allgoods .show1').css);
    $('.main .allgoods .show2').css({ 'display': 'grid' })
})

//渲染
$(function() {

    // 获取商品列表数据
    $.ajax({
        url: '../data/goodslist.json',
        type: 'get',
        dataType: 'json',
        success: function(json) {
            // console.log(json)
            var goodsStr = ''
            $.each(json, function(index, item) {
                //         goodsStr += `<div class="goods">
                //     <img src="${item.imgurl}" alt="">
                //     <p>${item.price}</p>
                //     <h3>${item.title}</h3>
                //     <div code="${item.code}">加入购物车</div>
                //   </div>`
            })
            $('.pgright div').html(goodsStr)
        }
    })

    // 点击加入购物车
    $('.pgright div').on('click', '.commonBottom', function() {
        // 获取当前点击商品的编号
        var code = $(this).attr('code')

        // localStorage  key = value
        //  goods = [{code:'abc1',num:1},{code:'abc2',num:2}]
        // 判断本地存储是否有数据
        if (localStorage.getItem('goods')) {
            var goodsArr = JSON.parse(localStorage.getItem('goods'))
        } else {
            var goodsArr = []
        }

        var hasGoods = false

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

})