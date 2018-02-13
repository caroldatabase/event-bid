app.controller("aboutusController", ['commonService', '$scope', function (commonService, $scope) {
    commonService.scrollToTop();


    $scope.openSignupModal = function () {
        $('#signUpPopup').modal('toggle');
    }
}]);