module.exports = function (grunt) {
    grunt.initConfig({
            uglify: {
                js: {
                    files: {
                        'build/jquery.preview.img.min.js': [
                            'jquery.preview.img.js'
                        ]
                    }
                }
            },
            cssmin: {
                combine: {
                    files: {
                        'build/jquery.preview.img.min.css': [
                            'jquery.preview.img.css'
                        ]
                    }
                }
            },
            copy: {
                main: {
                    files: [
                        {expand: true, src: ['jquery.preview.img.js'], dest: 'src/', filter: 'isFile'},
                        {expand: true, src: ['jquery.preview.img.css'], dest: 'src/'},
                        {expand: true, src: ['jquery.preview.img.js'], dest: 'build/', filter: 'isFile'},
                        {expand: true, src: ['jquery.preview.img.css'], dest: 'build/'}
                    ]
                }
            }
        }
    );
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', [ 'uglify', 'cssmin','copy']);

};