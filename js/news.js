$(function () {

    //给img标签添加 href属性 ，属性内容为大图地址
    $('.content>p>img').each(function (index, item) {
//                console.log(index);
//                console.log(item);
        var hrefUrl = item.src;
        var regexp = '-smail';
        hrefUrl = hrefUrl.replace(regexp, '');
//                http://news-web.oss-cn-beijing.aliyuncs.com/news-web/15/6/5b05e9687a7e4f4393c4ef0be0892871.png
//                console.log(hrefUrl);
        item.setAttribute('href', hrefUrl);
    })
//=============================================================================================================
    ;(function () {
        //获取 html 中的图片元素
        var aImg = document.querySelectorAll("img"),
            aImgSrc = [];
        //为图片绑定单击事件
        for (var i = 0, l = aImg.length; i < l; i++) {
            aImg[i].index = i;
            aImg[i].className += " conPic";
            aImgSrc.push(aImg[i].src);
        }
        for (var i = 0; i < $(".conPic").length; i++) {
            if ($(".conPic")[i].complete) {
                addTap($(".conPic")[i])
            } else {
                $(".conPic")[i].onload = function () {
                    addTap(this);
                }
            }
        }

        function addTap(obj) {
            $(obj).on("tap", function () {
                //调用ImageView
                ImageView($(obj)[0].index, aImgSrc);
            })
        }
    })();

});