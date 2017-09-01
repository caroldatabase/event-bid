var app = angular.module('eventBid', ['ngRoute', 'ui.bootstrap', 'ngCookies']);

window.fbAsyncInit = function () {
    FB.init({
        appId: '791838100968348',
        xfbml: true,
        version: 'v2.8'
    });
    FB.AppEvents.logPageView();
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


app.config(function ($routeProvider) {
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
         .when("/categories", {
             templateUrl: "app/views/Category.html",

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
            templateUrl: "app/views/profile.html",
            controller : "profileController"
        })
         .when("/admin", {
             templateUrl: "app/views/admin.html",
             controller: "adminCtrl"
         })
        .when("/customer-dashboard", {
            templateUrl: "app/views/customer-dashboard.html",
            controller: "customerDashboardCtrl"
        })
        .when("/buisness-dashboard", {
            templateUrl: "app/views/business-dashboard.html",
            controller: "buisnessDashboardCtrl"
        })
    .otherwise({
        redirect: '/'
    });
    //angular.element('head').append('<base href="/">');
    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: true
    //});

});

app.config(function ($httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
});