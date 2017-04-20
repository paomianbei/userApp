/**
 * Created by weikaiwei on 2017/4/19.
 */
(function(){
    var vm = new Vue({
        el: "#main-user",
        data: {
            productInfo: [
                {"商品编号": "234423432"},
                {"商品编号": "234423432"},
                {"商品编号": "234423432"}
            ]
        }
    });
    $(".content-text").text("商品");
    $(".table-list li:eq(0)").addClass("active");
}());