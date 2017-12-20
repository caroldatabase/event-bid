app.controller('paymentCtrl', function ($scope, $rootScope, httpService, commonService) {
    init();
    function init() {
        $scope.user = {};
        $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
        $scope.errorMessageIndicator = false;
        commonService.scrollToTop();
        getMonth();
        getYear();
    }

    function getMonth()
    {
        $scope.montharray = [];
        for (var i = 1; i <= 12; i++)
        {
            var month = '';
            if (i >= 1 && i <= 9)
                month = "0" + i;
            else
                month = i;
            $scope.montharray.push(month);
                
        }
    }

    function getYear() {
        $scope.yeararray = [];
        for (var i = 2018; i <= 2035; i++) {
               
            $scope.yeararray.push(i);

        }
    }

    $scope.makePayment = function()
    {
        $scope.paymentForm.$setSubmitted(true);
        if ($scope.paymentForm.$valid) {
            $rootScope.loaderIndicator = true;
           /* $scope.user = {
                userId : "5",
                taskId : "10",
                amount : "20.00",
                firstName: "k",
                lastName : "roy",
                cardNumber : "4111111111111111",
                cvv : "123",
                month : "12",
                year : "2021"
            };*/
            $scope.user.userId = "5";
            $scope.user.taskId = "10";
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
                $scope.message = "Something went wrong !!";
            }
        }
    }
});