/**
 * Created by weikaiwei on 2017/4/27.
 */
(function(){
    $(".table-list li:eq(2)").addClass("active");

    @@include("src/page/parts/!bindValue.js")
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
                list: null
            },
            //  静态数据
            fromData: {
                list: {
                    "13266350113": [
                        {
                            img: "camera.jpg",
                            "商品名称": "佳能相机EOSM3双镜头EFM18-55ISSTM/EF-M55-200STM黑",
                            "商品编号": "100382094",
                            "库存": "9654台",
                            "价格": "4699元"
                        },
                        {
                            img: "sony_camera.png",
                            "商品名称": "索尼（SONY） RX100M3 黑卡数码照相机RX100III/rx100m3 黑卡三代(官方标配（无卡包）)",
                            "商品编号": "8003806917",
                            "库存": "3243台",
                            "价格": "4238元"
                        }
                    ],
                    "13501227269": [
                        {
                            img: "haier.jpg",
                            "商品名称": "海尔（Haier）XQG80-HB14636 8公斤变频滚筒洗衣机",
                            "商品编号": "8008295813",
                            "库存": "12347台",
                            "价格": "3699元"
                        },
                        {
                            img: "SIEMENS_washing.png",
                            "商品名称": "西门子(SIEMENS) XQG80-WM12P2688W 8kg 滚筒洗衣机（银色）",
                            "商品编号": "100418863",
                            "库存": "2543台",
                            "价格": "3399元"
                        }, 
                        {
                            img: "panasonic_washing.png",
                            "商品名称": "松下(Panasonic) XQG80-E8225 8公斤 变频全自动滚筒洗衣机（银色） 6项精准智控 高效变频电机",
                            "商品编号": "100416075",
                            "库存": "4512台",
                            "价格": "3498元"
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
                var list = this.fromData.list[item];
                return {list: list};
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
                    this.product = {};
                }else{
                    var result = this.getUserData(this.searchValue);
                    if(result){
                        this.noResult = false;
                        this.product.list = result.list;
                    }else{
                        this.noResult = true;
                        this.product = {};
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