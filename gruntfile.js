module.exports = function(grunt) {

  var jsTimestamped = 'dist/combine.js';
  var cssTimestamped = 'dist/combine.css';
  var timeStamp = '150910';

  grunt.initConfig({
    concat: {
      options: {
        globals: {
          jQuery: true
        },
        banner: "/*@version " + timeStamp + "*/\n"
      },
      distjs:{
        src: [ 'lib/**/*.js', 'src/**/*.js'],
        dest: jsTimestamped
      },
      distcss:{
        src: ['src/**/*.css', 'lib/**/*.css'],
        dest: cssTimestamped
      }
    },
    watch: {
      files: ['src/**/*.js', 'src/**/*.css'],
      tasks: ['concat']
    }
  });



  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['concat']);

};
