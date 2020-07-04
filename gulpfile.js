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

gulp.task('webpack', (cb) => {
  return exec('npm run dev', (err, stdout, stderr) => {
    console.log(stdout)
    if (err) {
      return err
    }
    cb()
  })
})

gulp.task('copyFile', () => {
  return gulp.src('dist/coco.js').pipe(gulp.dest('tools/demo/Coco/'))
})



gulp.task("dev", gulp.series('clean', 'webpack', 'copyFile'))
