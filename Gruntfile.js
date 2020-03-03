// powershell -ExecutionPolicy ByPass grunt --force
// powershell -ExecutionPolicy ByPass grunt bake
module.exports = function (grunt) {

    grunt.registerTask('deafult', function () {
        console.log("gg")
    });


    grunt.initConfig({
        bake: {
            target: {
                files: {
                    // to index.html : from (file with  <!--(bake XX.html)-->)
                    "public/index.html": "public/prod/index.html",
                    "public/gamepage.html": "public/prod/gamepage.html",
                }
            },
        },
        watch: {
            scripts: {
                files: ['public/prod/*.html'],
                tasks: ['bake']
            }
        }
    })

    grunt.loadNpmTasks('grunt-bake')
    grunt.loadNpmTasks('grunt-contrib-watch')

}