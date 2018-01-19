app.controller('requestCategoryCtrl',[ '$scope', '$rootScope', 'commonService', 'httpService',
    function ($scope, $rootScope, commonService, httpService) {
    init();

    function init()
    {
        commonService.scrollToTop();
        $scope.reqUser = {};
        $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
    }

    $scope.requestCategory = function ()
    {
        $scope.requestCategoryForm.$setSubmitted(true);
        if ($scope.requestCategoryForm.$valid) {
            $rootScope.loaderIndicator = true;
            httpService.newEBCategory($scope.reqUser).then(function (result) {
                $rootScope.loaderIndicator = false;
                commonService.scrollToTop();
                $scope.requestCategoryForm.$setPristine();
                $scope.requestCategoryForm.$setUntouched();
                $scope.successMessageIndicator = true;
                $scope.errorMessageIndicator = false;
                $scope.message = "Category request submitted successfully.We will get back to you shortly.";
                $scope.reqUser = {};
            });
        }
        else {
            commonService.scrollToTop();
            if ($scope.requestCategoryForm.$error.required) {
                $scope.errorMessageIndicator = true;
                $scope.message = "Please enter required fields";
            }
            else if ($scope.requestCategoryForm.$error.pattern) {
                $scope.errorMessageIndicator = true;
                $scope.message = "Please enter valid email-id.";
            }
        }
    }

    $scope.countChar = function ()
    {
        if ($scope.reqUser.whyNeedCategory)
        {
            var len = $scope.reqUser.whyNeedCategory.length;
            if (len >= 5000) {
                $scope.reqUser.whyNeedCategory = $scope.reqUser.whyNeedCategory.substring(0, 5000);
            } else {
                $('#charNum').text(5000 - len);
            }
        }
        else
             $('#charNum').text(5000);
    }
}]);