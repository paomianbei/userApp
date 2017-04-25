/**
 * Created by weikaiwei on 2017/4/20.
 */
(function(){
    $(".table-list li:eq(0)").addClass("active");

    var vueFooter = new Vue({
        el: "footer",
        data: {
            queryString: ""
        }
    });
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
            }
        }
    });
}());