var src = ['ng-upload.js'];

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: src
    },
    uglify: {
      ngUpload: {
        src: ['ng-upload.js'],
        dest: 'ng-upload.min.js'
      }
    },
    watch: {
      scripts: {
        files: 'ng-upload.js',
        tasks: ['jshint','min'],
        options: {
          interrupt: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'uglify']);

}

