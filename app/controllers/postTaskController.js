app.controller('postTaskController', ['$scope', 'commonService', 'httpService', function ($scope, commonService, httpService) {
    init();
    $scope.postTask = postTask;
    $scope.categoryChange = categoryChange;
    $scope.selectHireType = selectHireType;
    $scope.changeServiceType = changeServiceType;
    function init()
    {
        commonService.scrollToTop();
        $(document).ready(function () {
            $(".singleSelection").select2();
            $(".multipleSelection").select2({
                maximumSelectionLength: 3
            });
            var todayDate = new Date();
            $('.datepicker').datetimepicker({
                pickDate: true,
                pickTime: false,
                format: 'MM-DD-YYYY',
                changeMonth: true,
                changeYear: true,
                startDate: todayDate
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
        })
        httpService.getCategory().then(function (data) {
            $scope.categoryList = data.data.data;
        });
        $scope.task = {};
        $scope.task.timeFrom = "11:00 A.M";
        $scope.task.timeTo = "11:00 A.M";
    }
    
    function selectHireType(data)
    {
        setTimeout(function () {
            $(".singleSelection").select2();
            $(".multipleSelection").select2({
                maximumSelectionLength: 3
            });
        }, 300);
        $scope.carIndicator = false;
        $scope.venueIndicator = false;
        angular.forEach($scope.task.hireType, function (value, key) {
            if (value == "Car Hire")
                $scope.carIndicator = true;
            if (value == "Venue Hire")
                $scope.venueIndicator = true;
            
        });
    }
    function categoryChange()
    {
        setTimeout(function() {
           $(".singleSelection").select2();
           $(".multipleSelection").select2({
                maximumSelectionLength: 3
            });
        }, 000);
        console.log($scope.task.category);
    }
    function changeServiceType(data)
    {
        setTimeout(function () {
            $(".singleSelection").select2();
            $(".multipleSelection").select2({
                maximumSelectionLength: 3
            });
        }, 300);
        
        angular.forEach($scope.task.serviceType, function (value, key) {
            if (value == "Hair")
                $scope.hairIndicator = true;
            if(value == "Make up")
                $scope.makeUpIndicator = true;
            if (value == "Other beauty service")
                $scope.otherBeautyServicesIndicator= true;
        });

    }
    function postTask()
    {
        $scope.postTaskForm.$setSubmitted(true);
        if ($scope.postTaskForm.$valid) {
            commonService.scrollToTop();
            $scope.successMessageIndicator = true;
            $scope.errorMessageIndicator = false;
            $scope.message = "Task submitted successfully.";
            $scope.task = {};
        }
        else {
            $scope.errorMessageIndicator = true;
            $scope.message = "Please enter required fields";
        }
    }
}])