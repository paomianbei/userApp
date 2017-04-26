/**
 * Created by weikaiwei on 2017/4/19.
 */
(function(){
    $(".table-list li:eq(0)").addClass("active");

    @@include("src/page/parts/!bindValue.js")
    var vm, vueSearch;
    function init(){
        vm = vm || new Vue({
            el: ".user-list",
            data: {
                userData: {}
            }
        });
        return vm;
    }
    //输入检索
    vueSearch = new Vue({
        el: ".autocomplete-group",
        data: {
            expand: false,
            searchList: [], 
            searchValue_: "",
            userData: "",
            fromData: {
                "13266350113": [
                    {
                        title: "身份信息",
                        detail: {
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
                            "城市": "2015/7/1",
                            "注册距今天": "12天"
                        }
                    },
                    {
                        title: "注册信息",
                        detail: {
                            "是否注册": "是",
                            "城市": "2015/7/1",
                            "注册距今天": "12天"
                        }
                    }
                ],
                "13501227269": [
                    {
                        title: "身份信息",
                        detail: {
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
                            "城市": "2017/4/24",
                            "注册距今天": "1天"
                        }
                    },
                    {
                        title: "偏好标签",
                        detail: {
                            "时段偏好": "15:30  0.5",
                            "站点偏好": "APP"
                        }
                    }
                ]
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
                    var fromList = this.fromData, arr = [];
                    if(v){
                        for(var k in fromList){
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
            },
            hasData: function(){
                return !!this.userData;
            }
        },
        methods: {
            useItem: function(item){
                this.searchValue = item;
                this.expand = false;
                vueFooter.exportData = {userPhoneNumber: item};
                var vm = init();
                vm.userData = this.userData = this.fromData[item];
            },
            cancel: function(){
                this.searchValue = "";
                this.expand = false;
            }
        }
    });
    // 画像查询的会员页面跳转到用户关注，把会员手机号码带过去
    if(queryData.userPhoneNumber){
        init();
        vueSearch.useItem(queryData.userPhoneNumber);
        vueFooter.exportData = queryData;
    }
}());