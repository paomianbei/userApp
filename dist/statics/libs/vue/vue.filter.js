/**vue 2.0移除了1版本中自带的所有过滤器。这个js文件把1版本中的过滤器整合起来
 * Created by weikaiwei on 2016/12/20.
 */
(function(){
    function f(Vue){
        var toString = Object.prototype.toString;
        var OBJECT_STRING = '[object Object]';
        var isArray = Array.isArray;
        function isObject(obj) {
            return obj !== null && typeof obj === 'object';
        }
        function isPlainObject(obj) {
            return toString.call(obj) === OBJECT_STRING;
        }
        function toArray(list, start) {
            start = start || 0;
            var i = list.length - start;
            var ret = new Array(i);
            while (i--) {
                ret[i] = list[i + start];
            }
            return ret;
        }
        function convertArray(value) {
            if (Array.isArray(value)) {
                return value;
            } else if (isPlainObject(value)) {
                // convert plain object to array.
                var keys = Object.keys(value);
                var i = keys.length;
                var res = new Array(i);
                var key;
                while (i--) {
                    key = keys[i];
                    res[i] = {
                        $key: key,
                        $value: value[key]
                    };
                }
                return res;
            } else {
                if (typeof value === 'number' && !isNaN(value)) {
                    value = range(value);
                }
                return value || [];
            }
        }


        function contains(val, search) {
            var i;
            if (isPlainObject(val)) {
                var keys = Object.keys(val);
                i = keys.length;
                while (i--) {
                    if (contains(val[keys[i]], search)) {
                        return true;
                    }
                }
            } else if (isArray(val)) {
                i = val.length;
                while (i--) {
                    if (contains(val[i], search)) {
                        return true;
                    }
                }
            } else if (val != null) {
                return val.toString().toLowerCase().indexOf(search) > -1;
            }
        }

        /**
         * Debounce a function so it only gets called after the
         * input stops arriving after the given wait period.
         *
         * @param {Function} func
         * @param {Number} wait
         * @return {Function} - the debounced function
         */

        function _debounce(func, wait) {
            var timeout, args, context, timestamp, result;
            var later = function later() {
                var last = Date.now() - timestamp;
                if (last < wait && last >= 0) {
                    timeout = setTimeout(later, wait - last);
                } else {
                    timeout = null;
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                }
            };
            return function () {
                context = this;
                args = arguments;
                timestamp = Date.now();
                if (!timeout) {
                    timeout = setTimeout(later, wait);
                }
                return result;
            };
        }

        /**
         * Limit filter for arrays
         *
         * @param {Number} n
         * @param {Number} offset (Decimal expected)
         */
        function limitBy(arr, n, offset) {
            offset = offset ? parseInt(offset, 10) : 0;
            n = toNumber(n);
            return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
        }
        /**
         * Filter filter for arrays
         *
         * @param {String} search
         * @param {String} [delimiter]
         * @param {String} ...dataKeys
         */
        function filterBy(arr, search, delimiter) {
            arr = convertArray(arr);
            if (search == null) {
                return arr;
            }
            if (typeof search === 'function') {
                return arr.filter(search);
            }
            // cast to lowercase string
            search = ('' + search).toLowerCase();
            // allow optional `in` delimiter
            // because why not
            var n = delimiter === 'in' ? 3 : 2;
            // extract and flatten keys
            var keys = Array.prototype.concat.apply([], toArray(arguments, n));
            var res = [];
            var item, key, val, j;
            for (var i = 0, l = arr.length; i < l; i++) {
                item = arr[i];
                val = item && item.$value || item;
                j = keys.length;
                if (j) {
                    while (j--) {
                        key = keys[j];
                        if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
                            res.push(item);
                            break;
                        }
                    }
                } else if (contains(item, search)) {
                    res.push(item);
                }
            }
            return res;
        }
        /**
         * Filter filter for arrays
         *
         * @param {String|Array<String>|Function} ...sortKeys
         * @param {Number} [order]
         */
        function orderBy(arr) {
            var comparator = null;
            var sortKeys = undefined;
            arr = convertArray(arr);

            // determine order (last argument)
            var args = toArray(arguments, 1);
            var order = args[args.length - 1];
            if (typeof order === 'number') {
                order = order < 0 ? -1 : 1;
                args = args.length > 1 ? args.slice(0, -1) : args;
            } else {
                order = 1;
            }

            // determine sortKeys & comparator
            var firstArg = args[0];
            if (!firstArg) {
                return arr;
            } else if (typeof firstArg === 'function') {
                // custom comparator
                comparator = function (a, b) {
                    return firstArg(a, b) * order;
                };
            } else {
                // string keys. flatten first
                sortKeys = Array.prototype.concat.apply([], args);
                comparator = function (a, b, i) {
                    i = i || 0;
                    return i >= sortKeys.length - 1 ? baseCompare(a, b, i) : baseCompare(a, b, i) || comparator(a, b, i + 1);
                };
            }

            function baseCompare(a, b, sortKeyIndex) {
                var sortKey = sortKeys[sortKeyIndex];
                if (sortKey) {
                    if (sortKey !== '$key') {
                        if (isObject(a) && '$value' in a) a = a.$value;
                        if (isObject(b) && '$value' in b) b = b.$value;
                    }
                    a = isObject(a) ? getPath(a, sortKey) : a;
                    b = isObject(b) ? getPath(b, sortKey) : b;
                }
                return a === b ? 0 : a > b ? order : -order;
            }

            // sort on a copy to avoid mutating original array
            return arr.slice().sort(comparator);
        }
        var filters = {
            orderBy: orderBy,
            filterBy: filterBy,
            limitBy: limitBy,

            /**
             * Stringify value.
             *
             * @param {Number} indent
             */

            json: {
                read: function read(value, indent) {
                    return typeof value === 'string' ? value : JSON.stringify(value, null, arguments.length > 1 ? indent : 2);
                },
                write: function write(value) {
                    try {
                        return JSON.parse(value);
                    } catch (e) {
                        return value;
                    }
                }
            },

            /**
             * 'abc' => 'Abc'
             */

            capitalize: function capitalize(value) {
                if (!value && value !== 0) return '';
                value = value.toString();
                return value.charAt(0).toUpperCase() + value.slice(1);
            },

            /**
             * 'abc' => 'ABC'
             */

            uppercase: function uppercase(value) {
                return value || value === 0 ? value.toString().toUpperCase() : '';
            },

            /**
             * 'AbC' => 'abc'
             */

            lowercase: function lowercase(value) {
                return value || value === 0 ? value.toString().toLowerCase() : '';
            },

            /**
             * 12345 => $12,345.00
             *
             * @param {String} sign
             * @param {Number} decimals Decimal places
             */

            currency: function currency(value, _currency, decimals) {
                value = parseFloat(value);
                if (!isFinite(value) || !value && value !== 0) return '';
                _currency = _currency != null ? _currency : '$';
                decimals = decimals != null ? decimals : 2;
                var stringified = Math.abs(value).toFixed(decimals);
                var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
                var i = _int.length % 3;
                var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
                var _float = decimals ? stringified.slice(-1 - decimals) : '';
                var sign = value < 0 ? '-' : '';
                return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
            },

            /**
             * 'item' => 'items'
             *
             * @params
             *  an array of strings corresponding to
             *  the single, double, triple ... forms of the word to
             *  be pluralized. When the number to be pluralized
             *  exceeds the length of the args, it will use the last
             *  entry in the array.
             *
             *  e.g. ['single', 'double', 'triple', 'multiple']
             */

            pluralize: function pluralize(value) {
                var args = toArray(arguments, 1);
                var length = args.length;
                if (length > 1) {
                    var index = value % 10 - 1;
                    return index in args ? args[index] : args[length - 1];
                } else {
                    return args[0] + (value === 1 ? '' : 's');
                }
            },

            /**
             * Debounce a handler function.
             *
             * @param {Function} handler
             * @param {Number} delay = 300
             * @return {Function}
             */

            debounce: function debounce(handler, delay) {
                if (!handler) return;
                if (!delay) {
                    delay = 300;
                }
                return _debounce(handler, delay);
            }
        };
        for(var i in filters){
            Vue.filter(i, filters[i]);
        }
    }
    "object"==typeof module&&module&&"object"==typeof module.exports?
        module.exports= f:
        ("function"==typeof define&&define.amd&&define(["Vue"], f));
})();