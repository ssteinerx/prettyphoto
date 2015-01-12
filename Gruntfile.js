/*

Tasks

*/

module.exports = function(grunt) {

	// 1. All configuration goes here 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		postcss: {
			options: {
				map: true,
				processors: [
					require('autoprefixer-core')({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']}).postcss
				]
			},
			dist: {
				src: 'assets/css/*.css'
			}
		},

		cssmin: {
			combine: {
				files: {
					'assets/css/dist/prettyPhoto.min.css': [
						'assets/css/prettyPhoto.css'
					]
				}
			}
		},
		
		jshint: {
			files: ['Gruntfile.js', 'assets/js/jquery.prettyPhoto.js'],
			options: {
				curly:				true,
				eqeqeq:				true,
				immed:				true,
				latedef:			false,
				newcap:				true,
				noarg:				true,
				sub:					true,
				undef:				false,
				boss:					true,
				eqnull:				true,
				browser:			true,
				multistr:			true,

				globals: {
					// AMD
					module:     true,
					require:    true,
					requirejs:  true,
					define:     true,

					// Environments
					console:    true,

					// General Purpose Libraries
					$:          true,
					jQuery:     true,
					ga:         true,

					// Testing
					sinon:      true,
					describe:   true,
					it:         true,
					expect:     true,
					beforeEach: true,
					afterEach:  true
				}
			}
		},

		concat: {
			js: {
				src: [
					'assets/js/jquery.prettyPhoto.js'
				],
				dest: 'assets/js/dist/jquery.prettyPhoto.concat.js'
			}
        },

		uglify: {
			build: {
				src: 'assets/js/dist/jquery.prettyPhoto.concat.js',
				dest: 'assets/js/dist/jquery.prettyPhoto.min.js'
			}
		},
		
		watch: {
			css: {
				files: ['assets/css/*.css'],
				tasks: ['postcss', 'cssmin'],
				options: {
					spawn: false
				}
			},

			scripts: {
				files: ['assets/js/*.js'],
				tasks: ['jshint', 'concat', 'uglify'],
				options: {
					spawn: false
				}
			}
		}

	});

	// 3. Where we tell Grunt we plan to use this plug-in.
	require('load-grunt-tasks')(grunt);

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', ['newer:postcss', 'newer:cssmin', 'newer:jshint', 'newer:concat', 'newer:uglify', 'watch']);

};
