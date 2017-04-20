(function($){
    /**使用的下拉面板类型
     * 0：焦点面板（默认）
     * 1：点击面板
     * */
    var panelType = 0;
    function f(Vue){
        function dispatchEvent(eventName, el, attrs){
            var event = document.createEvent("HTMLEvents");
            event.initEvent(eventName, true, false);
            if(attrs){
                for(var i in attrs){
                    event[i] = attrs[i];
                }
            }
            // el.dispatchEvent(event);//没有使用原始的事件派发，是因为在ie10下原始事件派发后被easyui捕获导致各种错误
            $(el).trigger(new $.Event(event));
        }
        //下拉选中项显示区域
        var dropSelection = {
                initTemplate: function(html) {
                    html && (this._prototype.template = html);
                    if(panelType == 0){
                        // 如果不使用焦点面板，mounted方法去掉
                        this._prototype.mounted = function(){
                            var vue = this, keepFocus;
                            vue.keepFocus = 0;
                            $(this.$el).on("mouseenter", function(e){
                                //点击面板范围内的一些不可获取焦点的元素会导致导致面板焦点丢失，此时强制保留焦点
                                keepFocus = 1;
                                vue.keepFocus++;
                            }).on("mouseleave", function(e){
                                // e.stopPropagation();
                                //鼠标操作结束后返还焦点
                                if(keepFocus){
                                    keepFocus = 0;
                                    vue.keepFocus--;
                                    vue.keepFocus < 0 && (vue.keepFocus = 0);
                                }
                            });
                        }
                    }
                    Vue.component("drop-selection", this._prototype);
                },
                _prototype: {
                    template: '<div class="drop-selection" :class="{disabled: mode == 0, expand: status == \'expand\' }"> <div @click="toggle"> <ul class="selection-list" v-show="items && items.length"> <li v-for="item in items" class="selection-item"> <a href="javascript:void(0)">{{item[labelField]}}</a> <i class="icon-deselect" @click.stop="removeSelection(item); collapse();"></i> </li> </ul> <div class="placeholder" v-show="!items || !items.length">{{placeholder}}</div> <div class="icon-drop"></div> </div> <drop-panel ref="list" class="drop-list"> <slot></slot> </drop-panel> </div>',
                    props: ["placeholder"],
                    data: function(){
                        return {
                            mode: 1,//下拉组件的模式状态：0，禁用；1，正常可编辑（默认）
                            status: "collapse",//当前状态：expand、collapse（默认）
                            items_: []
                        }
                    },
                    computed: {
                        items: {
                            get: function(){
                                return this.items_;
                            },
                            set: function(v){
                                this.items_ = v || [];
                                dispatchEvent("selection:change", this.$el, {change: "set", vueObject: this});
                            }
                        },
                        keyField: {
                            get: function(){return this.$parent.keyField;}
                        },
                        labelField: {
                            get: function(){return this.$parent.labelField;}
                        }
                    },
                    methods: {
                        addSelection: function(item){
                            var selections = this.items, keyField = this.keyField;
                            //不能重复添加同一个选中项
                            selections.every(function(i){
                                return item[keyField] != i[keyField];
                            }) && (selections.push(item));
                            dispatchEvent("selection:change", this.$el, {change: "addSelection", vueObject: this});
                        },
                        //移除选中项
                        removeSelection: function(item){
                            if(this.mode == 1){
                                var selections = this.items, keyField = this.keyField;
                                selections.some(function(i, index){
                                    if(item[keyField] == i[keyField]){
                                        selections.splice(index, 1);
                                        return true;
                                    }
                                });
                                //移除完选中项后向外层派发移除事件和change事件
                                dispatchEvent("selection:change", this.$el, {change: "removeSelection", vueObject: this});
                            }
                        },
                        //展开下拉，定位搜索框
                        expand: function(){
                            if(this.mode == 1 && this.status != "expand"){
                                this.status = "expand";
                                dispatchEvent("selection:expand", this.$el, {vueObject: this});
                            }
                        },
                        //状态改为收回状态，下拉的收回状态由下拉对象自己处理
                        collapse: function(){
                            if(this.mode == 1){
                                if(this.status != "collapse" && (!this.keepFocus || !this.keepFocus > 0)){
                                    this.status = "collapse";
                                    dispatchEvent("selection:collapse", this.$el, {vueObject: this});
                                }
                            }
                        },
                        toggle: function(){
                            if(this.mode == 1){
                                this.status == "collapse" ? this.expand() : (this.keepFocus = 0, this.collapse());
                            }
                        }
                    }
                }
            };
        return {
            dropSelection: dropSelection,
            // dropPanel: panelType == 0 ? focusPanel : dropPanel,
            dropPanel: /**
 * Created by weikaiwei on 2016/11/30.
 */
{
    initTemplate: function(html) {
        html && (this._prototype.template = html);
        Vue.component("drop-panel", this._prototype);
    },
    _prototype: {
        template: '<div class="focus-panel" v-show="status == \'expand\'"> <div class="panel-content"> <slot></slot> </div> <a href="javascript:;" class="default-focus"></a> </div>',
        data: function(){
            return {
                items: [],
                status: "collapse",
                //其它可以获得面板焦点的元素（这些元素不在面板范围内部）
                actionTargets: [],
                keepFocus: 0
            };
        },
        methods: {
            keyField: {
                get: function(){return this.$parent.keyField;}
            },
            labelField: {
                get: function(){return this.$parent.labelField;}
            },
            isActive: function (item) {
                var keyField = this.keyField;
                return this.activeItems.some(function(i){
                    return item[keyField] == i[keyField];
                });
            },
            /**下拉收回
             * */
            collapse: function(){
                if(this.status != "collapse"){
                    this.status = "collapse";
                    dispatchEvent("dropPanel:collapse", this.$el, {vueObject: this});
                }
            },
            expand: function(){
                if(this.status != "expand"){
                    //展开下拉
                    var vue = this;
                    this.status = "expand";
                    Vue.nextTick(function(){
                        vue.setFocus();
                        //注册焦点丢失关闭面板的事件
                        dispatchEvent("dropPanel:expand", vue.$el, {vueObject: this});
                    });
                }
            },
            //设置焦点，默认是把焦点设置到焦点对象上(用作背景的a标签)。如果面板上已经具有焦点元素，则不作任何处理
            setFocus: function(target){
                var $focus;
                if(target){
                    this.shiftFocus(target);
                }
                //如果焦点不在面板上任何一个元素上，把焦点设置到默认元素上
                else if(!this.hasFocusEl()){
                    $focus = this.$content.find("input:visible:first");
                    $focus.length ? $focus.focus() : $focus = this.$content.find("a[href]:visible:first");
                    this.shiftFocus($focus.length ? $focus : this.$defaultFocus);
                }
            },
            //转让焦点。默认把焦点转让给面板的隐藏焦点对象上
            shiftFocus: function(target){
                var vue = this;
                //渡让焦点前强制保留焦点，渡让的过程会导致焦点先丢失
                this.keepFocus++;
                $(target || this.$defaultFocus).focus();
                setTimeout(function(){
                    vue.keepFocus--;
                    vue.keepFocus < 0 && (vue.keepFocus = 0);
                }, 1);
            },
            //检测面板是否具有焦点，强制保留的焦点也算是具有焦点
            hasFocus: function(){
                //先检测面板范围内是否具有焦点，如果没有就再检测监视的焦点对象们身上是否具有焦点
                var vue = this;
                return this.keepFocus > 0 || this.actionTargets.concat(this.$el).some(function(item){return vue.contains(item, document.activeElement);});
            },
            //检测面板是否具有焦点元素
            hasFocusEl: function(){
                //先检测面板范围内是否具有焦点，如果没有就再检测监视的焦点对象们身上是否具有焦点
                var vue = this;
                return this.actionTargets.concat(this.$el).some(function(item){return vue.contains(item, document.activeElement);});
            },
            contains: function(a, b){
                return a == b || $.contains(a, b);
            },
            /** 把焦点面板的交代作用区域扩大到一些不在焦点面板区域的其它元素上。
             * 1、指定的元素获得焦点导致面板丢失焦点的时候视同面板有焦点，它们失去焦点时触发面板焦点丢失；
             * 2、焦点面板设置焦点前检测它们是否具有焦点，有的话不强行剥夺它们的焦点；
             * 3、当鼠标在这些对元素上的时候，强制保留焦点(keepFoucs++)；鼠标移走后清除此元素强制保留焦点的状态(keepFoucs--)；
             * 4、如果指定的元素在焦点面板内（或者是焦点面板本身），不执行上述所有过程。
             * */
            addActionTargets: function(targets){
                //过滤出不在面板范围内的元素
                var $el = $(this.$el), vue = this; 
                targets = $(targets).filter(function(){
                    var nested;
                    // 如果元素不在焦点面板范围内，继续检查焦点面板是否在元素内
                    if(!vue.contains($el[0], this)){
                        // 如果焦点面板被包含在指定元素内，元素的焦点事件触发焦点面板的焦点事件，然后事件又冒泡到元素上，会造成死循环
                        if(vue.contains(this, $el[0])){
                            $(this).on("focusout", function(){
                                nested ? (nested = 0) : (nested = 1, $el.trigger("focusout"));
                            });
                        }
                        //元素和焦点面板之间没有包含关系，元素的发生焦点事件后，主动触发焦点面板的焦点事件
                        else{
                            $(this).on("focusout", function(){$el.trigger("focusout");});
                        }
                        //给焦点对象设置点击强制保留焦点的功能
                        vue.addFocusEvent(this);
                        return true;
                    }
                    // 如果元素在焦点面板范围内，不需要监听它的焦点事件，自动冒泡到焦点面板上统一处理。
                    return false;
                });
                this.actionTargets = this.actionTargets.concat(targets.toArray());
            },
            /**当鼠标在面板范围内的时候强制保留焦点，防止点击面板范围内的一些非焦点元素会导致焦点丢失，继而造成面板的关闭。
             * */
            addFocusEvent: function(el){
                var vue = this;
                $(el).each(function(){
                    var mousedownSelf;
                    $(this).on("mouseenter", function(e){
                        //点击面板范围内的一些不可获取焦点的元素会导致导致面板焦点丢失，此时强制保留焦点
                        mousedownSelf = 1;
                        vue.keepFocus++;
                    }).on("mouseleave", function(e){
                        // e.stopPropagation();
                        //鼠标操作结束后返还焦点
                        if(mousedownSelf){
                            mousedownSelf = 0;
                            vue.keepFocus--;
                            vue.keepFocus < 0 && (vue.keepFocus = 0);
                            //使用shiftFocus方法，把焦点默默地设置到隐藏焦点元素上
                            vue.hasFocusEl() || vue.shiftFocus();
                        }
                    });
                });
            }
        },
        /**dom初始化完成后定义操作
         * 这是一个内部失去焦点后自动关闭的面板（一般用作下拉面板）
         * */
        mounted: function(){
            var vue = this, $el = $(this.$el);
            this.$content = $el.find(".panel-content");
            this.$defaultFocus = $el.children(".default-focus");
            $el.on("focusout", function(){
                //焦点对象如果不在面板中，并且也不在非面板区域内的其它特定焦点对象上，关闭面板
                if(!vue.hasFocus()){
                    vue.collapse();
                }
            });
            this.addFocusEvent($el);
        }
    }
},
            initTemplate: function(t1, t2){
                if(!this._isInit){
                    this._isInit = 1;
                    this.dropSelection.initTemplate(t1);
                    this.dropPanel.initTemplate(t2);
                }
            }
        };
    }
    "object"==typeof module&&module&&"object"==typeof module.exports?
        module.exports= f:
        ("function"==typeof define&&define.amd&&define(["Vue"], f));
})(jQuery);