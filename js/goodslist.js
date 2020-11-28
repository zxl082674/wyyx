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

// 获取商品列表数据
$.ajax({
    url: './../data/list.json',
    type: 'get',
    dataType: 'json',
    success: function(json) {
        // console.log(json)
        var goodsStr = ''
        $.each(json, function(index, item) {
            goodsStr += `<div class="pgright">
                        <div class="pgr">
                        <div><img src="${item.imgurl1}" alt=""></div>
                        <div class="commonBottom">
                            <span>${item.span1}</span>
                            <span>${item.span2}</span>
                            <span>${item.span3}</span>
                        </div>
                    </div>
                    <div class="pgr">
                        <div><img src="${item.imgurl2}" alt=""></div>
                        <div class="commonBottom">
                            <span>${item.span1}</span>
                            <span>${item.span2}</span>
                            <span>${item.span3}</span>
                        </div>
                    </div>
                </div>`
        })
        $('.pgoods').append(goodsStr)
    }
})
if (localStorage.getItem('goods')) {
    var goodsArr = JSON.parse(localStorage.getItem('goods'))
} else {
    var goodsArr = []
}

localStorage.setItem('goods', JSON.stringify(goodsArr))

$('.pgoods').on('click', '.pgright .pgr', function() {
    location.href = './gooddetails.html'
})