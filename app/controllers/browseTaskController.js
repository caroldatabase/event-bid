app.controller('browseTaskCtrl',['$scope', 'httpService', '$rootScope', 'commonService', 'CONSTANTS', '$routeParams', function ($scope, httpService, $rootScope, commonService, CONSTANTS, $routeParams) {

    $scope.currentPage = 1;
    $scope.numPerPage = 25;
    $scope.maxSize = 5;
    $scope.countIndicator = 0;
    $scope.anchorDisable = true;
    $scope.anchorReplyDisable = true;
    $scope.userDetails={};
    // $scope.taskList = [];

    init();


    function init() {
        $(document).ready(function () {
            commonService.scrollToTop();
            var todayDate = new Date();
            $('#datetimepicker1').datetimepicker({
                pickDate: true,
                pickTime: false,
                format: 'DD-MM-YYYY',
                changeMonth: true,
                changeYear: true
            }).on("dp.change", function () {
                $(this).trigger('blur');

            });
            $('#datetimepicker2').datetimepicker({
                pickDate: true,
                pickTime: false,
                format: 'DD-MM-YYYY',
                changeMonth: true,
                changeYear: true
            }).on("dp.change", function () {
                $(this).trigger('blur');

            });
            var categoryId = $routeParams.categoryId;
            if (categoryId) {
                browseByCategory(categoryId);
            }
            else
                browseAllTask();
        });

        //getAllCategoryFilters();
    }

    function getAllCategoryFilters() {
        httpService.getCategory().then(function (data) {
            $scope.categoryList = data.data.data;
        });
    }
    $scope.openSignupModal = function () {
        $('#signUpPopup').modal('toggle');
    }

    $scope.openLoginModal = function () {
        $('#loginPopup').modal('toggle');
    }
    $scope.paypalAccount = function() {
        var userId = commonService.getUserid();
        $rootScope.loaderIndicator = true;
        if($scope.userDetails.paypalAccount!=''&&$scope.userDetails.paypalAccount!=null){
            $scope.emailIndicator=false;
            httpService.updateProfile(userId, $scope.userDetails).then(function (response) {
                if(response.data.message=='Profile updated successfully'){
                $rootScope.loaderIndicator = false;
                $('#taskDetailModal').modal('hide');
                $('#showInterestPopup').modal('toggle');
                $("#showInterestPopup").modal({ backdrop: "static" });
                $('#showInterestPopup').modal('show');
                $('#addPaypalAccountPopup').modal('hide');
                $scope.interestedUser = {};
                $scope.errorMessageIndicator = false;
                $scope.interestedUser.offerImages = [];
                $scope.interestedUser.showInterestCostType = $scope.showInterestCostType;
                $scope.errorMessage = false;   
                } else {
                  $rootScope.loaderIndicator = false;  
                }
          
        });   
        } else {
            $scope.emailIndicator = true;
            $rootScope.loaderIndicator = false;
        }

    }
    
    $scope.closePaypal =function(){
         $('#addPaypalAccountPopup').modal('hide');
    }

    $scope.showInterestPopup = function()
    {
        var userId = commonService.getUserid();
        httpService.getUserDetails(userId).then(function (response) {
            if(response.data.message == "Record found successfully.")
            {
                $scope.userDetails = response.data.data;
                if($scope.userDetails.paypalAccount!=''&&$scope.userDetails.paypalAccount!=null) {
                $('#taskDetailModal').modal('hide');
                $('#showInterestPopup').modal('toggle');
                $("#showInterestPopup").modal({ backdrop: "static" });
                $('#showInterestPopup').modal('show');
                $scope.interestedUser = {};
                $scope.errorMessageIndicator = false;
                $scope.interestedUser.offerImages = [];
                $scope.interestedUser.showInterestCostType = $scope.showInterestCostType;
                $scope.errorMessage = false;
                } else {
                    $('#taskDetailModal').modal('hide');
                    $('#addPaypalAccountPopup').modal('show');
                }
            }
        })
    }

    $scope.showOfferImagesPreview = function()
    {
        $('#showInterestPopup').modal('hide');
        $('#offerImagesPopup').modal('show');
    }

    $scope.offerImagesPopupClose = function()
    {
        $('#offerImagesPopup').modal('hide');
        $('#showInterestPopup').modal('show');
    }
    $scope.getDataByDate = function()
    {
        $scope.fromDate = $('#datetimepicker1').val();
        $scope.toDate = $('#datetimepicker2').val();
        if ($scope.fromDate && $scope.toDate) {
            var df = parseDate($scope.fromDate);
            var dt = parseDate($scope.toDate);
            var result = [];
            for (var i = 0; i < $scope.originalTaskList.length; i++) {
                var tf = new Date($scope.originalTaskList[i].date_required),
                    tt = new Date($scope.originalTaskList[i].date_required);
                if (tf >= df && tt <= dt) {
                    result.push($scope.originalTaskList[i]);
                }
            }
            $scope.taskList = result;
           // return $scope.taskList;
        }
    }

    $scope.deletePhoto = function (data)
    {
        var index = $scope.interestedUser.offerImages.indexOf(data);
        $scope.interestedUser.offerImages.splice(index, 1);
    }

    $scope.resetFilters = function()
    {
        commonService.reloadRoute();
        commonService.scrollToTop();
    }
    $rootScope.$on("imageAdded", function (event, fileUploaded, imageType) {
        if (fileUploaded) {
            $scope.errorMessageIndicator = false;
            if (imageType == "offerImages" && $scope.offerImages) { //push into array case and check if it exists.
                if ($scope.interestedUser.offerImages && $scope.interestedUser.offerImages.length < 3) {
                    $scope.interestedUser.offerImages.push(fileUploaded);
                    setTimeout(function () {
                        $('#offerImages').val("");
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
    $scope.numPages = function () {
        return Math.ceil($scope.taskList.length / $scope.numPerPage);
    };

    function browseAllTask() {
        $scope.pageNum = 1;
        $rootScope.loaderIndicator = true;
        httpService.browseAllTask($scope.pageNum).then(function (response) {
            $scope.taskList = response.data.data;
            $scope.taskList = $scope.taskList.map(getTaskDetails);
            console.log($scope.taskList);
            $scope.originalTaskList = $scope.taskList;
            //getCategoryDetails();
            $rootScope.loaderIndicator = false;
            //$scope.numPages();
            //$scope.$watch("currentPage + numPerPage", function () {
            //    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            //    , end = begin + $scope.numPerPage;
            //    $scope.filteredLists = $scope.taskList.slice(begin, end);
            //});

        });
    }

    function browseByCategory(categoryId) {
        $rootScope.loaderIndicator = true;
        $scope.pageNum = 1;
        httpService.browseTaskByCategory(categoryId, $scope.pageNum).then(function (response) {
            $scope.taskList = response.data.data;
            $scope.taskList = $scope.taskList.map(getTaskDetails);
            $rootScope.loaderIndicator = false;
            commonService.scrollToTop();
        });
    }

    function getTaskDetails(item) {
        item.category_question = angular.fromJson(item.category_question);
        return item;
    }

    $scope.openSelectedtaskInDetail = function (data) {
        if ($rootScope.isLogin) {
            $scope.interested = false;
            $scope.anchorDisable = true;
            $scope.anchorReplyDisable = true;
            $('#taskDetailModal').modal('toggle');
            $("#taskDetailModal").modal({ backdrop: "static" });
            $('#taskDetailModal').modal('show');
            $scope.taskDetail = {};
            $scope.taskDetail = data;
            $scope.taskDetail.category_Detail = {};
            $scope.getAllComments($scope.taskDetail.id);
            switch ($scope.taskDetail.category.name) {
                case CONSTANTS.CATEGORY.Catering:
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Catering.cateringType] = $scope.taskDetail.category_question['cateringType'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Catering.mealType] = $scope.taskDetail.category_question['mealType'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Catering.drinkType] = $scope.taskDetail.category_question['drinkType'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Catering.menuRequests] = $scope.taskDetail.category_question['menuRequests'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Catering.waitingRequire] = $scope.taskDetail.category_question['waitingRequire'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Catering.dietaryRequirement] = $scope.taskDetail.category_question['dietaryRequirement'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Catering.totalGuest] = $scope.taskDetail.category_question['totalGuest'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Catering.totalCost] = $scope.taskDetail.category_question['totalCost'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Catering.Cost] = $scope.taskDetail.category_question['Cost'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Catering.costType] = $scope.taskDetail.category_question['costType'];
                    $scope.showInterestCostType = $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Catering.costType];
                    break;
                case CONSTANTS.CATEGORY.Cleaning:
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.cleanersNeeded] = $scope.taskDetail.category_question['cleanersNeeded'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.cleaningChecklist] = $scope.taskDetail.category_question['cleaningChecklist'];
                    //JSON.stringify($scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.cleaningChecklist]);
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.cleaningChecklist] = $scope.taskDetail.category_question['cleaningChecklist'].join([separator = ',']);
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.equipmentRequired] = $scope.taskDetail.category_question['equipmentRequired'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.timeRequired] = $scope.taskDetail.category_question['timeRequired'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.Cost] = $scope.taskDetail.category_question['Cost'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.totalCost] = $scope.taskDetail.category_question['totalCost'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.costType] = $scope.taskDetail.category_question['costType'];
                    $scope.showInterestCostType = $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.costType];
                    break;
                case CONSTANTS.CATEGORY.Patisserie:
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.cakeTypes] = $scope.taskDetail.category_question['cakeTypes'].join([separator = ',']);
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.describeReq] = $scope.taskDetail.category_question['describeReq'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.desertType] = $scope.taskDetail.category_question['desertType'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.dietaryRequirement] = $scope.taskDetail.category_question['dietaryRequirement'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.numberOfDesert] = $scope.taskDetail.category_question['numberOfDesert'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.costType] = $scope.taskDetail.category_question['costType'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.totalCost] = $scope.taskDetail.category_question['totalCost'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.Cost] = $scope.taskDetail.category_question['Cost'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.desertImages] = $scope.taskDetail.category_question['desertImages'];
                    $scope.showInterestCostType = $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.costType];

                    break;
                case CONSTANTS.CATEGORY.Waiting_Staff:
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Waiting_Staff.dressCode] = $scope.taskDetail.category_question['dressCode'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Waiting_Staff.dressCodeDescription] = $scope.taskDetail.category_question['dressCodeDescription'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Waiting_Staff.totalCost] = $scope.taskDetail.category_question['totalCost'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Waiting_Staff.Cost] = $scope.taskDetail.category_question['Cost'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Waiting_Staff.totalCostType] = $scope.taskDetail.category_question['totalCostType'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Waiting_Staff.totalWaiter] = $scope.taskDetail.category_question['totalWaiter'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Waiting_Staff.waitersTask] = $scope.taskDetail.category_question['waitersTask'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Waiting_Staff.bartender_count] = $scope.taskDetail.category_question['bartender_count'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Waiting_Staff.is_bartender_req] = $scope.taskDetail.category_question['is_bartender_req'];
                    $scope.showInterestCostType = $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Waiting_Staff.totalCostType];
                    break;
                case CONSTANTS.CATEGORY.Graphic_Design:
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Graphic_Design.totalBudgetForbanners] = $scope.taskDetail.category_question['totalBudgetForbanners'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Graphic_Design.numberOfBanners] = $scope.taskDetail.category_question['numberOfBanners'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Graphic_Design.designPrinted] = $scope.taskDetail.category_question['designPrinted'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Graphic_Design.additionalInformation] = $scope.taskDetail.category_question['additionalInformation'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Graphic_Design.graphicBanners] = $scope.taskDetail.category_question['graphicBanners'].join([separator = ',']);
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Graphic_Design.graphicImages] = $scope.taskDetail.category_question['graphicImages'];
                    $scope.showInterestCostType = "Total Cost";
                    break;
                case CONSTANTS.CATEGORY.Supply_Hire:
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Supply_Hire.decriptionInDetail] = $scope.taskDetail.category_question['decriptionInDetail'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Supply_Hire.returnSupplies] = $scope.taskDetail.category_question['returnSupplies'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Supply_Hire.IscleaningPriceToBeIncluded] = $scope.taskDetail.category_question['IscleaningPriceToBeIncluded'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Supply_Hire.supplyTypes] = $scope.taskDetail.category_question['supplyTypes'].join([separator = ',']);;
                    $scope.showInterestCostType = "Total Cost";
                    break;
                case CONSTANTS.CATEGORY.Hair_and_Beauty:
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Hair_and_Beauty.hairStyleRequired] = $scope.taskDetail.category_question['hairStyleRequired'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Hair_and_Beauty.location] = $scope.taskDetail.category_question['location'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Hair_and_Beauty.makeUpTypeRequired] = $scope.taskDetail.category_question['makeUpTypeRequired'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Hair_and_Beauty.needToBring] = $scope.taskDetail.category_question['needToBring'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Hair_and_Beauty.specialRequestsForHairStyle] = $scope.taskDetail.category_question['specialRequestsForHairStyle'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Hair_and_Beauty.specialRequirement] = $scope.taskDetail.category_question['specialRequirement'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Hair_and_Beauty.serviceType] = $scope.taskDetail.category_question['serviceType'].join([separator = ',']);
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Hair_and_Beauty.hairType] = $scope.taskDetail.category_question['hairType'].join([separator = ',']);;;
                    $scope.showInterestCostType = "Total Cost";
                    break;
                case CONSTANTS.CATEGORY.Entertainment_and_talent:
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Entertainment_and_talent.entertainerRequired] = $scope.taskDetail.category_question['entertainerRequired'].join([separator = ',']);
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Entertainment_and_talent.equipmentReadyForTalent] = $scope.taskDetail.category_question['equipmentReadyForTalent'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Entertainment_and_talent.thingsRequiredForTalent] = $scope.taskDetail.category_question['thingsRequiredForTalent'];
                    $scope.showInterestCostType = "Total Cost";
                    break;
                case CONSTANTS.CATEGORY.Car_and_Venue_Hire:
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.carType] = $scope.taskDetail.category_question['carType'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.hireType] = $scope.taskDetail.category_question['hireType'].join([separator = ',']);;
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.totalCars] = $scope.taskDetail.category_question['totalCars'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.totalCost] = $scope.taskDetail.category_question['totalCost'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.Cost] = $scope.taskDetail.category_question['Cost'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.totalCostType] = $scope.taskDetail.category_question['totalCostType'];
                    $scope.showInterestCostType = $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.totalCostType];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.totalGuest] = $scope.taskDetail.category_question['totalGuest'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.venueCleaning] = $scope.taskDetail.category_question['venueCleaning'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.venueType] = $scope.taskDetail.category_question['venueType'];
                    $scope.showInterestCostType = $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.totalCostType];
                    break;
                case CONSTANTS.CATEGORY.Floristry:
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Floristry.arrangementPresentation] = $scope.taskDetail.category_question['arrangementPresentation'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Floristry.costType] = $scope.taskDetail.category_question['costType'];
                    $scope.showInterestCostType = $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Floristry.costType];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Floristry.flowersRequiredDescription] = $scope.taskDetail.category_question['flowersRequiredDescription'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Floristry.specialRequestDesc] = $scope.taskDetail.category_question['specialRequestDesc'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Floristry.totalCost] = $scope.taskDetail.category_question['totalCost'];
                    $scope.showInterestCostType = $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Floristry.costType];
                    break;
                case CONSTANTS.CATEGORY.Photography_Videography:
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Photography_Videography.eventRequirement] = $scope.taskDetail.category_question['eventRequirement'].join([separator = ',']);;;
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Photography_Videography.totalPhotographerRequired] = $scope.taskDetail.category_question['totalPhotographerRequired'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Photography_Videography.additionalComments] = $scope.taskDetail.category_question['additionalComments'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Photography_Videography.placesRequiredForPhotographers] = $scope.taskDetail.category_question['placesRequiredForPhotographers'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Photography_Videography.servicesRequired] = $scope.taskDetail.category_question['servicesRequired'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Photography_Videography.totalGuest] = $scope.taskDetail.category_question['totalGuest'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Photography_Videography.servicesRequiredVideographer] = $scope.taskDetail.category_question['servicesRequiredVideographer'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Photography_Videography.totalvideographerRequired] = $scope.taskDetail.category_question['totalvideographerRequired'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Photography_Videography.totalGuestVideography] = $scope.taskDetail.category_question['totalGuestVideography'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Photography_Videography.placesRequiredForVideographer] = $scope.taskDetail.category_question['placesRequiredForVideographer'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Photography_Videography.additionalCommentsVideographer] = $scope.taskDetail.category_question['additionalCommentsVideographer'];
                    $scope.showInterestCostType = "Total cost";
                    break;
                default:
               
            }
            //$scope.taskDetail.category_question = angular.fromJson($scope.taskDetail.category_question);
        }
        else {

            $('#promptLoginPopup').modal('show');

        }
    }

    $scope.formatDate = function (date) {
        var dateOut = new Date(date);
        return dateOut;
    };

    $scope.showInterest = function (data) {
        if ($rootScope.isLogin == true) {
            //$rootScope.loaderIndicator = true;

            $scope.showInterestForm.$setSubmitted(true);
            if ($scope.showInterestForm.$valid) {
                var interestedUser = {};
                interestedUser.taskId = data.id;
                interestedUser.taskPostedUserID = data.post_user_id;
                interestedUser.showInterestedUserID = commonService.getUserid();
                interestedUser.taskStatus = "looking_user_offers";
                interestedUser.offerCost = $scope.interestedUser.offerCost;
                interestedUser.showInterestCostType = $scope.interestedUser.showInterestCostType;
                interestedUser.commentDescription = $scope.interestedUser.commentDescription;
                if ($scope.interestedUser.offerImages.length > 0 ) {
                    interestedUser.offerImages = $scope.interestedUser.offerImages;
                }
                $rootScope.loaderIndicator = false;
                httpService.showInterest(interestedUser).then(function (response) {
                    $rootScope.loaderIndicator = false;
                    if (response.data.code == 200) {
                        ////$rootScope.loaderIndicator = false;
                        //$scope.interestMsg = "Thank you for showing interest in this task. Buisness will get back to you shortly.";
                        //$scope.interested = true;
                        $('#showInterestPopup').modal('hide');
                        $('#sucessShowInterestPopup').modal('show');
                        $scope.interestedUser = {};
                    }
                });
            }
            else {
                $scope.errorMessage = true;
            }
        }
        else {
            $('#taskDetailModal').modal('toggle');
            $('#promptLoginPopup').modal('show');
        }
    }

    $scope.seeMoreClick = function () {
        $scope.pageNum = $scope.pageNum + 1;
        httpService.browseAllTask($scope.pageNum).then(function (response) {
            var temptaskList = response.data.data;
            if(temptaskList.length > 0){
            temptaskList = temptaskList.map(getTaskDetails);
            if (temptaskList.length > 0)
            $.merge($scope.taskList, temptaskList);
            $rootScope.loaderIndicator = false;    
            } else {
                $('#seeMore').hide();
                $('#noRecord').show();

            }
          
        });
    }

    $scope.addComment = function () {
        if ($scope.commentDescription) {
            var comment = {};
            comment.commentDescription = $scope.commentDescription;
            comment.taskId = $scope.taskDetail.id;
            comment.userId = commonService.getUserid();
            $rootScope.loaderIndicator = true;
            httpService.postComment(comment).then(function (data) {
                if (data.data.message == "comment posted successfully.") {
                    //get comment list
                    $scope.commentDescription = "";
                    $scope.getAllComments($scope.taskDetail.id);
                    $rootScope.loaderIndicator = false;
                }
            });
        }
    }

    $scope.addCommentChange = function()
    {
        if ($scope.commentDescription && $scope.commentDescription != "") {
           $scope.anchorDisable = false;
        }
        else {
            $scope.anchorDisable = true;
        }
    }

    $scope.getAllComments = function(taskId)
    {
        $scope.commentList = {};
        httpService.getAllComment(taskId).then(function (data) {
            $rootScope.loaderIndicator = true;
            if (data.data.message == 'Comments list') {
                //get comment list
                $scope.commentList = data.data.data;
                $scope.countIndicator = $scope.commentList.length;
                $rootScope.loaderIndicator = false;
            }
            else {
                this.commentIndicator = false;
                $rootScope.loaderIndicator = false;
            }
        });
    }

    $scope.replyComment = function (replyCommentDesc, commentId)
    {
        var comment = {};
        comment.commentDescription = replyCommentDesc;
        comment.taskId = $scope.taskDetail.id;
        comment.userId =  commonService.getUserid();
        comment.commentId = commentId;
        $rootScope.loaderIndicator = true;;
        httpService.replyComment(comment).then(function(data)
        {
            if(data.data.message == 'Comment replied!')
            {
                $scope.replyCommentDesc = "";
                $scope.getAllComments($scope.taskDetail.id);
                comment = {};
            }
        });
    }

    $scope.onReply = function(item)
    {
        $('#item_' + item.id).show();
        $scope.anchorDisable = true;
    }

    $scope.addCommentReplyChange = function (replyCommentDesc)
    {
        if (replyCommentDesc && replyCommentDesc != "") {
            $scope.anchorReplyDisable = false;
        }
        else {
            $scope.anchorReplyDisable = true;;
        }
    }

    $scope.checkIfReplyExists = function(id, List)
    {
        $scope.repliedObjectList = {};
        $scope.repliedObjectList = $.grep(List, function (x) {
            return x.commentId === id;
        });
        if($scope.repliedObjectList.length > 0 )
        {
            return true;
        }
        else{
            return false;
        }
    }

    function parseDate(input) {
        var parts = input.split('-');
        return new Date(parts[2], parts[1] - 1, parts[0]);
    }

    app.filter("dateFilter", function () {
        return function (items) {
           
        };
    });

   
}]);


        
       
    

