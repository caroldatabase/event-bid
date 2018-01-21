app.controller('settingsCtrl',['$scope', 'httpService', 'commonService', '$rootScope', '$location','$window',
    function ($scope, httpService, commonService, $rootScope, $location,$window) {
    init();
    function init() {
        $scope.accountIndicator = true;
        commonService.scrollToTop();
        $scope.portfolioImageArray = [];
        getUserDetails();
        $scope.selectedCategories;
        $scope.categoryList = [];
        $scope.insuranceDetails={};
        $scope.passwordDetails={};
        $scope.qualificationDetails={};
        $scope.cardDetailIndicator = false;
        $scope.updateCardDetailIndicator = false;
        $scope.buttonIndicator = true;
        $scope.insurancetList=[];
        $scope.qualificationList=[];
        $scope.skillIndex=[1,2,3];
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
        for (var i = year ; i <= 2067; i++) {
            $scope.yearArray.push('' +i);
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
                var birthday = $scope.userDetails.birthday;
                birthday = birthday.split("/");
                $scope.userDetails.day=birthday[0];
                $scope.userDetails.month=birthday[1];
                $scope.userDetails.year=birthday[2];
                $scope.portfolioImageArray = [];
                if ($scope.userDetails && $scope.userDetails.portfolio && ($scope.userDetails.portfolio != "Array" && $scope.userDetails.portfolio != "NULL"))
                {
                    $scope.userDetails.portfolio = $scope.userDetails.portfolio.replace(/\\\//g, "/");
                    $scope.userDetails.portfolio = $scope.userDetails.portfolio.replace(/^\[(.+)\]$/, '$1');
                    $scope.userDetails.portfolio = $scope.userDetails.portfolio.replace(/['"]+/g, '');
                    $scope.portfolioImageArray = $scope.userDetails.portfolio.split(",");

                }
                $scope.selectedCategories = $scope.userDetails.category_id.split(",")
                for (var i = 0; i < $scope.selectedCategories.length; i++)
                {
                    $scope.selectedCategories[i] = +$scope.selectedCategories[i];
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
                getDateList();
                $scope.cardDetails = {};
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
        $scope.paypal = false;
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
        $scope.paypal = false;
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
        $scope.paypal = false;
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
        $scope.paypal = false;
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
        $scope.paypal = false;
        
    }
    $scope.passwordSettings = function () {
        $scope.accountIndicator = false;
        $scope.categoryIndicator = false;
        $scope.mobileIndicator = false;
        $scope.portfolioIndicator = false;
        $scope.paymentIndicator = false;
        $scope.passwordIndicator = true;
        $scope.successMobileIndicator = false;
        $scope.paypal = false;
    }
    $scope.showPaypal=function(){
                $scope.accountIndicator = false;
        $scope.categoryIndicator = false;
        $scope.mobileIndicator = false;
        $scope.portfolioIndicator = false;
        $scope.paymentIndicator = false;
        $scope.passwordIndicator = false;
        $scope.successMobileIndicator = false;
        $scope.paypal = true;
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
        $scope.showInsuForm=true;
        $scope.showQuaForm=true; 
        $scope.paypal = false;
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
        $scope.user.verification_skills = $scope.userDetails.skill; 
        $scope.dateErrorIndicator = false;
        if ($scope.userDetails.day != undefined || $scope.userDetails.day != null)
        {
            if (!$scope.userDetails.month || !$scope.userDetails.year) {
                $scope.dateErrorIndicator = true;
            }
        }
        if ($scope.userDetails.month != undefined || $scope.userDetails.month != null) {
            if (!$scope.userDetails.day || !$scope.userDetails.year) {
                $scope.dateErrorIndicator = true;
            }
        }
        if ($scope.userDetails.year != undefined || $scope.userDetails.year != null) {
            if (!$scope.userDetails.month || !$scope.userDetails.day) {
                $scope.dateErrorIndicator = true;
            }
        }
        if ($scope.userDetails.day && $scope.userDetails.month && $scope.userDetails.year) {
            $scope.dateErrorIndicator = false;
            $scope.user.birthday = $scope.userDetails.day + "/" + $scope.userDetails.month + "/" + $scope.userDetails.year;
        }
        httpService.updateProfile(userId, $scope.user).then(function (response) {
            if (response.data.message == "Profile updated successfully")
            {
                $scope.successMessageIndicator = true;
                $scope.userDetails.first_name = response.data.data.first_name;
                $scope.userDetails.last_name = response.data.data.last_name;
                $("#OpenTaskModal").modal({ backdrop: "static" });
                $('#OpenTaskModal').modal({ backdrop: 'static', keyboard: false }, 'show');
            }
        });
    }

    $scope.updateCategoryDetails = function (selectedCategories) {
        var userId = commonService.getUserid();
        $scope.userDetails.category_id = selectedCategories;
        httpService.updateProfile(userId, $scope.userDetails).then(function (response) {
            $('#categoryPopup').modal({ backdrop: 'static', keyboard: false }, 'show');
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

    $scope.passwordPopupClose = function()
    {
        $('#passwordPopup').modal('hide');
    }
    $scope.portfolioPicturePopupClose = function () {
        $('#portfolioPicturePopup').modal('hide');
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
    
    $scope.paypalPayment = function(){
        $rootScope.loaderIndicator = true;
        var param={
              "actionType": "PAY",
              "currencyCode": "USD",
              "receiverList": {
                "receiver": [{
                  "amount": "1.00",
                  "email": "kroy.iips@gmail.com"  // this email ll be paypal login user email of reciever
                }]
              },
              "returnUrl": "http://localhostt/eventbid/return",  // set success url
              "cancelUrl": "http://localhostt/eventbid/cancel", // set cancel url
              "requestEnvelope": {
                "errorLanguage": "en_US",
                "detailLevel": "ReturnAll"
              }
            }
             httpService.paypal(param).then(function (response) {
                 
                 if(response.data.message=="PayKey Generated"){
                     $rootScope.loaderIndicator = false;
                      $window.open(' https://www.sandbox.paypal.com/webapps/adaptivepayment/flow/pay?paykey=' +response.data.data.payKey, '_blank');
                 }else{
                     $rootScope.loaderIndicator = false;
                 }
        });
        
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

    $scope.updateMobileDetails = function (number) {
        var userId = commonService.getUserid();
       if(number.toString().length<=10){
        httpService.updateProfile(userId, $scope.userDetails).then(function (response) {
            if (response.data.message == "Profile updated successfully") {
                $scope.successMobileIndicator = true;
                $('#mobilePopup').modal('show');
            }
        });
       }
    }

    $scope.updatePassword = function (passwordDetails,passForm) {

        passForm.$setSubmitted(true);
        if (passForm.$valid) {
            if ($scope.passwordDetails.cnfNewPassword === $scope.passwordDetails.newPassword) {
                $rootScope.loaderIndicator = true;
                var userId = commonService.getUserid();
                httpService.changePassword(userId, $scope.passwordDetails.oldPassword, $scope.passwordDetails.newPassword).then(function (result) {
                    if (result.data.code != 500 && result.data.message == "Password changed successfully.") {
                        $rootScope.loaderIndicator = false;
                       
                      
                        //$scope.successIndicator = true;
                        
                        $('#passwordPopup').modal('toggle');
                        $("#passwordPopup").modal({ backdrop: "static" });
                        $('#passwordPopup').modal('show');
                        setTimeout(function () {
                            $location.path('/');
                            //$scope.passwordIndicator = false;
                            $rootScope.isLogin = false;
                            $scope.passwordDetails.oldPassword = "";
                            $scope.passwordDetails.newPassword = "";
                            $scope.passwordDetails.cnfNewPassword = "";
                            $rootScope.adminIndicator = false;
                            commonService.deleteCookieValues('FirstName');
                            commonService.deleteCookieValues('UserID');
                            commonService.deleteCookieValues('UserType');
                            commonService.reloadRoute();
                            $('#promptLoginPopup').modal('toggle');
                            $("#promptLoginPopup").modal({ backdrop: "static" });
                            $('#promptLoginPopup').modal('show');
                        }, 2000);
                    }
                    else {
                        $scope.passwordIndicator = true;
                        $rootScope.loaderIndicator = false;
                        $scope.errorIndicator = true;
                        $scope.message = result.data.message;
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
            $scope.message = "Please enter required details";
            $scope.errorIndicator = true;
            
        }

    }

    $scope.insuranceFileUpload = function(insuranceDetails,insuranceForm)
    {
        var imageFile = document.getElementById('doc').files[0];
        $scope.imageIndidcator=document.getElementById('doc').files[0]?false:true;
        insuranceForm.$setSubmitted(true);
            if (insuranceForm.$valid&&imageFile) {
                    reader = new FileReader();
                    reader.readAsDataURL(imageFile);
                    reader.onload = function () {
                    $rootScope.loaderIndicator = true;
                    $scope.insuranceDetails.userId = commonService.getUserid();             
                    $scope.insuranceDetails.doc = reader.result;
                    $scope.insuranceDetails.status ="pending from admin";
                    httpService.addInsurance($scope.insuranceDetails).then(function (result) {
                        if (result.data.message == 'Insurance added!') {
                        $rootScope.loaderIndicator = false;
                        $scope.showInsuForm=false;    
                        insuranceForm.$setPristine();
                        insuranceForm.$setUntouched();
                        $scope.insuranceSuccessMessageIndicator = true;
                        $scope.insuranceErrorMessageIndicator = false;
                        $scope.insuranceMessage = "This details will be saved to your profile after verification from our admin team.";
                        $scope.insurancetList.push(result.data.data);    
                        $scope.showInsuDetail=true;
                        $scope.insuranceDetails = {};
                        } else {
                        $rootScope.loaderIndicator = false;
                        insuranceForm.$setPristine();
                        insuranceForm.$setUntouched();
                        $scope.insuranceSuccessMessageIndicator = false;
                        $scope.insuranceErrorMessageIndicator = true;
                        $scope.insuranceMessage = result.message;
                        $scope.insuranceDetails = {};
                        }
                      
                    });
                    };
                    reader.onerror = function (error) {
                        console.log('Error: ', error);
                    };
                  
            
            } else {
                  $scope.insuranceErrorMessageIndicator = true;
                  $scope.insuranceMessage = "Please enter required details.";
            }

    }
    $scope.addInsuranceForm=function(){
        $scope.showInsuForm=true;
    }
     $scope.addQualificationForm=function(){
        $scope.showQuaForm=true;
    }

     $scope.saveQualification = function(qualificationDetails,qualificationForm)
    {
        var imageFile = document.getElementById('quaDoc').files[0];
        $scope.quaImageIndidcator=document.getElementById('quaDoc').files[0]?false:true;
        qualificationForm.$setSubmitted(true);
            if (qualificationForm.$valid&&imageFile) {
                    reader = new FileReader();
                    reader.readAsDataURL(imageFile);
                    reader.onload = function (e) {
                    var data = e.target.result;
                    $rootScope.loaderIndicator = true;
                    $scope.qualificationDetails.userId = commonService.getUserid();
                    $scope.qualificationDetails.doc=data;
                    $scope.qualificationDetails.status ="pending from admin";
                    httpService.addQualification($scope.qualificationDetails).then(function (result) {
                        if (result.data.message == 'Qualification added') {    
                        $rootScope.loaderIndicator = false;
                        $scope.showQuaForm=false;   
                        qualificationForm.$setPristine();
                        qualificationForm.$setUntouched();
                        $scope.quaSuccessMessageIndicator = true;
                        $scope.quaErrorMessageIndicator = false;
                        $scope.message = "This details will be saved to your profile after verification from our admin team.";
                        $scope.qualificationList.push(result.data.data);    
                        $scope.showQuaDetail=true; 
                        $scope.qualificationDetails = {};
                        } else {
                        $rootScope.loaderIndicator = false;
                        qualificationForm.$setPristine();
                        qualificationForm.$setUntouched();
                        $scope.quaSuccessMessageIndicator = false;
                        $scope.quaErrorMessageIndicator = true;
                        $scope.message = result.message;
                        $scope.qualificationDetails = {};
                        }
                      
                    });
                    };
                    reader.onerror = function (error) {
                        console.log('Error: ', error);
                    };
                   
            
            } else {
                  $scope.quaErrorMessageIndicator = true;
                  $scope.message = "Please enter required details.";
            }

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

    $scope.getPortfolioPicture = function()
    {
        $('#portfolioPicturePopup').modal('show');
    }
     $scope.deletePhoto = function (data)
    {
        var index = $scope.portfolioImageArray.indexOf(data);
        $scope.portfolioImageArray.splice(index, 1);
    }

}]);