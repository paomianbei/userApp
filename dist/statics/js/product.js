/**
 * Created by weikaiwei on 2017/4/20.
 */
(function () {
    $(".table-list li:eq(0)").addClass("active");

    var vueFooter = new Vue({
        el: "footer",
        data: {
            queryString: ""
        }
    });
    var vm, vueSearch;

    function init() {
        vm = vm || new Vue({
            el: ".tab-content",
            data: {
                product: {
                    list: {},
                    detail: {}
                }
            }
        });
        return vm;
    }

    vueSearch = new Vue({
        el: ".autocomplete-group",
        data: {
            expand: false,
            searchList: [],
            searchValue_: "",
            fromData: {
                list: {
                    "3888280": {
                        img: "item1.jpg",
                        "商品编号": "3888280",
                        "商品名称": "华为 HUAWEI Mate 9 4GB+32GB 全网通版 苍穹灰",
                        "库存": "1321",
                        "价格": "3399",
                        "品类": "手机",
                        "品牌": "华为"
                    },
                    "3749093": {
                        img: "item2.jpg",
                        "商品编号": "3749093",
                        "商品名称": "华为 Mate 9 Pro 6GB+128GB版 琥珀金 移动联通电信4G手机 双卡双待",
                        "库存": "9999",
                        "价格": "5299",
                        "品类": "手机",
                        "品牌": "华为"
                    }
                },
                detail: {
                    "3888280": [
                        {
                            title: "主体",
                            detail:{
                                "品牌": "华为（HUAWEI）",
                                "型号": "MHA-AL00",
                                "颜色": "苍穹灰",
                                "上市时间": "2016年11月",
                                "上市月份": "11月"
                            }
                        },
                        {
                            title: "基本信息",
                            detail:{
                                "机身尺寸": "156.9 x 78.9 x 7.9",
                                "机身重量": "190g",
                                "输入方式": "触控",
                                "运营商标志或内容": "无"
                            }
                        }
                    ],
                    "3749093": [
                        {
                            title: "主体",
                            detail:{
                                "品牌": "华为（HUAWEI）",
                                "型号": "LON-AL00",
                                "颜色": "琥珀金"
                            }
                        },
                        {
                            title: "基本信息",
                            detail:{
                                "机身尺寸": "152.0mm×75.0mm×7.5mm（备注：受产品配置和制造工艺影响，实际机身尺寸或有差异，请以实物为准）",
                                "机身重量": "169g（含电池）（备注：受产品配置和制造工艺影响，实际机身重量或有差异，请以实物为准）",
                                "输入方式": "触控"
                            }
                        }
                    ]
                }
            },
            styles: {
                completeTop: 0
            }
        },
        computed: {
            searchValue: {
                get: function(){
                    return this.searchValue_;
                },
                set: function(v){
                    this.searchValue_ = v;
                    this.styles.completeTop = $(".search-group").offset().top + $(".search-group").outerHeight() + "px";
                    this.expand = true;
                    var fromDetail = this.fromData.detail, arr = [];
                    if(v){
                        for(var k in fromDetail){
                            if(k.indexOf($.trim(v)) == 0){
                                arr.push(k);
                            }
                        }
                    }
                    this.searchList = arr;
                }
            },
            nodata: function(){
                return this.searchValue && this.searchList && !this.searchList.length;
            }
        },
        methods: {
            useItem: function (item) {
                this.searchValue = item;
                this.expand = false;
                var fromList = this.fromData.list, fromDetail = this.fromData.detail;
                var vm = init();
                vm.product.list = fromList[item];
                vm.product.detail = fromDetail[item];
            },
            cancel: function(){
                this.searchValue = "";
                this.expand = false;
            }
        }
    });
}());