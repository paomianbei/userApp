/**
 * Created by weikaiwei on 2017/4/19.
 */
(function(){
    var vm = new Vue({
        el: "#main-user",
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
        }
    });
    $(".table-list li:eq(0)").addClass("active");
}());