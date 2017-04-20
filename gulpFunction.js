/**
 * Created by weikaiwei on 2017/4/15.
 */
//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'); //本地安装gulp所用到的地方
var $ = require("gulp-load-plugins")(),
    mergeStream = require("merge-stream"),//把多个流合并成一个流
    cssgrace = require("cssgrace"),
    path = require("path")
    
function sprites(){
    //精灵图
    // var yaml = require('js-yaml');
    gulp.task('sprites', function() {
        var spritesmith = require('gulp.spritesmith');
        var spriteData = gulp.src(path.join(srcPath.icon, "*.png")).pipe(spritesmith({
            imgName: 'welcome.png',
            imgPath: 'images/welcome.png',//合成的精灵图被最终发布的css引用的路径
            cssName: '_icon.less',
            cssFormat: 'less',
            cssTemplate: srcPath.iconTemplate
        }));
        /* 分别发布css文件和图片文件的情况 */
        var imgStream = spriteData.img.pipe(gulp.dest(localPath.image));
        var cssStream = spriteData.css.pipe(gulp.dest(localPath.less));

        /* 把single目录下的图片直接copy到发布目录下 */
        var copyStream = gulp.src(path.join(srcPath.icon, "*/*.png")).pipe(gulp.dest(localPath.image));

        /* 把sprite合成图和不需要合成的图片任务合并成一个流返回 */
        return mergeStream(imgStream, cssStream, copyStream);

        /* css文件和图片文件发布在同一路径下的情况 */
        // return spriteData.pipe(gulp.dest('less'));
    });
    return "sprites";
}
function prefixer(from, to){
    gulp.task('prefixer', function () {
        //autoprefixer 浏览器兼容插件，比如opacity，inline-block
        return gulp.src(from).pipe($.less())
            .pipe($.sourcemaps.init())
            .pipe($.postcss([$.autoprefixer({//自动浏览器前缀插件
                browsers: ["ie 9-11", "last 10 chrome versions", "last 10 ff versions"],
                cascade: true, //是否美化属性值 默认：true 像这样：
                remove: true //是否去掉不必要的前缀 默认：true
            })
                , cssgrace ]))

            // .pipe($.autoprefixer({//自动浏览器前缀插件
            //     browsers: ["ie 9-11", "last 10 chrome versions", "last 10 ff versions"],
            //     cascade: true, //是否美化属性值 默认：true 像这样：
            //     remove: true //是否去掉不必要的前缀 默认：true
            // }))
            // .pipe($.postcss([cssgrace]))
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(to));
    });
    return "prefixer";
}
function imagemin(from, to){
    gulp.task("imagemin", function(){
        return gulp.src(from)
            .pipe($.imagemin())
            .pipe(gulp.dest(to));
    });
    return "imagemin";
}
function svgSprite(){
    //精灵图
    gulp.task('svgSprite', function () {
        return gulp.src("src/images/banklogo/*.svg")
            .pipe($.svgSprite({
                shape: {
                    spacing: {
                        padding: 5
                    }
                },
                mode: {
                    css: {
                        dest: "./",
                        layout: "diagonal",
                        sprite: "a.svg",
                        bust: false,
                        render: {
                            scss: {
                                dest: "css/sprite.scss",
                                template: "src/sprite-template.txt"
                            }
                        }
                    }
                },
                variables: {
                    mapname: "icons"
                }
            }))
            .pipe(gulp.dest("dest"))
            .on("end", function(){
                console.log("end");
                gulp.src("dest/css/sprite.scss").pipe(require("gulp-sass")({outputStyle: 'expanded'})).pipe(gulp.dest("dest/css"));
            })
    });
    gulp.task('sprite', ['pngSprite']);

    return "svgSprite";
}
function svg2png(from, to){
    //把svg转成png
    gulp.task('svg2png', function() {
        return gulp.src(from)
            .pipe($.svg2png())
            .pipe($.size({
                showFiles: true
            }))
            .pipe(gulp.dest(to));
    });
    return "svg2png";
}
function copy(from, to){
    gulp.task('copy', function () {
        /**src指定路径，从第一个包含通配符的那部分开始，路径结构会被复制到dest指定的目录中
         * */
        return gulp.src(from || "src/**/*.{js,html}")
            .pipe(gulp.dest(to || 'copy'))
    });
    return "copy";
}
function uglifyjs(from, to){
    gulp.task('uglify', function () {
        return gulp.src(from || ["../恒慧融/web/Public/js/a.js"])
            .pipe($.uglifyjs(
                {
                    mangle: false,
                    compress: {
                        drop_console: true//清除console.log语句
                    },
                    output: {beautify: true}}))
            .pipe(gulp.dest(to || 'dest/'))
    });
    return "uglifyjs";
}
function fileInclude(){
    gulp.src(srcPath.jsp)
        .pipe($.fileInclude({
            prefix: '@@',
            basepath: '@file'//@root，被包含的文件的路径相对于gulp服务启动的路径；@file  被@@include包含的文件路径是相对于当前使用文件的路径
        }))
        .pipe($.replace(/"(static)/ig, "\"../$1")).pipe($.replace(/%time%/ig, function(){return new Date().getTime()}))
        .pipe(gulp.dest(distPath.jsp));
}

/* 热部署 */
function livereload(form, to){
    $.livereload.listen();
    gulp.src(from)
        .pipe($.fileInclude({
            prefix: '@@',
            basepath: '@file'//@root，被包含的文件的路径相对于gulp服务启动的路径；@file  被@@include包含的文件路径是相对于当前使用文件的路径
        }))
        .pipe(gulp.dest(to)).pipe($.livereload());
}

function sort(){
    var sort = require('gulp-sort');

    // default sort
    gulp.src('./src/js/**/*.js')
        .pipe(sort())
        .pipe(gulp.dest('./build/js'));

    // pass in a custom comparator function
    gulp.src('./src/js/**/*.js')
        .pipe(sort(function(file1, file2){//实现compare方法，返回1、0、-1
            if (file1.path.indexOf('build') > -1) {
                return 1;
            }
            if (file2.path.indexOf('build') > -1) {
                return -1;
            }
            return 0;
        }))
        .pipe(gulp.dest('./build/js'));

    // sort descending
    gulp.src('./src/js/**/*.js')
        .pipe(sort({
            asc: false
        }))
        .pipe(gulp.dest('./build/js'));

    // sort with a custom comparator
    gulp.src('./src/js/**/*.js')
        .pipe(sort({
            comparator: function(file1, file2) {
                if (file1.path.indexOf('build') > -1) {
                    return 1;
                }
                if (file2.path.indexOf('build') > -1) {
                    return -1;
                }
                return 0;
            }
        }))
        .pipe(gulp.dest('./build/js'));

    // sort with a custom sort function
    var stable = require('stable');
    gulp.src('./src/js/**/*.js')
        .pipe(sort({
            customSortFn: function(files, comparator) {
                return stable(files, comparator);
            }
        }))
        .pipe(gulp.dest('./build/js'));
    return "sort";
}