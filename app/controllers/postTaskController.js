app.controller('postTaskController', ['$scope', 'commonService', 'httpService', 'CONSTANTS', '$rootScope', '$compile',
    function ($scope, commonService, httpService, CONSTANTS, $rootScope, $compile) {
    init();
    $scope.postTask = postTask;
    $scope.categoryChange = categoryChange;
    $scope.selectHireType = selectHireType;
    $scope.changeServiceType = changeServiceType;
    $scope.photoVideoEventRequired = photoVideoEventRequired;
   // $scope.categoryConst = CONSTANTS.CATEGORY;
   
    function init()
    {
        $(".singleSelection").select2();
        $(".multipleSelection").select2({

        });
        $rootScope.loaderIndicator = true;
        commonService.scrollToTop();
        $(document).ready(function () {
            var todayDate = new Date();
            $(".singleSelection").select2();
            $(".multipleSelection").select2({
                maximumSelectionLength: 3
            });
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
            $scope.categoryConst = commonService.getCategoryMapping($scope.categoryList);
            $rootScope.loaderIndicator = false;
        });
        resetData();

       
    }
    
   
    function selectHireType()
    {
        
        $scope.carIndicator = false;
        $scope.venueIndicator = false;
        angular.forEach($scope.task.category_question.hireType, function (value, key) {
            if (value == "Car Hire")
                $scope.carIndicator = true;
            if (value == "Venue Hire")
                $scope.venueIndicator = true;
            
        });
    }
    function categoryChange(item)
    {
       
        $(".singleSelection").select2();
        setTimeout(function () {
            $(".multipleSelection").select2({

            });
        }, 000);
        
        if (item == $scope.categoryConst.CAR_VENUE_HIRE) {
                    $(".multipleSelection").select2({
                        maximumSelectionLength: 3
                    });
        }
        else if (item == $scope.categoryConst.CLEANING)
        {
            setTimeout(function(){
            $(".multipleSelection").select2({
              
            });
            }, 000);
        }
        else if (item == $scope.categoryConst.PATISSERIE)
        {
            $scope.task.category_question = {};
            $scope.task.category_question.desertImages = [];
            setTimeout(function () {
                $(".multipleSelection").select2({

                });
            }, 000);
        }
        else if (item == $scope.categoryConst.GRAPHIC_DESIGN)
        {
            $scope.task.category_question = {};
            $scope.task.category_question.graphicImages = [];
            setTimeout(function () {
                $(".multipleSelection").select2({

                });
            }, 000);
        }
        
    }
    function changeServiceType(data)
    {
        $scope.hairIndicator = false;
        $scope.makeUpIndicator = false;
        $scope.otherBeautyServicesIndicator = false;
        angular.forEach($scope.task.category_question.serviceType, function (value, key) {
            if (value == "Hair")
                $scope.hairIndicator = true;
            if(value == "Make up")
                $scope.makeUpIndicator = true;
            if (value == "Other beauty service")
                $scope.otherBeautyServicesIndicator= true;
        });

    }
    
    function photoVideoEventRequired()
    {
        $scope.PhotographyIndicator = false;
        $scope.VideographyIndicator = false;
        angular.forEach($scope.task.category_question.eventRequirement, function (value, key) {
            if (value == "Photography")
                $scope.PhotographyIndicator = true;
            if (value == "Videography")
                $scope.VideographyIndicator = true;
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
            console.log(JSON.stringify($scope.task));
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
    


    function resetData()
    {
        $scope.task = {};
        $scope.task.inspirationPhoto = [];
        //$scope.task.category_question.desertImages = [];
        $scope.task.timeFrom = "11:00 A.M";
        $scope.task.timeTo = "11:00 A.M";
        if ($scope.postTaskForm) {
            $scope.postTaskForm.$setPristine();
            $scope.postTaskForm.$setUntouched();
            $scope.postTaskForm.$submitted = false;
        }
    }


    $rootScope.$on("imageAdded", function (event, fileUploaded, imageType) {
        if (fileUploaded) {
            if (imageType == "categoryImage" && $scope.task.inspirationPhoto) { //push into array case and check if it exists.
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
            if ( imageType == "desertImage" && $scope.task.category_question.desertImages) { //push into array case and check if it exists.
                if ($scope.task.category_question.desertImages.length < 3) {
                    $scope.task.category_question.desertImages.push(fileUploaded);
                    setTimeout(function () {
                        $('#desertImage').val("");
                    }, 2000);
                }
                else {
                    $scope.errorMessageIndicator = true;
                    $scope.message = "Only three images are allowed for uploading.";
                    commonService.scrollToTop();
                }
            }
            if (imageType == "graphicImage" && $scope.task.category_question.graphicImages) { //push into array case and check if it exists.
                if ($scope.task.category_question.graphicImages.length < 3) {
                    $scope.task.category_question.graphicImages.push(fileUploaded);
                    setTimeout(function () {
                        $('#graphicImage').val("");
                    }, 2000);
                }
                else {
                    $scope.errorMessageIndicator = true;
                    $scope.message = "Only three images are allowed for uploading.";
                    commonService.scrollToTop();
                }
            }
            if (imageType == "makeuplookImage") { //push into array case and check if it exists.
                if ($scope.task.category_question.makeuplookImages.length < 3) {
                    $scope.task.category_question.makeuplookImages.push(fileUploaded);
                    setTimeout(function () {
                        $('#makeuplookImage').val("");
                    }, 2000);
                }
                else {
                    $scope.errorMessageIndicator = true;
                    $scope.message = "Only three images are allowed for uploading.";
                    commonService.scrollToTop();
                }
            }
            if (imageType == "hairStyleImage") { //push into array case and check if it exists.
                if ($scope.task.category_question.hairStyleImages.length < 3) {
                    $scope.task.category_question.hairStyleImages.push(fileUploaded);
                    setTimeout(function () {
                        $('#hairStyleImage').val("");
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







