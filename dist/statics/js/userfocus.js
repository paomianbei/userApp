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
        el: ".autocomplete-group",
        data: {
            expand: false,
            searchList: [],
            searchValue_: "",
            styles: {
                completeTop: 0
            }
        },
        computed: {
            searchValue: {
                get: function(){
                    return this.searchValue_
                },
                set: function(v){
                    this.searchValue_ = v;
                    this.styles.completeTop = $(".search-group").offset().top + $(".search-group").outerHeight() + "px";
                    this.expand = true;
                    var fromList = ["13266350113", "13501227269"];
                    this.searchList = fromList.filter(function(item){
                        return v && item.indexOf($.trim(v)) == 0 || false;
                    });
                }
            },
            nodata: function(){
                return this.searchValue && this.searchList && !this.searchList.length;
            }
        },
        methods: {
            useItem: function(item){
                this.searchValue = item;
                this.expand = false;
                init();
                vueFooter.exportData = {userPhoneNumber: item}
            },
            cancel: function(){
                this.searchValue = "";
                this.expand = false;
            }
        }
    });
    // 用户关注页面跳转到画像查询的会员，把会员手机号码带过去
    if(queryData.userPhoneNumber){
        init();
        vueSearch.useItem(queryData.userPhoneNumber);
        vueFooter.exportData = queryData;
    }
}());