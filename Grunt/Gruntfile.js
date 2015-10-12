module.exports = function(grunt) {
  require('time-grunt')(grunt);

  var PathConfig = {
    build: 'build',
    dist: 'markup'
  };

  grunt.initConfig({

    config: PathConfig,

    clean: {
      build: ['build'],
    },

    watch: {
      css: {
        files: ['<%= config.dist %>/scss/*.scss'],
        tasks: ['sass:dev'],
        options: {
          spawn: false,
        },
      },

      js:{
        files: ['<%= config.dist %>/js/vendor/*.js'],
        tasks: ['uglify:js'],
        options: {
          spawn: false,
        },
      },

      html: {
        files: ['<%= config.dist %>/*.html'],
        tasks: ['copy'],
        options: {
          spawn: false,
        },
      },

      images: {
        files: ['<%= config.dist %>/images/*.*'],
        tasks: [/*'img:jpg', 'newer:pngmin:all', 'newer:svgmin'*/ 'newer:copy:images', 'sprite'],
        options: {
            spawn: false
        }
      },
    },

    sass: {
      // Dev settings
      dev: {
        options: {
            style: 'nested',
            sourcemap: true
        },
        files: [{
            expand: true,
            cwd: '<%= config.dist %>/scss/',
            src: ['*.scss'],
            dest: '<%= config.dist %>/css/',
            ext: '.css',
        }],
      },

      // Production settings
      prod: {
          options: {
              style: 'compressed',
              sourcemap: false
          },
          files: [{
              expand: true,
              cwd: '<%= config.dist %>/scss/',
              src: ['*.scss'],
              dest: '<%= config.build %>/css/',
              ext: '.css',
          }],
      },
    },

    copy: {
      main: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>/',
          src: [
            '*.html',
            'js/**',
            '!scss/**',
            '!css/**',
          ],
          dest: '<%= config.build %>/',
        }],
      },

      images: {
        expand: true,
        cwd: '<%= config.dist %>/images/',
        src: '**',
        dest: '<%= config.build %>/images/',
        //flatten: true,
        filter: 'isFile',
      },

      cssSprite: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>/',
          src: [
            'css/sprite.css'
          ],
          dest: '<%= config.build %>/',
        }],
      },

    },

    imagemin: {                          
      static: {                         
        files: [{
          expand: true,                  
          cwd: '<%= config.dist %>/images/',                   
          src: ['**/*.{png,jpg,gif}'],   
          dest: '<%= config.build %>/images/'                  
        }]
      }
    },

    sprite: {
      cssOpts: {
        src: ['<%= config.dist %>/images/sprites/*.png'],
        dest: '<%= config.dist %>/images/sprite.png',
        destCss: '<%= config.dist %>/css/sprite.css',
        algorithm: 'top-down',
        cssVarMap: function (sprite) {
          sprite.name = sprite.name.replace('sprite', 'icon');
        },
      },
    },

    uglify: {
      js: {
        files: {
          '<%= config.dist %>/js/output.min.js': ['<%= config.dist %>/vendor/js/*.js']
        }
      }
    }
  });

  // Load all grunt task, or add it by handmade - npm install
  // require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-spritesmith');

  grunt.registerTask('default', ['sass:dev', 'watch']);

  grunt.registerTask('imgmin', ['newer:imagemin:static']);

  grunt.registerTask('js', ['uglify']);

  grunt.registerTask('prod', ['sass:prod', 'imagemin:static', 'uglify:js', 'copy:main', 'copy:cssSprite']);

};