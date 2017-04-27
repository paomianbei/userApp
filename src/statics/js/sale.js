/**
 * Created by weikaiwei on 2017/4/21.
 */
(function(){
    $(".table-list li:eq(2)").addClass("active"); 

    @@include("src/page/parts/!bindValue.js")

    // 用户关注页面跳转到画像查询的会员，把会员手机号码带过去
    if(queryData.userPhoneNumber){
        vueFooter.exportData = queryData;
    }
}());