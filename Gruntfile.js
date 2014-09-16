module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jade: {
			options: {
				pretty: true
			},
			compile: {
				files: [{
					expand: true,
					cwd: 'public/',
					src: '*.jade',
					dest: 'public/',
					ext: '.html'
				}]
			}
		},
		stylus: {
			options: {
				compress: false
			},
			complie: {
				dest: "public/css/style.css",
				src: "public/css/*.styl"
			}
		},
		watch: {
			css: {
				files: 'public/css/*.styl',
				tasks: ['stylus']
			},
			jade: {
				files: 'public/*.jade',
				tasks: ['jade']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');
	/**
	 * Default Task
	 */
	grunt.task.registerTask('default', ['jade', 'stylus', 'watch']);
};