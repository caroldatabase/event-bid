app.controller("blogDetailCtrl", function ($scope, $rootScope, httpService, commonService, $routeParams) {
    init();

    function init() {
        getAllBlogs();
        commonService.scrollToTop();
        
    }

    function getAllBlogs() {
        $rootScope.loaderIndicator = true;
        httpService.getAllBlogs().then(function (response) {
            $scope.blogList = response.data.data;
            console.log($scope.blogList);
            var blogTitle = $routeParams.blogTitle;
            if (blogTitle) {
                for (var i = 0; i < $scope.blogList.length; i++)
                {
                    if (blogTitle == $scope.blogList[i].blog_title)
                    {
                        $scope.blog = $scope.blogList[i];
                    }
                }
            }
            $rootScope.loaderIndicator = false;
        });
    }

    $scope.formatDate = function (date) {
        var dateOut = new Date(date);
        return dateOut;
    };
});