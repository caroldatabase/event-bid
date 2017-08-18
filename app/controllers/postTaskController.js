app.controller('postTaskController', ['$scope', 'commonService', 'httpService', 'CONSTANTS', '$rootScope', '$compile',
    function ($scope, commonService, httpService, CONSTANTS, $rootScope, $compile) {
    init();
    $scope.postTask = postTask;
    $scope.categoryChange = categoryChange;
    $scope.selectHireType = selectHireType;
    $scope.changeServiceType = changeServiceType;
    $scope.categoryConst = CONSTANTS.CATEGORY;
    $scope.upload = upload;
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
                minDate: todayDate
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

        });
       
        
        httpService.getCategory().then(function (data) {
            $rootScope.categoryList = $scope.categoryList = data.data.data;
        });
        resetData();
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
        $scope.task.timeFrom = $('#timeFrom').val();
        $scope.task.timeTo = $('#timeTo').val();
        $scope.postTaskForm.$setSubmitted(true);
        if ($scope.postTaskForm.$valid) {
            $rootScope.loaderIndicator = true;
            $scope.task.post_user_id = commonService.getUserid();
            $scope.task.task_status = "open";
            
            httpService.postTask($scope.task).then(function (result) {
                if (result.data.code = 200 && result.data.message == "Post task created successfully.")
                {
                    commonService.scrollToTop();
                    resetData();
                    $rootScope.loaderIndicator = false;
                    $scope.successMessageIndicator = true;
                    $scope.errorMessageIndicator = false;
                    $scope.message = "Task submitted successfully.";
                    $scope.task = {};
                }
                else {
                    $rootScope.loaderIndicator = false;
                    $scope.errorMessageIndicator = false;
                    $scope.message = "Error occured. Please try after some time.";
                }
            });
        }
        else {
            $scope.errorMessageIndicator = true;
            $scope.message = "Please enter required fields";
        }
    }
    function upload()
    {
        setTimeout(function () {
            if ($scope.categoryImage) {
                $scope.task.inspirationPhoto.push($scope.categoryImage);
            }
            }, 2000);
    }


    function resetData()
    {
        $scope.task = {};
        $scope.task.category_question = {};
        $scope.task.inspirationPhoto = [];
        $scope.task.timeFrom = "11:00 A.M";
        $scope.task.timeTo = "11:00 A.M";
        $scope.task.eventType = "";
        $scope.task.category = "";
        if ($scope.postTaskForm) {
            $scope.postTaskForm.$setPristine();
            $scope.postTaskForm.$setUntouched();
            $scope.postTaskForm.$submitted = false;
        }
    }


    $rootScope.$on("imageAdded", function (event, fileUploaded) {
        if (fileUploaded) {
            if ($scope.task.inspirationPhoto) { //push into array case and check if it exists.
                if ($scope.task.inspirationPhoto.length < 3) {
                    $scope.task.inspirationPhoto.push(fileUploaded);
                    setTimeout(function(){
                        $('#categoryImage').val("");
                    }, 2000);
                }
                else {
                    $scope.errorMessageIndicator = true;
                    $scope.message = "Only three images are allowed for uploading.";
                    commonService.scrollToTop();
                }
            }
        }
    });

}])







