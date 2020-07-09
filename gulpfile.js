const gulp = require('gulp')
const path = require('path')
const del = require('del')
const exec = require('child_process').exec

function defaultTask(cb) {
  cb();
}

gulp.task('clean', async () => {
  await del(['dist/**/*'])
})

gulp.task('webpack dev', (cb) => {
  return exec('npm run dev', (err, stdout, stderr) => {
    console.log(stdout)
    if (err) {
      return err
    }
    cb()
  })
})

gulp.task('webpack build', (cb) => {
  return exec('npm run build', (err, stdout, stderr) => {
    console.log(stdout)
    if (err) {
      return err
    }
    cb()
  })
})

gulp.task('copyFile', () => {
  return gulp.src('dist/coco-miniprogram.js').pipe(gulp.dest('tools/demo/'))
})



gulp.task("dev", gulp.series('clean', 'webpack dev', 'copyFile'))

gulp.task("build", gulp.series('clean', 'webpack build', 'copyFile'))
