/**
 * Created by weikaiwei on 2017/4/21.
 */
(function(){
    $(".content-text").text("商品");
    $(".table-list li:eq(1)").addClass("active"); 

    @@include("src/page/parts/!bindValue.js")
    var vm, vueSearch;
    function init() {
        vm = new Vue({
            el: ".tab-content",
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
            },
            mounted: function () {
            }
        });
    }
    vueSearch = new Vue({
        el: ".search-group",
        data: {
            expand: false,
            searchList: [],
            searchValue: ""
        },
        methods: {
            filter: function(e){
                this.expand = true;
                var fromList = ["13266350113", "13501227269", "13501271392", "13501392088", "13520533099", "13520957722", "13521927171", "13521967388", "13521975975", "13755607956", "13982193031"];
                var v = e.target.value;
                this.searchList = fromList.filter(function(item){
                    return v && item.indexOf($.trim(v)) == 0 || false;
                });
            },
            useItem: function(item){
                this.searchValue = item;
                this.expand = false;
                init();
                vueFooter.exportData = {userPhoneNumber: item}
            }
        }
    });
    // 用户关注页面跳转到画像查询的会员，把会员手机号码带过去
    if(queryData.userPhoneNumber){
        init();
        vueSearch.searchValue = queryData.userPhoneNumber;
        vueFooter.exportData = queryData;
    }
}());