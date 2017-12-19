app.controller("blogDetailCtrl", function ($scope, $rootScope, httpService) {
    init();

    function init() {
        getAllBlogs();
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