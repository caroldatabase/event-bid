﻿app.controller('EBManagerCtrl', function ($scope, commonService, $rootScope, httpService) {
    init();
    function init() {
      
        $scope.functionIndicator = true;
        $scope.contactusIndicator = false;
        $scope.user = {};
        $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
        $scope.errorMessageIndicator = false;
        commonService.scrollToTop();
        $('.datepicker').datetimepicker({
            pickDate: true,
            pickTime: false,
            format: 'MM-DD-YYYY',
            changeMonth: true,
            changeYear: true,
            minDate: new Date()
        }).on("dp.change", function () {
            $(this).trigger('blur');

        });
        $('.timepicker').timepicker({
            timeFormat: 'h:mm p',
            interval: 30,
            minTime: '07',
            maxTime: '11:30pm',
            defaultTime: '11',
            startTime: '07:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        setTimeout(function () { $('#selectedCategories').multiselect(); }, 000);
    }



    $scope.showContactSettingsTab = function () {

        $scope.functionIndicator = false;
        $scope.contactusIndicator = true;
    }
    $scope.showFunctionSettingsTab = function () {
        
        $scope.functionIndicator = true;
        $scope.contactusIndicator = false;
        $('.datepicker').datetimepicker({
            pickDate: true,
            pickTime: false,
            format: 'MM-DD-YYYY',
            changeMonth: true,
            changeYear: true,
            minDate: new Date()
        }).on("dp.change", function () {
            $(this).trigger('blur');

        });
    }
    $scope.countChar = function () {
        if ($scope.user.comments) {
            var len = $scope.user.comments.length;
            if (len >= 1000) {
                $scope.user.comments = $scope.user.comments.substring(0, 1000);
            } else {
                $('#charNum').text(1000 - len);
            }
        }
        else
            $('#charNum').text(1000);
    }
    $scope.contactUs = function () {
        $scope.EBContactusForm.$setSubmitted(true);
        if ($scope.EBContactusForm.$valid) {
            $rootScope.loaderIndicator = true;
            httpService.contactEBManager($scope.user).then(function (result) {
                $rootScope.loaderIndicator = false;
                commonService.scrollToTop();
                $scope.EBContactusForm.$setPristine();
                $scope.EBContactusForm.$setUntouched();
                $scope.successMessageIndicator = true;
                $scope.errorMessageIndicator = false;
                $scope.message = "Enquiry submitted successfully.We will get back to you shortly.";
                $scope.user = {};
            });
        }
        else {
            if ($scope.EBContactusForm.$error.required) {
                $scope.errorMessageIndicator = true;
                $scope.message = "Please enter required fields";
            }
            else {
                $scope.errorMessageIndicator = true;
                $scope.message = "Please enter valid email-id.";
            }
        }

    }
    $scope.onSelectCategory = function()
    {
        console.log($scope.user.selectedCategories);
    }
});