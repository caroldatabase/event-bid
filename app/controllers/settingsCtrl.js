﻿app.controller('settingsCtrl', function ($scope, httpService, commonService, $rootScope) {
    init();
    function init() {
        $scope.accountIndicator = true;
        commonService.scrollToTop();
        $scope.portfolioImageArray = [];
        getUserDetails();
        $scope.selectedCategories;
        $scope.categoryList = [];
        $scope.cardDetailIndicator = false;
        $scope.updateCardDetailIndicator = false;
        $scope.buttonIndicator = true;
        httpService.getCategory().then(function (data) {
            $scope.categoryList =  data.data.data;
        });
        getDateList();
        getCardDetails();
    }

    $scope.removecard = function(card)
    {
        $scope.updateCardDetailIndicator = false;
        $scope.cardDetailIndicator = false;
        $scope.creditCardDetailsIndicator = false;
        $rootScope.loaderIndicator = true;
        httpService.deleteCardDetails(card).then(function (response) {
            if (response.data.message == "Card removed successfully!") {
                $scope.buttonIndicator = true;
                $rootScope.loaderIndicator = false;
            }
        });
    }
    $scope.showCardDetails = function()
    {
        $scope.cardDetailIndicator = true;
        $scope.buttonIndicator = false;
        $scope.cardDetails = {};
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
                if ($scope.userDetails && $scope.userDetails.portfolio && ($scope.userDetails.portfolio != "Array" && $scope.userDetails.portfolio != "NULL"))
                {
                    $scope.userDetails.portfolio = $scope.userDetails.portfolio.replace(/\\\//g, "/");
                    $scope.userDetails.portfolio = $scope.userDetails.portfolio.replace(/^\[(.+)\]$/, '$1');
                    $scope.userDetails.portfolio = $scope.userDetails.portfolio.replace(/['"]+/g, '');
                    $scope.portfolioImageArray = $scope.userDetails.portfolio.split(",");
                }
                if (response.data.data.mobile)
                $scope.userDetails.mobile = parseInt(response.data.data.mobile);
            }
        })
    }

    function getCardDetails()
    {
        var userId = commonService.getUserid();
        var user = {
            "userId": userId
        }
        httpService.getCardDetails(user).then(function (response) {
            if (response.data.message == "No card added yet!") {
                $scope.creditCardDetailsIndicator = false;
            }
            else {
                $scope.creditCardDetailsIndicator = true;
                $scope.card = {};
                $scope.card = response.data.result[0];
            }
        });
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
        $scope.userDetails.portfolio = [];
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

    $scope.insuranceFileUpload = function()
    {
        var f = document.getElementById('insFileUpload').files[0],
        reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = function () {
            console.log(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    $scope.addCardDetails = function (cardDetails, paymentForm)
    {
        if (paymentForm)
        {
            paymentForm.$setSubmitted(true);
            if (paymentForm.$valid) {
                $rootScope.loaderIndicator = true;
                var userId = commonService.getUserid();
                cardDetails.userId = userId;
                httpService.addCard(cardDetails).then(function (response) {
                    $rootScope.loaderIndicator = false;
                    if (response.data.message == "Card inserted successfully!") {
                        $scope.successMessageIndicator = true;
                        $scope.message = "Card added successfully.";
                        $scope.cardDetails = {};
                        $scope.errorMessageIndicator = false;
                        $scope.cardDetailIndicator = false;
                        $scope.updateCardDetailIndicator = false;
                        getCardDetails();
                    }
                    else {
                        if (response.data.message == "This card already added!")
                        {
                            $scope.message = "This card already added!";
                            $scope.errorMessageIndicator = false;
                        }
                    }
                });
            }
            else {
                $scope.errorMessageIndicator = true;
                $scope.message = "Please enter required details."
            }
        }
        
    }
});