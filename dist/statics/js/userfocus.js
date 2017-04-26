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
            searchValue: "",
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
                    "13501227269": [
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
                    ]
                },
                his: {
                    "13266350113": [
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
                    ],
                    "13501227269": [
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
                this.noInit = false;
                this.searchValue = item;
                this.searchValue_pre = this.searchValue;
                this.expand = false;

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

                vueFooter.exportData = {userPhoneNumber: item}
            },
            input: function(e){
                var v = e.target.value;
                this.searchValue_ = v;
                this.styles.completeTop = $(".search-group").offset().top + $(".search-group").outerHeight() + "px";
                this.expand = true;
                this.searchList = this.getHisData(v);
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
            }
        }
    });
    // 用户关注页面跳转到画像查询的会员，把会员手机号码带过去
    if(queryData.userPhoneNumber){
        vueSearch.useItem(queryData.userPhoneNumber);
        vueFooter.exportData = queryData;
    }
}());