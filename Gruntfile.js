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
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'bower.json'], // '-a' for all files
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bump');
  
  grunt.registerTask('default', ['jshint', 'uglify']);

}

