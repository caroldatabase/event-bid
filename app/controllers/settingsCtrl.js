app.controller('settingsCtrl', function ($scope, httpService, commonService) {
    init();
    function init() {
        $scope.accountIndicator = true;
        getUserDetails();
        $scope.selectedCategories;
        $scope.categoryList = [];
        httpService.getCategory().then(function (data) {
            $scope.categoryList =  data.data.data;
        });
        getDateList();
        $(".singleSelection").select2();
    }

    function getDateList()
    {
        $scope.dayArray = [];
        for (var i = 1; i <= 9; i++)
        {
            $scope.dayArray.push('0' + i);
        }

        $scope.monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var year = (new Date()).getFullYear()
        $scope.yearArray = [];
        for (var i = 1940; i <= year; i++) {
            $scope.yearArray.push(i);
        }
    }

    function getUserDetails()
    {
        var userId = commonService.getUserid();
        httpService.getUserDetails(userId).then(function (response) {
            if(response.data.message == "Record found successfully.")
            {
                $scope.userDetails = response.data.data;
            }
        })
    }
    $scope.accountSettings = function()
    {
        $scope.accountIndicator = true;
        $scope.categoryIndicator = false;
        $scope.mobileIndicator = false;
        $scope.portfolioIndicator = false;
        $scope.paymentIndicator = false;
        $scope.passwordIndicator = false;
        $(".singleSelection").select2();
    }

    $scope.categorySettings = function()
    {
        $scope.accountIndicator = false;
        $scope.categoryIndicator = true;
        $scope.mobileIndicator = false;
        $scope.portfolioIndicator = false;
        $scope.paymentIndicator = false;
        $scope.passwordIndicator = false;
        setTimeout(function () { $('#selectedCategories').multiselect(); }, 000);
    }

    $scope.mobileSettings = function () {

        $scope.accountIndicator = false;
        $scope.categoryIndicator = false;
        $scope.mobileIndicator = true;
        $scope.portfolioIndicator = false;
        $scope.paymentIndicator = false;
        $scope.passwordIndicator = false;
    }
    $scope.portfolioSettings = function () {
        $scope.accountIndicator = false;
        $scope.categoryIndicator = false;
        $scope.mobileIndicator = false;
        $scope.portfolioIndicator = true;
        $scope.paymentIndicator = false;
        $scope.passwordIndicator = false;
    }
    $scope.paymentSettings = function () {
        $scope.accountIndicator = false;
        $scope.categoryIndicator = false;
        $scope.mobileIndicator = false;
        $scope.portfolioIndicator = false;
        $scope.paymentIndicator = true;
        $scope.passwordIndicator = false;
    }
    $scope.passwordSettings = function () {
        $scope.accountIndicator = false;
        $scope.categoryIndicator = false;
        $scope.mobileIndicator = false;
        $scope.portfolioIndicator = false;
        $scope.paymentIndicator = false;
        $scope.passwordIndicator = true;
    }
    $scope.updateAccountDetails = function()
    {
        var userId = commonService.getUserid();
        httpService.updateProfile(userId, $scope.userDetails).then(function (response) {
        });
    }

    $scope.updateCategoryDetails = function () {
        var userId = commonService.getUserid();
        httpService.updateProfile(userId, $scope.userDetails).then(function (response) {
        });
    }

    $scope.updateMobileDetails = function () {
        var userId = commonService.getUserid();
        httpService.updateProfile(userId, $scope.userDetails).then(function (response) {
        });
    }

});