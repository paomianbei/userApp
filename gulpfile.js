/**
 * Created by weikaiwei on 2016/10/11.
 */
var gulp = require("gulp"), path = require("path"), fs = require("fs"), $ = require("gulp-load-plugins")();
module.exports = function(){
    gulp.task("staticWatch", function(){
        $.connect.server({
            host: "l", // 默认localhost
            port: "80", // 默认8000
            root: ["dist/page", "dist"], // 指定项目主目录，多个使用数组
            livereload: true //自动刷新
        });
        copyStatic("src", "dist");
    });
    //重新打包编译bootstrap的样式
    gulp.task("bootstrap", function(){
        gulp.task("bootstrap.less", function(){
            gulp.src("src/bootstrap/all/bootstrap.less")
                .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
                .pipe($.sourcemaps.init())
                .pipe($.less())
                .pipe($.csscomb())
                .pipe($.csso({
                    restructure: true, // 优化css写法
                    sourceMap: true // 与gulp-sourcemaps一起使用，设置成false将不会生成map文件
                    // debug: true // 输出调试日志
                }))
                .pipe($.sourcemaps.write("."))
                .pipe($.rename("bootstrap.min.css"))
                .pipe(gulp.dest("dist/static/golbal/css"));
        });
        gulp.watch("src/bootstrap/all/**/*.less", ["bootstrap.less"]);
    });
};
module.exports();
function copyStatic(copyFrom, distTo){
    gulp.watch([path.join(copyFrom, "**/*"), `!${path.join(copyFrom, "**/!*")}`, `!${path.join(copyFrom, "**/*.{sass,scss,styl,es6,vue,mustache}")}`], function(e){
            var ext = path.extname(e.path), basename = path.basename(e.path), type = e.type,//type: "changed"、"delete"、"added"
                reg = new RegExp(path.join(copyFrom, path.sep).replace(/\\/g, "\\\\") + "(.+)\\\\(\\..*)?"),
                matches = e.path.match(reg), pre = matches && matches[1] || "",
                distPath = path.join(distTo, pre);
        if(type != "delete"){
            try{
                if(fs.statSync(e.path).isDirectory())return;
            }catch (e){
                return;
            }
            var pipe, loginfo = 'staticWatch: from "' + e.path + ' to "' + distPath + '"';
            switch(ext){
                case ".less":
                    if(!basename.startsWith("_")){
                        pipe = gulp.src(e.path)
                            .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')})) // 异常处理
                            .pipe($.sourcemaps.init())
                            .pipe($.less())
                            .pipe($.csscomb())
                            .pipe($.csso({
                                restructure: true, // 优化css写法
                                sourceMap: true // 与gulp-sourcemaps一起使用，设置成false将不会生成map文件
                                // debug: true // 输出调试日志
                            }))
                            // .pipe($.replace(/(font-(?:(?:size)|(?:family))\s*:[\s\S]*?)(\d+)px/ig, function(a, b, c){
                            .pipe($.replace(/(\d+)pt/ig, function(a, b, c){
                                return (b / 100) + "rem";
                            }))
                            .pipe($.sourcemaps.write("."))
                            .pipe(gulp.dest(distPath));
                    }else{
                        loginfo = "";
                    }
                    break;
                case ".jsp":case ".html":
                    pipe = gulp.src(e.path)
                        .pipe($.fileInclude({
                            prefix: '@@',
                            basepath: '@root'//@root，被包含的文件的路径相对于gulp服务启动的路径；@file  被@@include包含的文件路径是相对于当前使用文件的路径
                        }))
                        .pipe($.replace(/\$\{rc.contextPath\}/ig, ".."))
                        .pipe(gulp.dest(distPath));
                    break;
                case ".png":case ".gif":case ".jpg":case ".bmp":
                    pipe = gulp.src(e.path)
                        .pipe($.imagemin({
                            optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
                            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
                        }))
                        .pipe(gulp.dest(distPath));
                    break;
                default:
                    pipe = gulp.src(e.path).pipe(gulp.dest(distPath));
            }
            console.log(loginfo);
            pipe && pipe.pipe($.connect.reload());
        }
    });
}