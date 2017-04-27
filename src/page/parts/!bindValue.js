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