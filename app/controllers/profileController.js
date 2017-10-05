app.controller('profileController', ['$scope', 'commonService', '$rootScope', function ($scope, commonService, $rootScope) {

    init();
    function init()
    {
        commonService.checkUserLoggedIn();
    }
    
}]);