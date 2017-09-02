app.controller("addBlogController", ['$scope', 'httpService', '$rootScope', function ($scope, httpService, $rootScope) {

    $scope.addNewBlog = addNewBlog;
    $scope.ModalClose = ModalClose;

    init();
    function init() {
        $scope.blog = {};
    }
    function addNewBlog() {
        $scope.addBlogForm.$setSubmitted(true);
        if ($scope.addBlogForm.$valid) {
            $rootScope.loaderIndicator = true;
            httpService.addBlog($scope.blog).then(function (data) {
                if (data.data.message == 'Blog created successfully.') {
                    $rootScope.loaderIndicator = false;
                    $scope.successMessageIndicator = true;
                    $scope.ErrorIndicator = false;
                    $scope.message = "Blog added successfully.";
                    $scope.category = {};
                    $('#blogHeading').val("");
                    $('#blogHeaderImage').val("");
                    $('#blogDescription').val("");
                    $rootScope.$broadcast("addedBlogs", function () {
                    });
                }
                else {
                    if (data.data.message == "Request URL not available") {
                        $rootScope.loaderIndicator = false;
                        $scope.message = "Something went wrong. Technical issues."
                        $scope.ErrorIndicator = true;
                    }
                }
            });
        }
        else {
            $scope.message = "Please enter blog name."
            $scope.ErrorIndicator = true;
            $scope.successMessageIndicator = false;
        }
    }

    function ModalClose() {
        $scope.category = {};
        $scope.ErrorIndicator = false;
        $scope.successMessageIndicator = false;
        angular.element('#blogHeading').removeClass('error');
    }


}]);