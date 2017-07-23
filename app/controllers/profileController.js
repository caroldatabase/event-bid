app.controller('profileController', ['$scope', function ($scope) {

    $scope.updateProfile = updateProfile; 
    init();
    function init()
    {
        $scope.profileIndicator = true;
        $scope.accountSettingsIndicator = false;

        $(document).ready(function () {
            $(".singleSelection").select2();
            $(".multipleSelection").select2({
                maximumSelectionLength: 3
            });
            $('.datepicker').datetimepicker({
                pickDate: true,
                pickTime: false
            });
            $('.timepicker').datetimepicker({
                pickDate: false,
                pickTime: true
            });
        })
    }
    $scope.showaccountSettingsTab = function()
    {
        $scope.profileIndicator = false;
        $scope.accountSettingsIndicator = true;
    }

    $scope.showProfileTab = function()
    {
        $scope.profileIndicator = true;
        $scope.accountSettingsIndicator = false;
    }
    function updateProfile() {
        $scope.updateProfileForm.$setSubmitted(true);
        if ($scope.updateProfileForm.$valid) {
            $scope.successMessageIndicator = true;
            $scopeupdateProfile.message = "Profile updated successfully.";
            $scope.errorMessageIndicator = false;
        }
        else {
            $scope.errorMessageIndicator = true;
            $scope.successMessageIndicator = false;
            $scope.message = "Please fill required details";
        }
    }

}]);