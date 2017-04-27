/**
 * Created by weikaiwei on 2017/4/21.
 */
(function(){
    $(".table-list li:eq(1)").addClass("active"); 

    /**
 * Created by weikaiwei on 2017/4/25.
 */

var queryData = (function(){
    var obj = {}, s = location.search,
        arr = s.substring(s.indexOf("?") + 1).split("&");
    arr.forEach(function(item){
        var arr = item.split("=");
        obj[arr[0] && arr[0].trim()] = arr[1] && arr[1].trim();
    });
    return obj;
}());
var vueFooter = new Vue({
    el: "footer",
    data: {
        queryString: ""
    },
    computed: {
        exportData: {
            set: function(v){
                this.queryString = this.getQueryString(v);
            }
        }
    },
    methods: {
        getQueryString: function(exportData){
            var arr = [];
            try{
                for(var i in exportData){
                    arr.push(i + "=" + exportData[i]);
                } 
            }catch (e){}
            return arr.join("&");
        }
    },
    created: function(){
        this.queryString = queryData.userPhoneNumber || "";
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
            noResult: "",
            noInit: true,
            styles: {
                completeTop: 0
            },

            product: {
                list: null,
                his: null
            },
            //  静态数据
            fromData: {
                list: {
                    "13266350113": [
                        {
                            img: "iphone.png",
                            "商品名称": "Apple iPhone 7 32G 金色 移动联通电信4G手机",
                            "商品编号": "100416237",
                            "库存": "9999台",
                            "最近一次关注": "2017/03/16"
                        },
                        {
                            img: "tv.jpg",
                            "商品名称": "海信彩电LED55EC520UA 55英寸 VIDAA3 14核 炫彩4K智能电视",
                            "商品编号": "100384099",
                            "库存": "1453台",
                            "最近一次关注": "2016/9/30"
                        },
                        {
                            img: "camera.jpg",
                            "商品名称": "佳能相机EOSM3双镜头EFM18-55ISSTM/EF-M55-200STM黑",
                            "商品编号": "100382094",
                            "库存": "9654台",
                            "最近一次关注": "2016/7/28"
                        }
                    ],
                    "13501227269": [
                        {
                            img: "haier.jpg",
                            "商品名称": "海尔（Haier）XQG80-HB14636 8公斤变频滚筒洗衣机",
                            "商品编号": "8008295813",
                            "库存": "12347台",
                            "最近一次关注": "2017/4/20"
                        },
                        {
                            img: "ao.jpg",
                            "商品名称": "A.O.史密斯电热水器F150 内胆清洁节能系列 金圭内胆双棒速热 50升",
                            "商品编号": "8009544162",
                            "库存": "25774",
                            "最近一次关注": "2017/1/30"
                        },
                        {
                            img: "robam.jpg",
                            "商品名称": "老板（Robam）8307+33B7烟灶套餐",
                            "商品编号": "1000126763",
                            "库存": "8763台",
                            "最近一次关注": "2016/12/17"
                        }
                    ]
                },
                his: {
                    "13266350113": [
                        {
                            img: "iphone.png",
                            "商品名称": "Apple iPhone 7 32G 金色 移动联通电信4G手机",
                            "商品编号": "100416237",
                            "库存": "9999台",
                            "最近一次关注": "2017/03/16"
                        },
                        {
                            img: "tv.jpg",
                            "商品名称": "海信彩电LED55EC520UA 55英寸 VIDAA3 14核 炫彩4K智能电视",
                            "商品编号": "100384099",
                            "库存": "1453台",
                            "最近一次关注": "2016/9/30"
                        }
                    ],
                    "13501227269": [
                        {
                            img: "ao.jpg",
                            "商品名称": "A.O.史密斯电热水器F150 内胆清洁节能系列 金圭内胆双棒速热 50升",
                            "商品编号": "8009544162",
                            "库存": "25774",
                            "最近一次关注": "2017/1/30"
                        },
                        {
                            img: "robam.jpg",
                            "商品名称": "老板（Robam）8307+33B7烟灶套餐",
                            "商品编号": "1000126763",
                            "库存": "8763台",
                            "最近一次关注": "2016/12/17"
                        }
                    ]
                }
            }
        },
        computed: {
            searchValue: {
                get: function(){return this.searchValue_},
                set: function(v){
                    this.searchValue_ = v;
                    this.styles.completeTop = $(".search-group").offset().top + $(".search-group").outerHeight() + "px";
                    this.expand = true;
                    this.searchList = this.getHisData(v);
                }
            }
        },
        methods: {
            getHisData: function(v){
                var fromList = this.fromData.list,
                    arr = [];
                if(v){
                    for(var k in fromList){
                        if(k.indexOf($.trim(v)) == 0){
                            arr.push(k);
                        }
                    }
                }
                return arr;
            },
            getUserData: function(item){
                var list = this.fromData.list[item], detail = this.fromData.his[item];
                if(!list || !detail)return null;
                return {list: list, his: detail};
            },
            useItem: function(item){
                item = $.trim(item);
                this.noInit = false;
                this.searchValue = item;
                this.searchValue_pre = this.searchValue;
                this.expand = false;

                if(!item){
                    this.noInit = true;
                    this.noResult = false;
                    this.product.list = null;
                    this.product.his = null;
                }else{
                    var result = this.getUserData(this.searchValue);
                    if(result){
                        this.noResult = false;
                        this.product.list = result.list;
                        this.product.his = result.his;
                    }else{
                        this.noResult = true;
                        this.product.list = null;
                        this.product.his = null;
                    }
                }

                vueFooter.exportData = {userPhoneNumber: item}
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
    // 用户关注页面跳转到画像查询的会员，把会员手机号码带过去
    if(queryData.userPhoneNumber){
        vueSearch.useItem(queryData.userPhoneNumber);
        vueFooter.exportData = queryData;
    }
}());