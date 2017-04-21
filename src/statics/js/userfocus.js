/**
 * Created by weikaiwei on 2017/4/21.
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
                        "库存": "3142台",
                        "最近一次关注": "2017/03/16"
                    },
                    {
                        img: "iphone.png",
                        "商品名称": "Apple手机IPhone7",
                        "商品编号": "1234557667574",
                        "库存": "2710台",
                        "最近一次关注": "2017/03/29"
                    },
                    {
                        img: "iphone.png",
                        "商品名称": "Apple手机IPhone7",
                        "商品编号": "1234557667574",
                        "库存": "2000",
                        "最近一次关注": "2017/04/17"
                    }
                ],
                his: [
                    {
                        img: "iphone.png",
                        "商品名称": "Apple手机IPhone7",
                        "商品编号": "1234557667574",
                        "库存": "3000台",
                        "最近一次购买": "2017/01/15"
                    },
                    {
                        img: "iphone.png",
                        "商品名称": "Apple手机IPhone7",
                        "商品编号": "1234557667574",
                        "库存": "2397台",
                        "最近一次购买": "2017/04/22"
                    }
                ]
            }
        }
    });
    $(".content-text").text("商品");
    $(".table-list li:eq(1)").addClass("active");
}());