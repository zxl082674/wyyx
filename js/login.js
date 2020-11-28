$(function() {
    window.addEventListener('scroll', function() {
        var sTop = $('body,html').scrollTop(); // 目前监听的是整个body的滚动条距离
        if (sTop > 556) {
            $('.fixright').css({ 'position': 'fixed', 'top': '50px', 'right': '0px' })
            $('.fixright').css({ 'position': 'absolute', 'top': '210px', 'right': '0' })
        }
    })

    var user = $('.user')
    var pass = $('.password')
    var sign = $('.loginBtn')
    var register = $('.addBtn')

    register.click(function() {
        var us = user.val();
        var ps = pass.val();
        if (!us || !ps) {
            console.log(us)
            console.log(ps)
            alert('账号或密码不能为空')
            return;
        } else {
            localStorage.setItem({
                'user': JSON.stringify(us),
                'pass': JSON.stringify(ps)
            })
            alert('注册成功，请重新登录')
            $('.user').val() = ''
            $('.password').val() = ''
        }
    })











})