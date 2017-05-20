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

    var ListData = (function(ajax){
        function request(params){
            var collection = this;
            return ajax.get(this.url, {params: params}).then(function(data){
                collection.setData(data.page);
            });
        }
        /**需要实现request方法，作为远程查数据的方法
         * */
        function ListData(o){
            this.clearData();
            if(o){
                for(var i in o){
                    this[i] = o[i];
                }
            }
        }
        ListData.prototype = {
            request: request,
            load: function(p, o){
                var params, i, dataCollection = this;
                dataCollection.state.data = 1;
                dataCollection.state.result = 1;
                if(o){
                    for(i in o){
                        this[i] = o[i];
                    }
                }
                params = {pageSize: this.pageSize, currPage: this.currPage < 1 ? i : this.currPage};
                if(p){
                    for(i in p){
                        params[i] = p[i];
                    }
                }
                return this.request(params).then(function(){
                    dataCollection.state.data = 2;
                }).catch(function(){
                    dataCollection.state.data = 3;
                });
            },
            /**刷新数据
             * */
            refresh: function(){
                this.currPage = 1;
                this.load();
            },
            /**加载下一页的数据
             * */
            nextPage: function(){
                if(this.totalPage >= this.currPage + 1){
                    this.currPage++;
                    this.load();
                }
            },
            setData: function(data){
                var fields = this.fields, list = [];
                if(data){
                    this.currPage = data.currPage;
                    this.totalCount = data.totalCount;
                    this.totalPage = data.totalPage;
                    list = data.list && data.list.map(function(item){
                            // 图片信息和商品信息分开到img字段和list字段中
                            var itemList = fields.map(function(field){
                                return [field[1], item[field[0]]];
                            });
                            return {img: item.url, list: itemList};
                        });
                }
                this.list = list;
                this.state.result = list && list.length;
            },
            /**把数据设置成初始状态
             * */
            clearData: function(){
                var defaults = {
                    state: {
                        data: 0, // 数据加载状态：0：未开始；1：加载中；2：加载成功；3：加载失败
                        result: 0 // 是否有数据。0：无数据；1：有数据
                    },
                    // ajax: null, // 请求数据需要提供一个axios对象   不重置
                    // url: null, // 不重置
                    list: [],
                    pageSize: 10,
                    currPage: 1,
                    totalCount: 0,
                    totalPage: 0
                }, i;
                for(i in defaults){
                    this[i] = defaults[i];
                }
            }
        };
        return ListData;
    }(ajax));
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
                data: [new ListData({
                    url: "Member/memberAttention",
                    fields: [
                        ["sku_name", "商品名称"],
                        ["sku_id", "商品id"],
                        ["bhv_type", "行为类型"],
                        ["time", "操作时间"]
                    ]
                }), new ListData({
                    url: "Member/historySku",
                    fields: [
                        ["product_id", "产品id"],
                        ["sku_name", "商品名称"],
                        ["sku_id", "商品id"],
                        ["submitted_date", "购买时间"]
                    ]
                })],
                reset: function(){
                    var dataCollection = this.data;
                    for(var i in dataCollection){
                        dataCollection[i] && dataCollection[i].clearData && dataCollection[i].clearData();
                    }
                },
                imgError: function(item){
                    item.img = null;
                }
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
                    dataCollection = productData[index];
                if(dataCollection.state.data != 2){
                    dataCollection.load({phoneNumber: phone});
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
                    this.product.reset();
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