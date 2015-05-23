var gulp = require('gulp');
var rsync = require('gulp-rsync');
var YAML = require('yamljs');
var exec = require('child_process').exec;

var settings = YAML.load('secret.yml');
 
gulp.task('compile', function(cb){
  return exec('harp compile', function(err){
    if(err) return cb(err);
    cb();
  });
});


gulp.task('deploy', ['compile'], function() {
  return gulp.src('./www/**')
    .pipe(rsync({
      root: './www',
      hostname: settings['hostname'],
      destination: '/var/www/vedtopkar.com/site'
    }));
});