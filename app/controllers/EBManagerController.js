app.controller('EBManagerCtrl', function ($scope) {
    init();
    function init() {
      
        $scope.functionIndicator = true;
        $scope.contactusIndicator = false;
    }



    $scope.showContactSettingsTab = function () {

        $scope.functionIndicator = false;
        $scope.contactusIndicator = true;
    }
    $scope.showFunctionSettingsTab = function () {
        
        $scope.functionIndicator = true;
        $scope.contactusIndicator = false;
    }
});