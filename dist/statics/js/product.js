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
    var vueSearch;
    vueSearch = new Vue({
        el: ".main",
        data: {
            expand: false,
            searchList: [],
            searchValue_: "",
            searchValue_pre: "",
            noResult_: "",
            noInit: true,
            styles: {
                completeTop: 0
            },
            product: {
                list: null,
                detail: null,
                compare: null
            },
            //  静态数据
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
                },
                compare: {
                    "3888280": {
                        value: "3399",
                        detail: {
                            "国美互联网": "3399",
                            "苏宁易购": "3400",
                            "苏宁电器": "3399",
                            "京东商城": "3398",
                            "天猫旗舰店": "3399"
                        }
                    },
                    "3749093": {
                        value: "5299",
                        detail: {
                            "国美在线": "5299",
                            "京东商城": "5298",
                            "苏宁易购": "5300",
                            "华为官网": "5299",
                            "天猫旗舰店": "5299"
                        }
                    }
                }
            }
        },
        computed: {
            searchValue: {
                get: function(){return this.searchValue_},
                set: function(v){
                    this.searchValue_ = v;
                    this.expand = true;
                    this.styles.completeTop = $(".search-group").offset().top + $(".search-group").outerHeight() + "px";this.styles.completeTop = $(".search-group").offset().top + $(".search-group").outerHeight() + "px";
                    this.searchList = this.getHisData(v);
                }
            },
            noResult: {
                get: function () {return this.noResult_},
                set: function (v) {
                    this.noResult_ = v;
                    if(v)this.styles.completeTop = $(".search-group").offset().top + $(".search-group").outerHeight() + "px";
                }
            }
        },
        methods: {
            getHisData: function(v){
                var fromDetail = this.fromData.detail, arr = [];
                if(v){
                    for(var k in fromDetail){
                        if(k.indexOf($.trim(v)) == 0){
                            arr.push(k);
                        }
                    }
                }
                return arr;
            },
            getUserData: function(item){
                var list = this.fromData.list[item], detail = this.fromData.detail[item], compare = this.fromData.compare[item];
                if(!list || !detail || !compare)return null;
                return {list: list, detail: detail, compare: compare};
            },
            useItem: function (item) {
                item = $.trim(item);
                this.noInit = false;
                this.searchValue_ = this.searchValue_pre = item;
                this.expand = false;

                if(!item){
                    this.noInit = true;
                    this.noResult = false;
                    this.product.list = null;
                    this.product.detail = null;
                    this.product.compare = null;
                }else{
                    var result = this.getUserData(this.searchValue);
                    if(result){
                        this.noResult = false;
                        this.product.list = result.list;
                        this.product.detail = result.detail;
                        this.product.compare = result.compare;
                    }else{
                        this.noResult = true;
                        this.product.list = null;
                        this.product.detail = null;
                        this.product.compare = null;
                    }
                }
            },
            open: function () {
                this.expand = true;
                this.searchList = this.getHisData(this.searchValue);
            },
            enter: function(){
                this.useItem(this.searchValue);
            },
            cancel: function(){ 
                this.searchValue = this.searchValue_pre;
                this.expand = false;
            },
            clear: function(){
                this.searchValue = "";
            }
        }
    });
}());