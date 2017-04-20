/**
 * Created by weikaiwei on 2016/11/21.
 */
(function($){
    function f(Vue, dropSelection){ 
        dropSelection.initTemplate();
        /**
 * Created by weikaiwei on 2016/11/8.
 */
var AREA = {};
(function () {
    AREA.arr_province = [{"value":"北京市","text":"北京","id":"11"},{"value":"天津市","text":"天津","id":"12"},{"value":"河北省","text":"河北省","id":"13"},{"value":"山西省","text":"山西省","id":"14"},{"value":"内蒙古","text":"内蒙古","id":"15"},{"value":"辽宁省","text":"辽宁省","id":"21"},{"value":"吉林省","text":"吉林省","id":"22"},{"value":"黑龙江省","text":"黑龙江省","id":"23"},{"value":"上海市","text":"上海","id":"31"},{"value":"江苏省","text":"江苏省","id":"32"},{"value":"浙江省","text":"浙江省","id":"33"},{"value":"安徽省","text":"安徽省","id":"34"},{"value":"福建省","text":"福建省","id":"35"},{"value":"江西省","text":"江西省","id":"36"},{"value":"山东省","text":"山东省","id":"37"},{"value":"河南省","text":"河南省","id":"41"},{"value":"湖北省","text":"湖北省","id":"42"},{"value":"湖南省","text":"湖南省","id":"43"},{"value":"广东省","text":"广东省","id":"44"},{"value":"广西","text":"广西","id":"45"},{"value":"海南省","text":"海南省","id":"46"},{"value":"重庆市","text":"重庆","id":"50"},{"value":"四川省","text":"四川省","id":"51"},{"value":"贵州省","text":"贵州省","id":"52"},{"value":"云南省","text":"云南省","id":"53"},{"value":"西藏","text":"西藏","id":"54"},{"value":"陕西省","text":"陕西省","id":"61"},{"value":"甘肃省","text":"甘肃省","id":"62"},{"value":"青海省","text":"青海省","id":"63"},{"value":"宁夏","text":"宁夏","id":"64"},{"value":"新疆","text":"新疆","id":"65"},{"value":"台湾省","text":"台湾省","id":"71"},{"value":"香港","text":"香港","id":"81"},{"value":"澳门","text":"澳门","id":"82"}];
    AREA.obj_city = {"河北省":[{"value":"石家庄市","text":"石家庄","id":"1301"},{"value":"唐山市","text":"唐山","id":"1302"},{"value":"秦皇岛市","text":"秦皇岛","id":"1303"},{"value":"邯郸市","text":"邯郸","id":"1304"},{"value":"邢台市","text":"邢台","id":"1305"},{"value":"保定市","text":"保定","id":"1306"},{"value":"张家口市","text":"张家口","id":"1307"},{"value":"承德市","text":"承德","id":"1308"},{"value":"沧州市","text":"沧州","id":"1309"},{"value":"廊坊市","text":"廊坊","id":"1310"},{"value":"衡水市","text":"衡水","id":"1311"}],"山西省":[{"value":"太原市","text":"太原","id":"1401"},{"value":"大同市","text":"大同","id":"1402"},{"value":"阳泉市","text":"阳泉","id":"1403"},{"value":"长治市","text":"长治","id":"1404"},{"value":"晋城市","text":"晋城","id":"1405"},{"value":"朔州市","text":"朔州","id":"1406"},{"value":"晋中市","text":"晋中","id":"1407"},{"value":"运城市","text":"运城","id":"1408"},{"value":"忻州市","text":"忻州","id":"1409"},{"value":"临汾市","text":"临汾","id":"1410"},{"value":"吕梁市","text":"吕梁","id":"1411"}],"内蒙古":[{"value":"呼和浩特市","text":"呼和浩特","id":"1501"},{"value":"包头市","text":"包头","id":"1502"},{"value":"乌海市","text":"乌海","id":"1503"},{"value":"赤峰市","text":"赤峰","id":"1504"},{"value":"通辽市","text":"通辽","id":"1505"},{"value":"鄂尔多斯市","text":"鄂尔多斯","id":"1506"},{"value":"呼伦贝尔市","text":"呼伦贝尔","id":"1507"},{"value":"巴彦淖尔市","text":"巴彦淖尔","id":"1508"},{"value":"乌兰察布市","text":"乌兰察布","id":"1509"},{"value":"兴安盟","text":"兴安盟","id":"1522"},{"value":"锡林郭勒盟","text":"锡林郭勒盟","id":"1525"},{"value":"阿拉善盟","text":"阿拉善盟","id":"1529"}],"辽宁省":[{"value":"沈阳市","text":"沈阳","id":"2101"},{"value":"大连市","text":"大连","id":"2102"},{"value":"鞍山市","text":"鞍山","id":"2103"},{"value":"抚顺市","text":"抚顺","id":"2104"},{"value":"本溪市","text":"本溪","id":"2105"},{"value":"丹东市","text":"丹东","id":"2106"},{"value":"锦州市","text":"锦州","id":"2107"},{"value":"营口市","text":"营口","id":"2108"},{"value":"阜新市","text":"阜新","id":"2109"},{"value":"辽阳市","text":"辽阳","id":"2110"},{"value":"盘锦市","text":"盘锦","id":"2111"},{"value":"铁岭市","text":"铁岭","id":"2112"},{"value":"朝阳市","text":"朝阳","id":"2113"},{"value":"葫芦岛市","text":"葫芦岛","id":"2114"}],"吉林省":[{"value":"长春市","text":"长春","id":"2201"},{"value":"吉林市","text":"吉林","id":"2202"},{"value":"四平市","text":"四平","id":"2203"},{"value":"辽源市","text":"辽源","id":"2204"},{"value":"通化市","text":"通化","id":"2205"},{"value":"白山市","text":"白山","id":"2206"},{"value":"松原市","text":"松原","id":"2207"},{"value":"白城市","text":"白城","id":"2208"},{"value":"延边朝鲜族自治州","text":"延边朝鲜族自治州","id":"2224"}],"黑龙江省":[{"value":"哈尔滨市","text":"哈尔滨","id":"2301"},{"value":"齐齐哈尔市","text":"齐齐哈尔","id":"2302"},{"value":"鸡西市","text":"鸡西","id":"2303"},{"value":"鹤岗市","text":"鹤岗","id":"2304"},{"value":"双鸭山市","text":"双鸭山","id":"2305"},{"value":"大庆市","text":"大庆","id":"2306"},{"value":"伊春市","text":"伊春","id":"2307"},{"value":"佳木斯市","text":"佳木斯","id":"2308"},{"value":"七台河市","text":"七台河","id":"2309"},{"value":"牡丹江市","text":"牡丹江","id":"2310"},{"value":"黑河市","text":"黑河","id":"2311"},{"value":"绥化市","text":"绥化","id":"2312"},{"value":"大兴安岭地区","text":"大兴安岭地区","id":"2327"}],"江苏省":[{"value":"南京市","text":"南京","id":"3201"},{"value":"无锡市","text":"无锡","id":"3202"},{"value":"徐州市","text":"徐州","id":"3203"},{"value":"常州市","text":"常州","id":"3204"},{"value":"苏州市","text":"苏州","id":"3205"},{"value":"南通市","text":"南通","id":"3206"},{"value":"连云港市","text":"连云港","id":"3207"},{"value":"淮安市","text":"淮安","id":"3208"},{"value":"盐城市","text":"盐城","id":"3209"},{"value":"扬州市","text":"扬州","id":"3210"},{"value":"镇江市","text":"镇江","id":"3211"},{"value":"泰州市","text":"泰州","id":"3212"},{"value":"宿迁市","text":"宿迁","id":"3213"}],"浙江省":[{"value":"杭州市","text":"杭州","id":"3301"},{"value":"宁波市","text":"宁波","id":"3302"},{"value":"温州市","text":"温州","id":"3303"},{"value":"嘉兴市","text":"嘉兴","id":"3304"},{"value":"湖州市","text":"湖州","id":"3305"},{"value":"绍兴市","text":"绍兴","id":"3306"},{"value":"金华市","text":"金华","id":"3307"},{"value":"衢州市","text":"衢州","id":"3308"},{"value":"舟山市","text":"舟山","id":"3309"},{"value":"台州市","text":"台州","id":"3310"},{"value":"丽水市","text":"丽水","id":"3311"}],"安徽省":[{"value":"合肥市","text":"合肥","id":"3401"},{"value":"芜湖市","text":"芜湖","id":"3402"},{"value":"蚌埠市","text":"蚌埠","id":"3403"},{"value":"淮南市","text":"淮南","id":"3404"},{"value":"马鞍山市","text":"马鞍山","id":"3405"},{"value":"淮北市","text":"淮北","id":"3406"},{"value":"铜陵市","text":"铜陵","id":"3407"},{"value":"安庆市","text":"安庆","id":"3408"},{"value":"黄山市","text":"黄山","id":"3410"},{"value":"滁州市","text":"滁州","id":"3411"},{"value":"阜阳市","text":"阜阳","id":"3412"},{"value":"宿州市","text":"宿州","id":"3413"},{"value":"巢湖市","text":"巢湖","id":"3414"},{"value":"六安市","text":"六安","id":"3415"},{"value":"亳州市","text":"亳州","id":"3416"},{"value":"池州市","text":"池州","id":"3417"},{"value":"宣城市","text":"宣城","id":"3418"}],"福建省":[{"value":"福州市","text":"福州","id":"3501"},{"value":"厦门市","text":"厦门","id":"3502"},{"value":"莆田市","text":"莆田","id":"3503"},{"value":"三明市","text":"三明","id":"3504"},{"value":"泉州市","text":"泉州","id":"3505"},{"value":"漳州市","text":"漳州","id":"3506"},{"value":"南平市","text":"南平","id":"3507"},{"value":"龙岩市","text":"龙岩","id":"3508"},{"value":"宁德市","text":"宁德","id":"3509"}],"江西省":[{"value":"南昌市","text":"南昌","id":"3601"},{"value":"景德镇市","text":"景德镇","id":"3602"},{"value":"萍乡市","text":"萍乡","id":"3603"},{"value":"九江市","text":"九江","id":"3604"},{"value":"新余市","text":"新余","id":"3605"},{"value":"鹰潭市","text":"鹰潭","id":"3606"},{"value":"赣州市","text":"赣州","id":"3607"},{"value":"吉安市","text":"吉安","id":"3608"},{"value":"宜春市","text":"宜春","id":"3609"},{"value":"抚州市","text":"抚州","id":"3610"},{"value":"上饶市","text":"上饶","id":"3611"}],"山东省":[{"value":"济南市","text":"济南","id":"3701"},{"value":"青岛市","text":"青岛","id":"3702"},{"value":"淄博市","text":"淄博","id":"3703"},{"value":"枣庄市","text":"枣庄","id":"3704"},{"value":"东营市","text":"东营","id":"3705"},{"value":"烟台市","text":"烟台","id":"3706"},{"value":"潍坊市","text":"潍坊","id":"3707"},{"value":"济宁市","text":"济宁","id":"3708"},{"value":"泰安市","text":"泰安","id":"3709"},{"value":"威海市","text":"威海","id":"3710"},{"value":"日照市","text":"日照","id":"3711"},{"value":"莱芜市","text":"莱芜","id":"3712"},{"value":"临沂市","text":"临沂","id":"3713"},{"value":"德州市","text":"德州","id":"3714"},{"value":"聊城市","text":"聊城","id":"3715"},{"value":"滨州市","text":"滨州","id":"3716"},{"value":"菏泽市","text":"菏泽","id":"3717"}],"河南省":[{"value":"郑州市","text":"郑州","id":"4101"},{"value":"开封市","text":"开封","id":"4102"},{"value":"洛阳市","text":"洛阳","id":"4103"},{"value":"平顶山市","text":"平顶山","id":"4104"},{"value":"安阳市","text":"安阳","id":"4105"},{"value":"鹤壁市","text":"鹤壁","id":"4106"},{"value":"新乡市","text":"新乡","id":"4107"},{"value":"焦作市","text":"焦作","id":"4108"},{"value":"濮阳市","text":"濮阳","id":"4109"},{"value":"许昌市","text":"许昌","id":"4110"},{"value":"漯河市","text":"漯河","id":"4111"},{"value":"三门峡市","text":"三门峡","id":"4112"},{"value":"南阳市","text":"南阳","id":"4113"},{"value":"商丘市","text":"商丘","id":"4114"},{"value":"信阳市","text":"信阳","id":"4115"},{"value":"周口市","text":"周口","id":"4116"},{"value":"驻马店市","text":"驻马店","id":"4117"}],"湖北省":[{"value":"武汉市","text":"武汉","id":"4201"},{"value":"黄石市","text":"黄石","id":"4202"},{"value":"十堰市","text":"十堰","id":"4203"},{"value":"宜昌市","text":"宜昌","id":"4205"},{"value":"襄阳市","text":"襄阳","id":"4206"},{"value":"鄂州市","text":"鄂州","id":"4207"},{"value":"荆门市","text":"荆门","id":"4208"},{"value":"孝感市","text":"孝感","id":"4209"},{"value":"荆州市","text":"荆州","id":"4210"},{"value":"黄冈市","text":"黄冈","id":"4211"},{"value":"咸宁市","text":"咸宁","id":"4212"},{"value":"随州市","text":"随州","id":"4213"},{"value":"恩施土家族苗族自治州","text":"恩施土家族苗族自治州","id":"4228"}],"湖南省":[{"value":"长沙市","text":"长沙","id":"4301"},{"value":"株洲市","text":"株洲","id":"4302"},{"value":"湘潭市","text":"湘潭","id":"4303"},{"value":"衡阳市","text":"衡阳","id":"4304"},{"value":"邵阳市","text":"邵阳","id":"4305"},{"value":"岳阳市","text":"岳阳","id":"4306"},{"value":"常德市","text":"常德","id":"4307"},{"value":"张家界市","text":"张家界","id":"4308"},{"value":"益阳市","text":"益阳","id":"4309"},{"value":"郴州市","text":"郴州","id":"4310"},{"value":"永州市","text":"永州","id":"4311"},{"value":"怀化市","text":"怀化","id":"4312"},{"value":"娄底市","text":"娄底","id":"4313"},{"value":"湘西土家族苗族自治州","text":"湘西土家族苗族自治州","id":"4331"}],"广东省":[{"value":"广州市","text":"广州","id":"4401"},{"value":"韶关市","text":"韶关","id":"4402"},{"value":"深圳市","text":"深圳","id":"4403"},{"value":"珠海市","text":"珠海","id":"4404"},{"value":"汕头市","text":"汕头","id":"4405"},{"value":"佛山市","text":"佛山","id":"4406"},{"value":"江门市","text":"江门","id":"4407"},{"value":"湛江市","text":"湛江","id":"4408"},{"value":"茂名市","text":"茂名","id":"4409"},{"value":"肇庆市","text":"肇庆","id":"4412"},{"value":"惠州市","text":"惠州","id":"4413"},{"value":"梅州市","text":"梅州","id":"4414"},{"value":"汕尾市","text":"汕尾","id":"4415"},{"value":"河源市","text":"河源","id":"4416"},{"value":"阳江市","text":"阳江","id":"4417"},{"value":"清远市","text":"清远","id":"4418"},{"value":"东莞市","text":"东莞","id":"4419"},{"value":"中山市","text":"中山","id":"4420"},{"value":"潮州市","text":"潮州","id":"4451"},{"value":"揭阳市","text":"揭阳","id":"4452"},{"value":"云浮市","text":"云浮","id":"4453"}],"广西":[{"value":"南宁市","text":"南宁","id":"4501"},{"value":"柳州市","text":"柳州","id":"4502"},{"value":"桂林市","text":"桂林","id":"4503"},{"value":"梧州市","text":"梧州","id":"4504"},{"value":"北海市","text":"北海","id":"4505"},{"value":"防城港市","text":"防城港","id":"4506"},{"value":"钦州市","text":"钦州","id":"4507"},{"value":"贵港市","text":"贵港","id":"4508"},{"value":"玉林市","text":"玉林","id":"4509"},{"value":"百色市","text":"百色","id":"4510"},{"value":"贺州市","text":"贺州","id":"4511"},{"value":"河池市","text":"河池","id":"4512"},{"value":"来宾市","text":"来宾","id":"4513"},{"value":"崇左市","text":"崇左","id":"4514"}],"海南省":[{"value":"海口市","text":"海口","id":"4601"},{"value":"三亚市","text":"三亚","id":"4602"},{"value":"三沙市","text":"三沙","id":"4603"}],"四川省":[{"value":"成都市","text":"成都","id":"5101"},{"value":"自贡市","text":"自贡","id":"5103"},{"value":"攀枝花市","text":"攀枝花","id":"5104"},{"value":"泸州市","text":"泸州","id":"5105"},{"value":"德阳市","text":"德阳","id":"5106"},{"value":"绵阳市","text":"绵阳","id":"5107"},{"value":"广元市","text":"广元","id":"5108"},{"value":"遂宁市","text":"遂宁","id":"5109"},{"value":"内江市","text":"内江","id":"5110"},{"value":"乐山市","text":"乐山","id":"5111"},{"value":"南充市","text":"南充","id":"5113"},{"value":"眉山市","text":"眉山","id":"5114"},{"value":"宜宾市","text":"宜宾","id":"5115"},{"value":"广安市","text":"广安","id":"5116"},{"value":"达州市","text":"达州","id":"5117"},{"value":"雅安市","text":"雅安","id":"5118"},{"value":"巴中市","text":"巴中","id":"5119"},{"value":"资阳市","text":"资阳","id":"5120"},{"value":"阿坝藏族羌族自治州","text":"阿坝藏族羌族自治州","id":"5132"},{"value":"甘孜藏族自治州","text":"甘孜藏族自治州","id":"5133"},{"value":"凉山彝族自治州","text":"凉山彝族自治州","id":"5134"}],"贵州省":[{"value":"贵阳市","text":"贵阳","id":"5201"},{"value":"六盘水市","text":"六盘水","id":"5202"},{"value":"遵义市","text":"遵义","id":"5203"},{"value":"安顺市","text":"安顺","id":"5204"},{"value":"铜仁地区","text":"铜仁地区","id":"5222"},{"value":"黔西南布依族苗族自治州","text":"黔西南布依族苗族自治州","id":"5223"},{"value":"毕节地区","text":"毕节地区","id":"5224"},{"value":"黔东南苗族侗族自治州","text":"黔东南苗族侗族自治州","id":"5226"},{"value":"黔南布依族苗族自治州","text":"黔南布依族苗族自治州","id":"5227"}],"云南省":[{"value":"昆明市","text":"昆明","id":"5301"},{"value":"曲靖市","text":"曲靖","id":"5303"},{"value":"玉溪市","text":"玉溪","id":"5304"},{"value":"保山市","text":"保山","id":"5305"},{"value":"昭通市","text":"昭通","id":"5306"},{"value":"丽江市","text":"丽江","id":"5307"},{"value":"思茅市","text":"思茅","id":"5308"},{"value":"临沧市","text":"临沧","id":"5309"},{"value":"楚雄彝族自治州","text":"楚雄彝族自治州","id":"5323"},{"value":"红河哈尼族彝族自治州","text":"红河哈尼族彝族自治州","id":"5325"},{"value":"文山壮族苗族自治州","text":"文山壮族苗族自治州","id":"5326"},{"value":"西双版纳傣族自治州","text":"西双版纳傣族自治州","id":"5328"},{"value":"大理白族自治州","text":"大理白族自治州","id":"5329"},{"value":"德宏傣族景颇族自治州","text":"德宏傣族景颇族自治州","id":"5331"},{"value":"怒江傈僳族自治州","text":"怒江傈僳族自治州","id":"5333"},{"value":"迪庆藏族自治州","text":"迪庆藏族自治州","id":"5334"}],"西藏":[{"value":"拉萨市","text":"拉萨","id":"5401"},{"value":"昌都地区","text":"昌都地区","id":"5421"},{"value":"山南地区","text":"山南地区","id":"5422"},{"value":"日喀则地区","text":"日喀则地区","id":"5423"},{"value":"那曲地区","text":"那曲地区","id":"5424"},{"value":"阿里地区","text":"阿里地区","id":"5425"},{"value":"林芝地区","text":"林芝地区","id":"5426"}],"陕西省":[{"value":"西安市","text":"西安","id":"6101"},{"value":"铜川市","text":"铜川","id":"6102"},{"value":"宝鸡市","text":"宝鸡","id":"6103"},{"value":"咸阳市","text":"咸阳","id":"6104"},{"value":"渭南市","text":"渭南","id":"6105"},{"value":"延安市","text":"延安","id":"6106"},{"value":"汉中市","text":"汉中","id":"6107"},{"value":"榆林市","text":"榆林","id":"6108"},{"value":"安康市","text":"安康","id":"6109"},{"value":"商洛市","text":"商洛","id":"6110"}],"甘肃省":[{"value":"兰州市","text":"兰州","id":"6201"},{"value":"嘉峪关市","text":"嘉峪关","id":"6202"},{"value":"金昌市","text":"金昌","id":"6203"},{"value":"白银市","text":"白银","id":"6204"},{"value":"天水市","text":"天水","id":"6205"},{"value":"武威市","text":"武威","id":"6206"},{"value":"张掖市","text":"张掖","id":"6207"},{"value":"平凉市","text":"平凉","id":"6208"},{"value":"酒泉市","text":"酒泉","id":"6209"},{"value":"庆阳市","text":"庆阳","id":"6210"},{"value":"定西市","text":"定西","id":"6211"},{"value":"陇南市","text":"陇南","id":"6212"},{"value":"临夏回族自治州","text":"临夏回族自治州","id":"6229"},{"value":"甘南藏族自治州","text":"甘南藏族自治州","id":"6230"}],"青海省":[{"value":"西宁市","text":"西宁","id":"6301"},{"value":"海东地区","text":"海东地区","id":"6321"},{"value":"海北藏族自治州","text":"海北藏族自治州","id":"6322"},{"value":"黄南藏族自治州","text":"黄南藏族自治州","id":"6323"},{"value":"海南藏族自治州","text":"海南藏族自治州","id":"6325"},{"value":"果洛藏族自治州","text":"果洛藏族自治州","id":"6326"},{"value":"玉树藏族自治州","text":"玉树藏族自治州","id":"6327"},{"value":"海西蒙古族藏族自治州","text":"海西蒙古族藏族自治州","id":"6328"}],"宁夏":[{"value":"银川市","text":"银川","id":"6401"},{"value":"石嘴山市","text":"石嘴山","id":"6402"},{"value":"吴忠市","text":"吴忠","id":"6403"},{"value":"固原市","text":"固原","id":"6404"},{"value":"中卫市","text":"中卫","id":"6405"}],"新疆":[{"value":"乌鲁木齐市","text":"乌鲁木齐","id":"6501"},{"value":"克拉玛依市","text":"克拉玛依","id":"6502"},{"value":"吐鲁番地区","text":"吐鲁番地区","id":"6521"},{"value":"哈密地区","text":"哈密地区","id":"6522"},{"value":"昌吉回族自治州","text":"昌吉回族自治州","id":"6523"},{"value":"博尔塔拉蒙古自治州","text":"博尔塔拉蒙古自治州","id":"6527"},{"value":"巴音郭楞蒙古自治州","text":"巴音郭楞蒙古自治州","id":"6528"},{"value":"阿克苏地区","text":"阿克苏地区","id":"6529"},{"value":"克孜勒苏柯尔克孜自治州","text":"克孜勒苏柯尔克孜自治州","id":"6530"},{"value":"喀什地区","text":"喀什地区","id":"6531"},{"value":"和田地区","text":"和田地区","id":"6532"},{"value":"伊犁哈萨克自治州","text":"伊犁哈萨克自治州","id":"6540"},{"value":"塔城地区","text":"塔城地区","id":"6542"},{"value":"阿勒泰地区","text":"阿勒泰地区","id":"6543"}]};
}());
(function(){
    //热门省市
    AREA.hot = [{"text":"北京","value":"北京市"},{"text":"上海","value":"上海市"},{"text":"广州","value":"广州市"},{"text":"深圳","value":"深圳市"},{"text":"成都","value":"成都市"},{"text":"重庆","value":"重庆市"},{"text":"西安","value":"西安市"},{"text":"武汉","value":"武汉市"},{"text":"河南省","value":"河南省", "type": 1},{"text":"浙江省","value":"浙江省","type":1}];
    //按字母分组的省
    AREA.tabData = {
        province: [
            ["A-G",{"value":"安徽省","text":"安徽省","type":1},{"value":"澳门","text":"澳门"},{"value":"北京市","text":"北京"},{"value":"重庆市","text":"重庆"},{"value":"福建省","text":"福建省","type":1},{"value":"甘肃省","text":"甘肃省","type":1},{"value":"广东省","text":"广东省","type":1},{"value":"广西","text":"广西","type":1},{"value":"贵州省","text":"贵州省","type":1}],
            ["H-K",{"text":"海南省","value":"海南省","type":1},{"text":"河北省","value":"河北省","type":1},{"text":"黑龙江省","value":"黑龙江省","type":1},{"text":"河南省","value":"河南省","type":1},{"text":"湖北省","value":"湖北省","type":1},{"text":"湖南省","value":"湖南省","type":1},{"text":"江苏省","value":"江苏省","type":1},{"text":"江西省","value":"江西省","type":1},{"text":"吉林省","value":"吉林省","type":1}],
            ["L -S",{"text":"辽宁省","value":"辽宁省","type":1},{"text":"内蒙古","value":"内蒙古","type":1},{"text":"宁夏","value":"宁夏","type":1},{"text":"青海省","value":"青海省","type":1},{"text":"山东省","value":"山东省","type":1},{"text":"上海","value":"上海市"},{"text":"山西省","value":"山西省","type":1},{"text":"陕西省","value":"陕西省","type":1},{"text":"四川省","value":"四川省","type":1}],
            ["T -Z",{"text":"台湾省","value":"台湾省","type":0},{"text":"天津","value":"天津市"},{"text":"新疆","value":"新疆","type":1},{"text":"西藏","value":"西藏","type":1},{"text":"香港","value":"香港"},{"text":"云南省","value":"云南省","type":1},{"text":"浙江省","value":"浙江省","type":1}]
        ].map(function(item){
            return item.map(function(item){
                if(typeof item == "object" && item.type == 1){
                    item.children = AREA.obj_city[item.value];
                    //需求要求市中的列表数据第一项是该省份
                    item.children.unshift({value: item.value, text: item.text, type: 1});
                }
                return item;
            });
        })
    };
}());
        var areaSelection = function(o){
            /**使用的下拉面板类型
 * 0：焦点面板（默认）
 * 1：点击面板
 * */
var panelType = 0;
var _prototype = {
    data: {
        keyField: "value",
        labelField: "text",
        tabIndex: 0,
        hotItems: [],
        tabData: {
            //第一个tab标签内的数据源
            "0": [],
            //第二个tab标签内的数据源
            "1": []
        },
        //搜索输入的关键字
        searchKeywords_: "",
        //关键字搜索结果
        searchResult: null,
        placeholder: ""
    },
    computed: {
        //搜索输入的关键字
        searchKeywords: {
            get: function(){
                return this.searchKeywords_;
            },
            set: function(v){
                var vue = this;
                this.searchKeywords_ = v = $.trim(v);
                this.search(v, function(result){
                    var list;
                    vue.searchResult = result;
                    if(result){
                        list = vue.list;
                        list.keepFocus++;
                        vue.resultList.expand();
                        setTimeout(function(){
                            list.keepFocus--;
                        }, 10);
                    }else{
                        vue.resultList.collapse();
                    }
                });
            }
        },
        mode: {
            set: function(v){ 
                this.selection.mode = v;
            },
            get: function(){
                return this.selection.mode;
            }
        }
    },
    methods: {
        //选项卡的click事件
        activeTab: function(index){
            //当前焦点在一级标签上，开启二级标签后由于以及面板隐藏会导致焦点丢失，主动渡让焦点
            panelType == 0 && this.list.shiftFocus();
            this.tabIndex = index;
        },
        /**所有列表项的点击选择事件
         * @param item，点击项。item.type==1，不选中该项，开启对应的二级标签
         * @param type，1：忽略item.type的值，直接选中该项
         */
        itemClick: function (item, type) {
            var tabIndex = this.tabIndex + 1;
            if(!type && item.children){
                //有子级数据，点击后进入下一级标签
                this.activeTab(tabIndex);
                //获取二级内容
                this.tabData[tabIndex] = item.children;
            }else{
                //直接选中点击项
                this.selection.addSelection(item);
            }
        },
        isSelected: function(item){
            var keyField = this.keyField;
            return this.selection && this.selection.items && this.selection.items.some(function(selectionItem){
                    return selectionItem[keyField] == item[keyField];
                });
        },
        //关键字搜索
        search: function(v, callback){
            var resultGroup;
            if(v){
                resultGroup = [];
                this.searchFrom.forEach(function(data0){
                    //把与关键字匹配的省份放入结果集中
                    data0.text.indexOf(v) > -1 && (resultGroup[0] || (resultGroup[0] = [])).push(data0);
                    //把与关键字匹配的城市放入结果集中。需求：二级数据的第一条数据是其对应的一级，不能作为二级查询的数据
                    data0.children &&　data0.children.slice(1).forEach(function(data1){
                        data1.text.indexOf(v) > -1 && (resultGroup[1] || (resultGroup[1] = [])).push(data1);
                    });
                });
            }
            (typeof callback == "function") && callback(resultGroup);
            return resultGroup;
        },
        convert: function(v, k, l){
            var keyField = this.keyField, labelField = this.labelField, obj, arr;
            k || (k = keyField);
            l || (l = labelField);
            //设置数据的时候要经过格式转换。兼容json、数组、对象
            //如果是字符串，先尝试当成json转成对象
            if(typeof v == "string"){
                try{
                    v = JSON.parse(v);
                }catch(e){
                    v = [];
                }
            }
            if(v instanceof Array){
                return v.map(function(item){
                    if(typeof item == "object"){
                        obj = $.extend(true, {}, item);
                        obj[keyField] = item[k];
                        obj[labelField] = item[l];
                        keyField != k && delete obj[k];
                        labelField != l && delete obj[l];
                    }else{
                        obj = {};
                        obj[keyField] = item;
                        obj[labelField] = item;
                    }
                    return obj;
                });
            }else if(v instanceof Object){
                arr = [];
                for(var i in v){
                    obj = {};
                    obj[keyField] = i;
                    obj[labelField] = v[i];
                    arr.push(obj);
                }
                return arr;
            }
            return v;
        },
        /**获取选中项的数据
         * */
        getSelectionData: function(){
            return this.selection && this.selection.items || [];
        },
        setSelectionData: function(v){
            this.selection && (this.selection.items = this.convert(v));
        }
    },
    mounted: function(){
        var vue = this, $refs = this.$refs, selection = this.selection = $refs.selection, list = this.list = selection.$refs.list, resultList = this.resultList = $refs.resultList;
        resultList.addActionTargets($(list.$el).find(".search-input")[0]);
        list.addFocusEvent(selection.$el);
        $(vue.$el).on("selection:expand", function(e){
            list.expand();
        })
            .on("selection:collapse", function(e){
                list.collapse();
            })
            .on("dropPanel:collapse", function(e){
                //下拉面板关闭、搜索结果面板关闭后重置输入内容和结果列表
                vue.searchResult = null;
                vue.searchKeywords_ = null;
                //主下拉面板关闭，1、把selection的状态也设置成关闭；2、清空城市列表，选中省份列表
                if(e.originalEvent.vueObject == list){
                    selection.collapse();
                    //启动活动标签，把非活动标签的数据都清空
                    vue.activeTab(0);
                    for(var index in vue.tabData){
                        index != 0 && (vue.tabData[index] = null);
                    }
                }
            });
    }
};
            var vue = new Vue($.extend(true, {}, _prototype, {
                template: '<drop-selection ref="selection" name="area" :placeholder="placeholder" v-cloak> <div class="table-list" v-if="hotItems &amp;&amp; hotItems.length"> <div class="title">热门省市：</div> <ul class="content"> <li v-for="item in hotItems" :class="{selectedlight: isSelected(item)}"> <a class="link" href="javascript:;" @click="itemClick(item)">{{item[labelField]}}</a> </li> </ul> </div> <div class="search-group"> <div class="input-group"> <input type="text" class="search-input" v-model="searchKeywords" placeholder="请输入关键字"> <i class="input-group-addon icon-search"></i> </div> <drop-panel ref="resultList" class="drop-list full-width"> <ul class="search-result list-group"> <li v-for="(items, index) in searchResult" :class="{divition: index < searchResult.length - 1}"> <ul class="list"> <li v-for="item in items"> <a class="link" href="javascript:;" @click="itemClick(item, 1)">{{item[labelField]}}</a> </li> </ul> </li> </ul> </drop-panel> </div> <ul class="nav nav-tabs"> <li :class="{active: tabIndex == 0}" @click="activeTab(0)"> <a href="javascript:;">省份</a> </li> <li :class="{active: tabIndex == 1}" @click="activeTab(1)"> <a href="javascript:;">城市</a> </li> </ul> <div class="tab-content"> <ul class="list-group tab-pane fade in" :class="{active: tabIndex == 0}"> <li v-for="group in tabData[0]"> <ul class="list"> <li v-for="item in group" class="title" :class="{selectedlight: isSelected(item)}" v-if="typeof item == \'string\'">{{item}}</li> <li :class="{selectedlight: isSelected(item)}" v-else=""><a class="link" href="javascript:;" @click="itemClick(item)">{{item[labelField]}}</a></li> </ul> </li> </ul> <div class="tab-pane fade in" :class="{active: tabIndex == 1}"> <ul class="list"> <li v-for="(item, index) in tabData[1]" :class="{selectedlight: isSelected(item), divition: index == 0 && tabData[1].length > 1}"> <a class="link" href="javascript:;" @click="itemClick(item)">{{item[labelField]}}</a> </li> </ul> </div> </div> </drop-selection>',
                created: function(){
                    var tabData = AREA.tabData;
                    this.hotItems = AREA.hot;
                    $.extend(this.tabData, {0: tabData.province, 1: tabData.city});
                    //模糊搜索的数据池子
                    this.searchFrom = function(){
                        var arr = [];
                        tabData.province.forEach(function(item){
                            item.forEach(function(item){typeof item == "string" || arr.push(item)});
                        });
                        return arr;
                    }();
                }
            }, o));
            vue._prototype = _prototype;
            return vue;
        };
        return areaSelection;
    }
    "object"==typeof module&&module&&"object"==typeof module.exports?
        module.exports= f :
        ("function"==typeof define&&define.amd&&define(["Vue", "vueComponent/dropSelection/dropSelection"], f));
})(jQuery);