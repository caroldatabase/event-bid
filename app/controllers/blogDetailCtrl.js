app.controller("blogDetailCtrl", function ($scope, $rootScope, httpService, commonService) {
    init();

    function init() {
        getAllBlogs();
        commonService.scrollToTop();
    }

    function getAllBlogs() {
        $rootScope.loaderIndicator = true;
        httpService.getAllBlogs().then(function (response) {
            $scope.blogList = response.data.data;
            console.log($scope.blogList)
            $rootScope.loaderIndicator = false;
        });
    }
});