/**
 * Created by weikaiwei on 2016/11/25.
 */
(function($){
    function f(Vue, dropSelection){
        dropSelection.initTemplate();
        var brandSelection = function(o){
            var BASEPATH = "../";
            o.BASEPATH && (BASEPATH = o.BASEPATH, delete o.BASEPATH);
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
                template: '<drop-selection ref="selection" name="brand" :placeholder="placeholder" v-cloak> <div class="search-group"> <div class="input-group"> <input type="text" class="search-input" v-model="searchKeywords" placeholder="请输入关键字"> <i class="input-group-btn icon-search"></i> </div> <drop-panel ref="resultList" class="drop-list full-width"> <ul class="search-result list"> <li v-for="item in searchResult"> <a class="link" href="javascript:;" @click="itemClick(item)">{{item[labelField]}}</a> </li> </ul> </drop-panel> </div> <div class="table-list" v-if="hotItems && hotItems.length" style="padding: 0 25px 10px;"> <div class="title">常用品牌：</div> <ul class="content"> <li v-for="item in hotItems" :class="{selectedlight: isSelected(item)}"> <a class="link" href="javascript:;" @click="itemClick(item)">{{item[labelField]}}</a> </li> </ul> </div> </drop-selection>',
                methods: {
                    search: function(v, callback){
                        var vue = this;
                        if(v){
                            $.ajax({
                                url: BASEPATH + "crowd/getBrandByKeyword",
                                data: {
                                    brandname: encodeURIComponent(encodeURIComponent(v))
                                },
                                success: function (result) {
                                    //品牌搜索返回的是obj结果集，转换成数组类型的数据
                                    typeof callback == "function" && callback(vue.convert(result));
                                }
                            });
                        }
                        else{
                            //品牌搜索返回的是obj结果集，转换成数组类型的数据
                            typeof callback == "function" && callback();
                        }
                    }
                },
                created: function(){
                    this.hotItems = [{"value":"10000098","text":"Apple"},{"value":"10000003","text":"奥克斯（AUX）"},{"value":"10000048","text":"创维（Skyworth）"},{"value":"10000252","text":"方太（FOTILE）"},{"value":"10000049","text":"飞利浦（Philips）"},{"value":"10000008","text":"格力（Gree）"},{"value":"10000009","text":"海尔（Haier）"},{"value":"10000010","text":"海信（Hisense）"},{"value":"10000084","text":"华为（HUAWEI）"},{"value":"10000581","text":"华帝（vatti）"},{"value":"10000221","text":"九阳（Joyoung）"},{"value":"10000055","text":"康佳（KONKA）"},{"value":"10000085","text":"联想（lenovo）"},{"value":"10007220","text":"老板（ROBAM）"},{"value":"10001888","text":"乐视"},{"value":"10000012","text":"美的（Midea）"},{"value":"10000120","text":"魅族（MEIZU）"},{"value":"10000088","text":"OPPO"},{"value":"10000301","text":"三星（SAMSUNG）"},{"value":"10000217","text":"苏泊尔（SUPOR）"},{"value":"10000002","text":"TCL"},{"value":"71912131","text":"VIVO"},{"value":"10007234","text":"小米（MI）"},{"value":"10000031","text":"西门子（siemens）"}];
                }
            }, o));
            vue._prototype = _prototype;
            return vue;
        };
        return brandSelection;
    }
    "object"==typeof module&&module&&"object"==typeof module.exports?
        module.exports= f :
        ("function"==typeof define&&define.amd&&define(["Vue", "vueComponent/dropSelection/dropSelection"], f));
})(jQuery);