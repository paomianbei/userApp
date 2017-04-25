/**
 * Created by weikaiwei on 2017/4/20.
 */
(function(){
    var vm = new Vue({
        el: "#main-user",
        data: {
            product: {
                list: [
                    {
                        img: "iphone.png",
                        "商品名称": "Apple手机IPhone7",
                        "商品编号": "1234557667574",
                        "商品品类": "手机",
                        "商品品牌": "苹果（apple）",
                        "门店库存": "168台",
                        "分部库存": "1342台",
                        "最近一次关注": "1天内"
                    }
                ]
            },
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
                {"输入方式": "触控"},
                {"CPU品牌": "以官网信息为准"},
                {"CPU型号": "以官网信息为准"},
                {"CPU频率": "以官网信息为准"},
                {"CPU核数": "其他"}
            ]
        },
        mounted: function(){
        }
    });
    $(".content-text").text("商品");
    $(".table-list li:eq(0)").addClass("active");
}());