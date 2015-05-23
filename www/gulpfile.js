use strict;

var gulp = require('gulp');
var rsync = require('gulp-rsync');
var YAML = require('yamljs');
var exec = require('child_process').exec;

var settings = YAML.load('secret.yml');
 
gulp.task('deploy', function(cb) {
  return gulp.src('www/**')
    .pipe(rsync({
      root: '/',
      hostname: '198.199.72.227',
      destination: '/var/www/vedtopkar.com/site'
    }));
  cb()
});

gulp.task('compile', ['deploy'], function(cb){
  return exec('harp compile', function(err){
    if(err) return cb(err);
    cb();
  });
});