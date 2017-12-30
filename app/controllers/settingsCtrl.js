﻿app.controller('settingsCtrl', function ($scope, httpService, commonService, $rootScope) {
    init();
    function init() {
        $scope.accountIndicator = true;
        commonService.scrollToTop();
        getUserDetails();
        $scope.selectedCategories;
        $scope.categoryList = [];
        $scope.portfolioImageArray = [];
        $scope.cardDetailIndicator = false;
        $scope.updateCardDetailIndicator = false;
        $scope.buttonIndicator = true;
        httpService.getCategory().then(function (data) {
            $scope.categoryList =  data.data.data;
        });
        getDateList();
    }

    $scope.removecard = function()
    {
        $scope.updateCardDetailIndicator = true;
        $scope.cardDetailIndicator = false;
    }
    $scope.showCardDetails = function()
    {
        $scope.cardDetailIndicator = true;
        $scope.buttonIndicator = false;
    }
    $scope.updateCardDetails = function()
    {
        $scope.updateCardDetailIndicator = true;
        $scope.buttonIndicator = false;
    }
    $scope.cancelAddingCard = function()
    {
        $scope.buttonIndicator = true;
        $scope.cardDetailIndicator = false;
        $scope.updateCardDetailIndicator = false;
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
    $scope.getProfilePicture = function()
    {
        $('#profilePopup').modal('show');
    }
    $scope.profilePopupClose = function()
    {
        $('#profilePopup').modal('hide');
    }
    function getUserDetails()
    {
        var userId = commonService.getUserid();
        httpService.getUserDetails(userId).then(function (response) {
            if(response.data.message == "Record found successfully.")
            {
                $scope.userDetails = response.data.data;
                $scope.portfolioImageArray = [];
                if ($scope.userDetails && $scope.userDetails.portfolio && $scope.userDetails.portfolio != "Array")
                $scope.portfolioImageArray = $scope.userDetails.portfolio;
                if (response.data.data.mobile)
                $scope.userDetails.mobile = parseInt(response.data.data.mobile);
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
        $scope.successMobileIndicator = false;
        $scope.insuranceIndicator = false;
    }

    $scope.categorySettings = function()
    {
        $scope.accountIndicator = false;
        $scope.categoryIndicator = true;
        $scope.mobileIndicator = false;
        $scope.portfolioIndicator = false;
        $scope.paymentIndicator = false;
        $scope.passwordIndicator = false;
        $scope.successMobileIndicator = false;
        $scope.insuranceIndicator = false;
        setTimeout(function () {
            //$('#selectedCategories').multiselect();
            $(".multipleSelection").select2({
                maximumSelectionLength: 4
            });
        }, 000);
       
    }

    $scope.mobileSettings = function () {

        $scope.accountIndicator = false;
        $scope.categoryIndicator = false;
        $scope.mobileIndicator = true;
        $scope.portfolioIndicator = false;
        $scope.paymentIndicator = false;
        $scope.passwordIndicator = false;
        $scope.successMobileIndicator = false;
        $scope.insuranceIndicator = false; 
    }
    $scope.portfolioSettings = function () {
        $scope.accountIndicator = false;
        $scope.categoryIndicator = false;
        $scope.mobileIndicator = false;
        $scope.portfolioIndicator = true;
        $scope.paymentIndicator = false;
        $scope.passwordIndicator = false;
        $scope.successMobileIndicator = false;
        $scope.insuranceIndicator = false;
    }
    $scope.paymentSettings = function () {
        $scope.accountIndicator = false;
        $scope.categoryIndicator = false;
        $scope.mobileIndicator = false;
        $scope.portfolioIndicator = false;
        $scope.paymentIndicator = true;
        $scope.passwordIndicator = false;
        $scope.successMobileIndicator = false;
        $scope.insuranceIndicator = false;
    }
    $scope.passwordSettings = function () {
        $scope.accountIndicator = false;
        $scope.categoryIndicator = false;
        $scope.mobileIndicator = false;
        $scope.portfolioIndicator = false;
        $scope.paymentIndicator = false;
        $scope.passwordIndicator = true;
        $scope.successMobileIndicator = false;
    }
    $scope.insuranceSettings = function()
    {
        $scope.accountIndicator = false;
        $scope.categoryIndicator = false;
        $scope.mobileIndicator = false;
        $scope.portfolioIndicator = false;
        $scope.paymentIndicator = false;
        $scope.passwordIndicator = false;
        $scope.successMobileIndicator = false;
        $scope.insuranceIndicator = true;
    }
    $scope.updateAccountDetails = function()
    {
        var userId = commonService.getUserid();
        $scope.user = {};
        $scope.user.firstName = $scope.userDetails.first_name;
        $scope.user.lastName = $scope.userDetails.last_name;
        $scope.user.aboutMe = $scope.userDetails.about_me;
        $scope.user.email = $scope.userDetails.email;
        $scope.user.suburb = $scope.userDetails.suburb;
        $scope.user.state = $scope.userDetails.state;
        $scope.user.photo = $scope.userDetails.photo;
        $scope.dateErrorIndicator = false;
        if ($scope.day != undefined || $scope.day != null)
        {
            if (!$scope.month || !$scope.year) {
                $scope.dateErrorIndicator = true;
            }
        }
        if ($scope.month != undefined || $scope.month != null) {
            if (!$scope.day || !$scope.year) {
                $scope.dateErrorIndicator = true;
            }
        }
        if ($scope.year != undefined || $scope.year != null) {
            if (!$scope.month || !$scope.day) {
                $scope.dateErrorIndicator = true;
            }
        }
        if ($scope.day && $scope.month && $scope.year) {
            $scope.dateErrorIndicator = false;
            $scope.user.birthday = $scope.day + "/" + $scope.month + "/" + $scope.year;
        }
        httpService.updateProfile(userId, $scope.user).then(function (response) {
            if (response.data.message == "Profile updated successfully")
            {
                 $scope.successMessageIndicator = true;
                $scope.userDetails.first_name = response.data.data.first_name;
                $scope.userDetails.last_name = response.data.data.last_name;
            }
        });
    }

    $scope.updateCategoryDetails = function (selectedCategories) {
        var userId = commonService.getUserid();
        $scope.userDetails.category_id = selectedCategories;
        httpService.updateProfile(userId, $scope.userDetails).then(function (response) {
            $('#categoryPopup').modal('show');
        });
    }

    $scope.mobilePopupClose = function()
    {
        $('#mobilePopup').modal('hide');
    }

    $scope.categoryPopupClose = function()
    {
        $('#categoryPopup').modal('hide');
    }
    
    $scope.uploadPortfolioFiles = function()
    {
        var userId = commonService.getUserid();
        $scope.userDetails.portfolio = $scope.portfolioImageArray;
        httpService.updateProfile(userId, $scope.userDetails).then(function (response) {
            $('#portfolioPopup').modal('show');
        });
    }

    $scope.portfolioPopupClose = function()
    {
        $('#portfolioPopup').modal('hide');
    }

    $rootScope.$on("imageAdded", function (event, fileUploaded, imageType) {
        if (fileUploaded) {
            if (imageType == "portFolioImage" && $scope.portfolioImageArray) { //push into array case and check if it exists.
                if ($scope.portfolioImageArray.length < 5) {
                    $scope.portfolioImageArray.push(fileUploaded);
                    setTimeout(function () {
                        $('#portFolioImage').val("");
                    }, 2000);
                }
                else {
                    $scope.errorMessageIndicator = true;
                    $scope.messagePortfolio = "Only five images are allowed for uploading.";
                    //commonService.scrollToTop();
                }
            }
           
            
            
            
        }
    });

    $scope.updateMobileDetails = function () {
        var userId = commonService.getUserid();
        httpService.updateProfile(userId, $scope.userDetails).then(function (response) {
            if (response.data.message == "Profile updated successfully") {
                $scope.successMobileIndicator = true;
                $('#mobilePopup').modal('show');
            }
        });
    }

    $scope.updatePassword = function () {
        var userId = commonService.getUserid();
        httpService.updateProfile(userId, $scope.userDetails).then(function (response) {
            if (response.data.message == "Profile updated successfully") {
                $scope.successPasswordIndicator = true;
            }
        });
    }

});