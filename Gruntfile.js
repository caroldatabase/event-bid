 module.exports = function (grunt) {
    grunt.initConfig({
        // cssmin: {
        //     options: {
        //         shorthandCompacting: false,
        //         roundingPrecision: -1
        //     },
        //     target: {
        //         files: {
        //             'app/css/eventbid.min.css': [
        //                 'app/css/bootstrap.css',
        //                 'app/css/bootstrap-theme.css',
        //                 'app/css/owl.carousel.css',
        //                 'app/css/style.css',
        //                 'app/css/vaibhav_style.css',
        //                 'app/css/bootstrap-datetimepicker.css',
        //                 'app/css/select2.min.css'
        //             ]
        //         }
        //     }
        // },

        uglify: {
            my_target: {
                files: {
                    'app/js/eventbid.min.js': [
                        'app/app.js',
                         "app/js/uniquefilter.js",
                         "app/js/timeago.filter.js", 
                         "app/services/constants.js", 
                         "app/services/commonService.js", 
                         "app/services/httpService.js" ,
                         "app/directives/fileReadDirective.js" ,
                         "app/controllers/dashBoardController.js", 
                         "app/controllers/loginController.js",
                         "app/controllers/postTaskController.js" ,
                         "app/controllers/aboutusController.js" ,
                         "app/controllers/profileController.js" ,
                         "app/directives/eventMenu/eventMenu.js" ,
                         "app/controllers/updateProfileController.js" ,
                         "app/controllers/addCategoryController.js" ,
                         "app/controllers/EBManagerController.js" ,
                         "app/controllers/contactUsController.js" ,
                         "app/controllers/howItWorksController.js" ,
                         "app/controllers/rewardsController.js" ,
                         "app/controllers/requestCategoryController.js" ,
                         "app/controllers/adminController.js" ,
                         "app/controllers/browseTaskController.js" ,
                         "app/controllers/customerDashboardCtrl.js" ,
                         "app/controllers/buisnessDashboardController.js" ,
                         "app/controllers/addBlogController.js" ,
                         "app/controllers/settingsCtrl.js" ,
                         "app/controllers/changePassword.js", 
                         "app/controllers/paymentCtrl.js" ,
                         "app/controllers/messagingCtrl.js",
                         "app/controllers/blogDetailCtrl.js"
                    ]
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.registerTask('default', ['cssmin', 'uglify']);
    grunt.registerTask('default', ['uglify']);
};
