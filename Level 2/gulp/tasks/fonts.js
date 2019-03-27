module.exports = function() {
    $.gulp.task("fonts", function() {
        return $.gulp.src("./src/fonts/**/*.ttf")
            .pipe($.gulp.dest("./dest/fonts/"))
            .pipe($.debug({"title": "fonts"}))
            .on("end", $.browsersync.reload);
    });
};
