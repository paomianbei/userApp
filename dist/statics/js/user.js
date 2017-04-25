/**
 * Created by weikaiwei on 2017/4/19.
 */
(function(){
    $(".table-list li:eq(0)").addClass("active");

    var vm, vueSearch;
    function init(){
        vm = new Vue({
            el: ".user-list",
            data: {
                userData: {
                    "省份": "b",
                    "城市": "d",
                    "小区": "f",
                    "是否注册": "是",
                    "注册日期": "2015/7/1",
                    "注册距今天": "12天",
                    "用户评论次数": 12,
                    "用户评分等级": "level-1",
                    "会员生命周期": "活跃",
                    "会员等级": "G5"
                }
            },
            mounted: function(){
            }
        });
    }
    vueSearch = new Vue({
        el: ".search-group",
        data: {
            expand: false,
            searchList: [],
            userPhoneNumber: "",
            searchValue: ""
        },
        methods: {
            filter: function(e){
                this.expand = true;
                var fromList = ["13266350113", "13501227269", "13501271392", "13501392088", "13520533099", "13520957722", "13521927171", "13521967388", "13521975975", "13755607956", "13982193031"];
                var v = e.target.value;                
                this.searchList = fromList.filter(function(item){
                    return v && item.indexOf($.trim(v)) == 0 || false;
                }); 
            },
            useItem: function(item){
                this.searchValue = this.userPhoneNumber = item;
                this.expand = false;
                init();
            }
        }
    });
}());