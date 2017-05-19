/**用户关注
 * Created by weikaiwei on 2017/4/21.
 */
(function(){
    $(".table-list li:eq(1)").addClass("active"); 
    @@include("src/page/parts/!bindValue.js")
    var ajax = axios.create({
        baseURL: serverData.contextPath + "/"
    }), DataWraper, vueSearch;
    /**数据包装对象*/
    DataWraper = (function(){
        var Wrapper;
        // 用户关注
        function obj_0(data){
            this.img = null;
            this.list = [];
            this.wrap(data);
        }
        // 历史购买
        function obj_1(data){
            this.img = null;
            this.list = [];
            this.wrap(data);
        }
        obj_0.prototype.fields = [
            ["sku_name", "商品名称"],
            ["sku_id", "商品id"],
            ["bhv_type", "行为类型"],
            ["time", "操作时间"]
        ];
        obj_0.prototype.wrap = obj_1.prototype.wrap = function(data){
            var img, list = [];
            if(data){
                // 商品图片信息
                img = data.url;
                this.fields.forEach(function(item){
                    list.push([item[1], data[item[0]]]);
                });
            }
            this.img = img;
            this.list = list;
            return this;
        };
        obj_1.prototype.fields = [
            ["product_id", "产品id"],
            ["sku_name", "商品名称"],
            ["sku_id", "商品id"],
            ["time", "购买时间"]
        ];
        Wrapper = [obj_0, obj_1];
        return function(index, data){
            if(data){
                data = data instanceof Array ? data : [data];
                return data.map(function(item){return new Wrapper[index](item)});
            }else{
                return null;
            }
        };
    }());
    vueSearch = new Vue({
        el: ".main",
        data: {
            expand: false,
            searchList: [],
            searchValue_: "",
            searchValue_pre: "",
            noInit: true,
            activeIndex: 0,
            styles: {
                completeTop: 0
            },
            product: {
                // 每个标签的数据查询过后（不论结果是否有数据），状态置为1
                state: [],
                data: []
            },
            //  静态数据
            fromData: {
                list: {
                    "13266350113": [
                        {
                            url: "iphone.png",
                            "商品名称": "Apple iPhone 7 32G 金色 移动联通电信4G手机",
                            "商品编号": "100416237",
                            "库存": "9999台",
                            "最近一次关注": "2017/03/16"
                        },
                        {
                            url: "tv.jpg",
                            "商品名称": "海信彩电LED55EC520UA 55英寸 VIDAA3 14核 炫彩4K智能电视",
                            "商品编号": "100384099",
                            "库存": "1453台",
                            "最近一次关注": "2016/9/30"
                        },
                        {
                            url: "camera.jpg",
                            "商品名称": "佳能相机EOSM3双镜头EFM18-55ISSTM/EF-M55-200STM黑",
                            "商品编号": "100382094",
                            "库存": "9654台",
                            "最近一次关注": "2016/7/28"
                        }
                    ],
                    "13501227269": [
                        {
                            url: "haier.jpg",
                            "商品名称": "海尔（Haier）XQG80-HB14636 8公斤变频滚筒洗衣机",
                            "商品编号": "8008295813",
                            "库存": "12347台",
                            "最近一次关注": "2017/4/20"
                        },
                        {
                            url: "ao.jpg",
                            "商品名称": "A.O.史密斯电热水器F150 内胆清洁节能系列 金圭内胆双棒速热 50升",
                            "商品编号": "8009544162",
                            "库存": "25774",
                            "最近一次关注": "2017/1/30"
                        },
                        {
                            url: "robam.jpg",
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
                            url: "iphone.png",
                            "商品名称": "Apple iPhone 7 32G 金色 移动联通电信4G手机",
                            "商品编号": "100416237",
                            "库存": "9999台",
                            "最近一次关注": "2017/03/16"
                        },
                        {
                            url: "tv.jpg",
                            "商品名称": "海信彩电LED55EC520UA 55英寸 VIDAA3 14核 炫彩4K智能电视",
                            "商品编号": "100384099",
                            "库存": "1453台",
                            "最近一次关注": "2016/9/30"
                        }
                    ],
                    "13501227269": [
                        {
                            url: "ao.jpg",
                            "商品名称": "A.O.史密斯电热水器F150 内胆清洁节能系列 金圭内胆双棒速热 50升",
                            "商品编号": "8009544162",
                            "库存": "25774",
                            "最近一次关注": "2017/1/30"
                        },
                        {
                            url: "robam.jpg",
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
                    this.expand = true;
                    this.styles.completeTop = $(".search-group").offset().top + $(".search-group").outerHeight() + "px";this.styles.completeTop = $(".search-group").offset().top + $(".search-group").outerHeight() + "px";
                    this.getHisData(v);
                }
            }
        },
        // watch: {
        //     "product.result": function(){
        //         console.log("111")
        //     }
        // },
        methods: {
            activeTab: function(index){
                this.activeIndex = index || 0;
                // 切换选项卡的时候尝试着去加载对应的内容区域数据
                this.getUserData(this.searchValue);
            },
            getHisData: function(v){return;
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
            getUserData: function(phone){
                var productData = this.product.data, index = this.activeIndex,
                    state = this.product.state;
                if(!state[index]){
                    // ajax.get("Member/memberAttention", {params: {phoneNumber: phone}}).then(function(){
                    // });
                    var result = {"memberAttention":{"bhv_type":12,"sku_id":34343432,"sku_name":"空调","time":"2017-03-21"},"code":0};
                    productData[index] = DataWraper(index, result.memberAttention);
                    state[index] = 1;
                }
            },
            useItem: function(item){
                item = $.trim(item);
                this.noInit = false; 
                this.searchValue_ = this.searchValue_pre = item;
                this.expand = false;
                if(!item){
                    this.noInit = true;
                }else{
                    // 查询新数据之前，清空旧数据和状态
                    this.product.state = [];
                    this.product.data = [];
                    this.getUserData(this.searchValue);
                }

                vueFooter.exportData = {userPhoneNumber: item}
            },
            // 点击搜索框，进入查询模式。并且，根据输入的内容自动补全一次
            open: function () {
                this.expand = true;
                this.getHisData(this.searchValue);
            },
            // 搜索事件
            enter: function(){
                this.useItem(this.searchValue);
            },
            // 取消事件
            cancel: function(){
                this.searchValue = this.searchValue_pre;
                this.expand = false;
            },
            // 清除事件
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