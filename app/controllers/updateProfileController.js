app.controller('updateProfile', ['$scope', function ($scope) {
    $scope.updateProfile = updateProfile;

    function updateProfile() {
        $scope.updateProfileForm.$setSubmitted(true);
        if ($scope.updateProfileForm.$valid) {
            $scope.successMessageIndicator = true;
            $scope.message = "Profile updated successfully.";
            $scope.errorMessageIndicator = false;
        }
        else {
            $scope.errorMessageIndicator = true;
            $scope.successMessageIndicator = false;
            $scope.message = "Please fill required details";
        }
    }

}]);