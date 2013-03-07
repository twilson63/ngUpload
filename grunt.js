var src = ['ng-upload.js'];

module.exports = function(grunt) {
  grunt.initConfig({
    lint: {
      files: src
    },
    min: {
      adherence: {
        src: ['ng-upload.js'],
        dest: 'ng-upload.min.js'
      }
    },
    watch: {
      scripts: {
        files: 'ng-upload.js',
        tasks: ['lint','min'],
        options: {
          interrupt: true
        }
      }
    }
  });
  grunt.registerTask('default', 'lint min');

}

