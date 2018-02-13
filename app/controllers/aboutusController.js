app.controller("aboutusController", ['commonService', function (commonService) {
    commonService.scrollToTop();


    $scope.openSignupModal = function () {
        $('#signUpPopup').modal('toggle');
    }
}]);