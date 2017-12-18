app.controller('paymentCtrl', function ($scope, $rootScope, httpService) {
    $scope.makePayment = function()
    {
        $scope.paymentForm.$setSubmitted(true);
        if ($scope.paymentForm.$valid) {
            $rootScope.loaderIndicator = true;
            httpService.makePayment($scope.user).then(function (result) {
                $rootScope.loaderIndicator = false;
                commonService.scrollToTop();
                $scope.paymentForm.$setPristine();
                $scope.paymentForm.$setUntouched();
                $scope.successMessageIndicator = true;
                $scope.errorMessageIndicator = false;
                $scope.message = "Payment done successfully.";
                $scope.user = {};
            });
        }
        else {
            if ($scope.paymentForm.$error.required) {
                $scope.errorMessageIndicator = true;
                $scope.message = "Please enter required fields.";
            }
            else {
                $scope.errorMessageIndicator = true;
                $scope.message = "Your card number is wrong.";
            }
        }
    }
});