app.controller('EBManagerCtrl',['$scope', 'commonService', '$rootScope', 'httpService', '$routeParams', 
    function ($scope, commonService, $rootScope, httpService, $routeParams) {
    $scope.showContactSettingsTab = showContactSettingsTab;
    init();
    function showContactSettingsTab() {

        //alert("hi");
        $scope.functionIndicator = false;
        $scope.contactusIndicator = true;
    }
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
        var contactUs = $routeParams.contactUs;
        if (contactUs)
        {
            showContactSettingsTab();
        }
        setTimeout(function () { $('#selectedCategories').multiselect(); }, 000);
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
        if ($scope.user.message) {
            var len = $scope.user.message.length;
            if (len >= 1000) {
                $scope.user.message = $scope.user.message.substring(0, 1000);
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
}]);