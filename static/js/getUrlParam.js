/**
 * 依赖于Zepto
 *
 * 示例： var oToken = $.getUrlParam('token');  alert(oToken)；
 *
 */
(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(Zepto);
