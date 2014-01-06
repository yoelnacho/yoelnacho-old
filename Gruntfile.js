module.exports = function(grunt){

	//levantar servidor
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	miappConfig = {
		path: 'webapp/',
	    cssDir: 'webapp/static/css',
	    sassDir: 'webapp/sass',
	    devUrl: 'miapp.vm',
	    port: 9000
	  };

	grunt.initConfig({
		webapp: miappConfig,

		connect: {
			server: {
				options: {
					port: '<%= webapp.port %>',
					base: '<%= webapp.path %>'
				}
			}
		},

		watch: {   
			options: {
    			livereload: true,
			},
			all: {
				files: '<%= webapp.path %>/index.html'
			},   
      		compass: {
	        	files: ['<%= webapp.sassDir %>/**/*.{scss,sass}'],
	        	tasks: ['compass:server'],
	      	},
	      	css: {
	        	files: ['<%= webapp.sassDir %>/style.css'],
	      	}
	    },

		compass: {
			options: {
				require: ['sass-globbing', 'singularitygs'],
				cssDir: '<%= webapp.cssDir %>',
				sassDir: '<%= webapp.sassDir %>',
				relativeAssets: true,
				force: true
			},
			dist: {
				options: {
			  		outputStyle: 'compress',
			  		environment: 'production'
				}
			},
			server: {
				options: {
			  		outputStyle: 'expand',
			  		noLineComments: true,
			  		debugInfo: false
				}
			}
		}


	});

	grunt.task.registerTask('default', ['connect', 'compass:server', 'watch']);
	grunt.task.registerTask('deploy', ['connect', 'compass:dist']);

};