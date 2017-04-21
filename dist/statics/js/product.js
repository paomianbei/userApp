/**
 * Created by weikaiwei on 2017/4/19.
 */
(function(){
    var vm = new Vue({
        el: "#main-user",
        data: {
            productInfo: [
                {"商品编号": "3562123"},
                {"品牌": "苹果（apple）"},
                {"型号": "iphone7"},
                {"上市年份": "2016"},
                {"机身长度（mm）": "138.3"},
                {"机身宽度（mm）": "67.1"},
                {"机身厚度（mm）": "7.1"},
                {"机身重量（g）": "138"},
                {"机身材质分类": "其他"},
                {"操作系统": "ios"},
                {"CPU品牌": "以官网为准"}
            ]
        }
    });
    $(".content-text").text("商品");
    $(".table-list li:eq(0)").addClass("active");
}());