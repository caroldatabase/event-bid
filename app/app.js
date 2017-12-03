﻿


var app = angular.module('eventBid', ['ngRoute', 'ui.bootstrap', 'ngCookies']);
//angular.module('chat').constant('config', {
//    rltm: {
//        service: "pubnub",
//        config: {
//            publishKey: 'pub-c-c67e90d8-d2be-4dcf-9d47-1779b018b0da',
//            subscribeKey: 'sub-c-b96af96e-d32a-11e7-b83f-86d028961179'
//        }

//    }
//});
/*angular.module('chat').constant('config', {
    rltm: {
        service: "pubnub",
        config: {
           // publishKey: 'pub-c-c67e90d8-d2be-4dcf-9d47-1779b018b0da',
           // subscribeKey: 'sub-c-b96af96e-d32a-11e7-b83f-86d028961179',
            publishKey: "demo",
            subscribeKey: "demo"
        }
        // or use socket.io!
        // https://github.com/pubnub/rltm.js#socketio
    }
});*/
//window.fbAsyncInit = function () {
//    FB.init({
//        appId: '791838100968348',
//        xfbml: true,
//        status: true,
//        cookie: true,
//        version: 'v2.8'
//    });
//    //FB.AppEvents.logPageView();
//};

//(function (d, s, id) {
//    var js, fjs = d.getElementsByTagName(s)[0];
//    if (d.getElementById(id)) { return; }
//    js = d.createElement(s); js.id = id;
//    js.src = "//connect.facebook.net/en_US/sdk.js";
//    fjs.parentNode.insertBefore(js, fjs);
//}(document, 'script', 'facebook-jssdk'));


app.config(function ($routeProvider,$locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/views/dashBoard.html",
            controller: "dashBoardController"
        })
        .when("/how-it-works", {
            templateUrl: "app/views/how-it-works.html",
            controller: "howItWorksCtrl"
        })
        .when("/add-category", {
            templateUrl: "app/views/request-a-category.html",
            controller: "requestCategoryCtrl"

        })
        .when("/browse-tasks", {
            templateUrl: "app/views/browseTasks.html",
            controller: "browseTaskCtrl"
        })
        .when("/browse-tasks/:categoryName?/:categoryId?", {
            templateUrl: "app/views/browseTasks.html",
            controller: "browseTaskCtrl"
        })
        .when("/EBManager", {
            templateUrl: "app/views/EBManager.html",
            controller: "EBManagerCtrl"
        })
        .when("/Rewards", {
            templateUrl: "app/views/Rewards.html",
            controller: "rewardsCtrl"
        })
        .when("/post-task", {
            templateUrl: "app/views/post-task.html",
            controller : "postTaskController"

        })
    
            .when("/about-us", {
                templateUrl: "app/views/sitemap/about-us.html",
                controller : "aboutusController"
            })
         //.when("/categories", {
         //    templateUrl: "app/views/Category.html",

         //})
         .when("/settings", {
             templateUrl: "app/views/settings.html",
             controller: "settingsCtrl",
             resolve: {
                 
             }
         })
         .when("/blog", {
             templateUrl: "app/views/Rewards.html",

         })
        .when("/contact-us", {
            templateUrl: "app/views/contact-us.html",
            controller: "contactUsCtrl"
        })
        .when("/FAQ's", {
            templateUrl: "app/views/Rewards.html",

        })
        .when("/profile", {
            templateUrl: "app/views/profile-page.html",
            controller : "profileController"
        })
          .when("/profile/:userId?", {
              templateUrl: "app/views/profile-page.html",
              controller: "profileController"
          })
         .when("/admin", {
             templateUrl: "app/views/admin.html",
             controller: "adminCtrl"
         })
       
        .when("/my-dashboard", {
            templateUrl: "app/views/businessDashboard.html",
            controller: "buisnessDashboardCtrl"
        })
        .when("/change-password", {
            templateUrl: "app/views/changePassword.html",
            controller: "changePasswordCtrl"
        })
    .otherwise({
        redirect: '/'
    });
    //$locationProvider.html5Mode(true);

    //angular.element('head').append('<base href="/">');
    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: true
    //});

$locationProvider.hashPrefix('');
});


app.config(function ($httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
});

app.run( function($rootScope, $location) {

    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        if (next.templateUrl == "app/views/settings.html" || next.templateUrl == "app/views/businessDashboard.html" || next.templateUrl == "app/views/customerDashboard.html" || next.templateUrl == "app/views/post-task.html") {
            if ($rootScope.isLogin == false) {
                $('#promptLoginPopup').modal('show');
                $location.path('/');
            } 
        }         
    });
})

/*app.run(['Pubnub', 'currentUser',  function (Pubnub, currentUser) {
    Pubnub.init({
        publish_key: 'pub-c-c67e90d8-d2be-4dcf-9d47-1779b018b0da',
        subscribe_key: 'sub-c-b96af96e-d32a-11e7-b83f-86d028961179',
        uuid: currentUser
    });
}]);
*/