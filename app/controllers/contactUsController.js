app.controller('contactUsCtrl', function ($scope, commonService, httpService, $rootScope) {
    init();
    function init()
    {
        $scope.user = {};
        $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
        $scope.errorMessageIndicator = false;
        commonService.scrollToTop();
    }

    $scope.contactUs = function()
    {
        $scope.contactusForm.$setSubmitted(true);
        if ($scope.contactusForm.$valid) {
            $rootScope.loaderIndicator = true;
            httpService.contactus($scope.user).then(function (result) {
                $rootScope.loaderIndicator = false;
                commonService.scrollToTop();
                $scope.contactusForm.$setPristine();
                $scope.contactusForm.$setUntouched();
                $scope.successMessageIndicator = true;
                $scope.errorMessageIndicator = false;
                $scope.message = "Enquiry submitted successfully.We will get back to you shortly.";
                $scope.user = {};
            });
        }
        else {
            if ($scope.contactusForm.$error.required) {
                $scope.errorMessageIndicator = true;
                $scope.message = "Please enter required fields";
            }
            else
            {
                $scope.errorMessageIndicator = true;
                $scope.message = "Please enter valid email-id.";
            }
        }

    }
});