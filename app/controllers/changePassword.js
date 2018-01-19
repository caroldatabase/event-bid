app.controller('changePasswordCtrl',['$scope', '$rootScope', 'commonService', 'CONSTANTS', 'httpService', '$location', function ($scope, $rootScope, commonService, CONSTANTS, httpService, $location) {
    init();
    function init()
    {
        $scope.message = "";
        $scope.successIndicator = false;
        $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
        $scope.errorIndicator = false;
        $rootScope.loaderIndicator = false;
        $scope.passwordIndicator = false;
        $scope.checkEmail = checkEmail;
    }

    $scope.changePassword = function(form)
    {
        $scope.resetForm.$setSubmitted(true);
        if ($scope.resetForm.$valid) {
            $scope.passwordIndicator = false;
           
            if ($scope.cnfNewPassword === $scope.newPassword) {
                $rootScope.loaderIndicator = true;
                var userId = commonService.getUserid();
                httpService.changePassword(userId, $scope.oldPassword, $scope.newPassword).then(function (result) {
                    if (result.data.code != 500 || result.data.message == "Password changed successfully.") {
                        $rootScope.loaderIndicator = false;
                        $scope.oldPassword = "";
                        $scope.newPassword = "";
                        $scope.cnfNewPassword = "";
                        $scope.successIndicator = true;
                        commonService.deleteCookieValues('FirstName');
                        commonService.deleteCookieValues('UserID');
                        commonService.deleteCookieValues('UserType');
                        $rootScope.isLogin = false;
                        $rootScope.adminIndicator = false;
                        commonService.reloadRoute();
                        $location.path('/');
                        $('#promptLoginPopup').modal('toggle');
                        $("#promptLoginPopup").modal({ backdrop: "static" });
                        $('#promptLoginPopup').modal('show');
                    }
                    else {
                        $rootScope.loaderIndicator = false;
                        $scope.errorIndicator = true;
                        $scope.message = "Something went wrong. Please try again after some time. "
                    }
                });
            }
            else {
                $scope.message = "New Password and Confirm new Password are not same.";
                $scope.errorIndicator = true;
                $scope.passwordIndicator = true;
            }
        }
        else {
            $scope.message = CONSTANTS.ERRORMESSAGE.REQUIREDFIELDERROR;
            $scope.errorIndicator = true;
            
        }

    }

    function checkEmail(form) {
        if (form.$error.pattern) {
            $scope.emailIndicator = true;
        }
        else
            $scope.emailIndicator = false;
    }
}]);