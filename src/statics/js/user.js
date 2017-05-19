/**会员页面
 * Created by weikaiwei on 2017/4/19.
 */
(function(){
    $(".table-list li:eq(0)").addClass("active");
    @@include("src/page/parts/!bindValue.js")
    var ajax = axios.create({
        baseURL: serverData.contextPath + "/"
    }), vueSearch;
    //输入检索
    vueSearch = new Vue({
        el: ".main",
        data: {
            expand: false,
            searchList: [], 
            searchValue_: "",
            searchValue_pre: "",
            userData: "",
            noResult_: "",
            noInit: true,
            styles: {
                completeTop: 0
            },
            //  静态数据
            fromData: {
                "13266350113": [
                    {
                        title: "身份信息",
                        detail: {
                            "年龄": "25-35",
                            "性别":"男性",
                            "省份": "广东",
                            "城市": "广州",
                            "小区": "",
                            "是否有邮箱": "是",
                            "是否内部员工": "否",
                            "操作系统": "IOS"
                        }
                    },
                    {
                        title: "注册信息",
                        detail: {
                            "是否注册": "是",
                            "注册日期": "2015/7/1",
                            "注册距今天": "666天"
                        }
                    },
                    {
                        title: "偏好标签",
                        detail: {
                            "品类偏好": "手机/电视/数码相机",
                            "品牌偏好":"苹果/佳能/海信",
                            "产品词偏好":"手机/智能电视/单反",
                            "时段偏好": "9:00  0.5",
                            "站点偏好": "PC/WAP/APP"
                        }
                    }
                ],
                "13501227269": [
                    {
                        title: "身份信息",
                        detail: {
                            "年龄": "25-35",
                            "性别":"男性",
                            "省份": "北京",
                            "城市": "北京",
                            "小区": "西坝河西里小区",
                            "是否有邮箱": "是",
                            "是否内部员工": "否",
                            "操作系统": "Android"
                        }
                    },
                    {
                        title: "注册信息",
                        detail: {
                            "是否注册": "是",
                            "注册日期": "2017/4/24",
                            "注册距今天": "3天"
                        }
                    },
                    {
                        title: "偏好标签",
                        detail: {
                            "品类偏好": "洗衣机/热水器/烟灶",
                            "品牌偏好":"海尔/a.o史密斯/老板",
                            "产品词偏好":"滚筒洗衣机/节能热水器/灶台套装",
                            "时段偏好": "15:30  0.5",
                            "站点偏好": "APP"
                        }
                    }
                ]
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
                return;
                var vue = this, fromList = this.fromData,
                    arr = [];
                if(v){
                    for(var k in fromList){
                        if(k.indexOf($.trim(v)) == 0){
                            arr.push(k);
                        }
                    }
                }
                vue.searchList = arr;
            },
            getUserData: function(phone){
                ajax.get("Member/memberInfo", {params: {phoneNomber: phone}}).then(function(data){
                    var result = data.detailInfo || [];
                    this.noResult = !result || result.length == 0;
                    this.userData = result;
                });
            },
            useItem: function(item){
                item = $.trim(item);
                this.noInit = false;
                this.searchValue_ = this.searchValue_pre = item;
                this.expand = false;

                if(!item){
                    this.noInit = true;
                    this.noResult = "";
                    this.userData = null;
                }else{
                    this.getUserData(this.searchValue);
                }
                vueFooter.exportData = {userPhoneNumber: item};
            },
            open: function () {
                this.expand = true;
                this.getHisData(this.searchValue);
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
    // 画像查询的会员页面跳转到用户关注，把会员手机号码带过去
    if(queryData.userPhoneNumber){
        vueSearch.useItem(queryData.userPhoneNumber);
        vueFooter.exportData = queryData;
    }
}());