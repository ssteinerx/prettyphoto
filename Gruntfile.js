/*

Tasks

*/

module.exports = function(grunt) {

	// 1. All configuration goes here 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		jshint: {
			files: ['Gruntfile.js', 'js/jquery.prettyPhoto.js'],
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
					'js/jquery.prettyPhoto.js'
				],
				dest: 'js/dist/jquery.prettyPhoto.concat.js'
			}
        },

		uglify: {
			build: {
				src: 'js/dist/jquery.prettyPhoto.concat.js',
				dest: 'js/dist/jquery.prettyPhoto.min.js'
			}
		},
		
		watch: {
			scripts: {
				files: ['js/*.js'],
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
	grunt.registerTask('default', ['newer:jshint', 'newer:concat', 'newer:uglify', 'watch']);

};
