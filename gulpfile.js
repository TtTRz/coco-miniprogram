// const gulp = require('gulp')
//
// const clean = require('gulp-clean')
//
// const config = require('./tools/config')
// const BuildTask = require('./tools/build')
// const id = 'miniprogram-custom-component'
//
// new BuildTask(id, config.entry)
//
// gulp.task('clean', gulp.series(() => gulp.src(config.distPath, {read: false, allowEmpty: true}).pipe(clean()), done => {
//   if (config.isDev) {
//     return gulp.src(config.demoDist, {read: false, allowEmpty: true})
//       .pipe(clean())
//   }
//   return done()
// }))
// gulp.task('watch', gulp.series(`${id}-watch`))
// gulp.task('dev', gulp.series(`${id}-dev`))
