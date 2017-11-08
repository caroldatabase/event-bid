app.controller('buisnessDashboardCtrl', ['$scope', 'commonService', '$rootScope','httpService','CONSTANTS',
    function ($scope, commonService, $rootScope, httpService, CONSTANTS) {
        init();
        function init()
        {
            commonService.checkUserLoggedIn();
            $scope.potentialJobsIndicator = false;
            $scope.jobsInProgressIndicator = false;
            $scope.jobsNeedActionIndicator = false;
            $scope.jobsCompletedIndicator = false;
            $scope.invoicesIndicator = false;
            $scope.deleteMsg = false;
            $scope.assignMsg = false;
            $scope.reviewsIndicator = false;
            $scope.buisnessDashboardIndicator = true;
            getBuisnessTaskOpen();
            
        }

        $scope.openSelectedtaskInDetail = function (data) {
            $('#OpenTaskModal').modal('toggle');
            $("#OpenTaskModal").modal({ backdrop: "static" });
            $('#OpenTaskModal').modal('show');
            $scope.taskDetail = {};
            $scope.taskDetail = data;
            $scope.taskDetail.category_Detail = {};
            $scope.taskDetail.category_question = angular.fromJson(data.category_question);
            getInterestedUsersList(data.id);
            getTaskDetail();
        }
        function getTaskDetail()
        {
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
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Catering.costType] = $scope.taskDetail.category_question['costType'];
                    break;
                case CONSTANTS.CATEGORY.Cleaning:
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.cleanersNeeded] = $scope.taskDetail.category_question['cleanersNeeded'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.cleaningChecklist] = $scope.taskDetail.category_question['cleaningChecklist'];
                    //JSON.stringify($scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.cleaningChecklist]);

                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.equipmentRequired] = $scope.taskDetail.category_question['equipmentRequired'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.timeRequired] = $scope.taskDetail.category_question['timeRequired'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.totalCost] = $scope.taskDetail.category_question['totalCost'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.costType] = $scope.taskDetail.category_question['costType'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.cleaningChecklist]
                       = $scope.taskDetail.category_question['cleaningChecklist'].join([separator = ',']);
                    break;
                case CONSTANTS.CATEGORY.Patisserie:
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.cakeTypes] = $scope.taskDetail.category_question['cakeTypes'].join([separator = ',']);
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.describeReq] = $scope.taskDetail.category_question['describeReq'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.desertType] = $scope.taskDetail.category_question['desertType'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.dietaryRequirement] = $scope.taskDetail.category_question['dietaryRequirement'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.numberOfDesert] = $scope.taskDetail.category_question['numberOfDesert'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.costType] = $scope.taskDetail.category_question['costType'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.totalCost] = $scope.taskDetail.category_question['totalCost'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Patisserie.desertImages] = $scope.taskDetail.category_question['desertImages'];

                    break;
                case CONSTANTS.CATEGORY.Waiting_Staff:
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Waiting_Staff.dressCode] = $scope.taskDetail.category_question['dressCode'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Waiting_Staff.dressCodeDescription] = $scope.taskDetail.category_question['dressCodeDescription'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Waiting_Staff.totalCost] = $scope.taskDetail.category_question['totalCost'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Waiting_Staff.totalCostType] = $scope.taskDetail.category_question['totalCostType'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Waiting_Staff.totalWaiter] = $scope.taskDetail.category_question['totalWaiter'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Waiting_Staff.waitersTask] = $scope.taskDetail.category_question['waitersTask'];

                    break;
                case CONSTANTS.CATEGORY.Graphic_Design:
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Graphic_Design.totalBudgetForbanners] = $scope.taskDetail.category_question['totalBudgetForbanners'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Graphic_Design.numberOfBanners] = $scope.taskDetail.category_question['numberOfBanners'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Graphic_Design.designPrinted] = $scope.taskDetail.category_question['designPrinted'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Graphic_Design.additionalInformation] = $scope.taskDetail.category_question['additionalInformation'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Graphic_Design.graphicBanners] = $scope.taskDetail.category_question['graphicBanners'].join([separator = ',']);
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Graphic_Design.graphicImages] = $scope.taskDetail.category_question['graphicImages'];
                    break;
                case CONSTANTS.CATEGORY.Supply_Hire:
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Supply_Hire.decriptionInDetail] = $scope.taskDetail.category_question['decriptionInDetail'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Supply_Hire.returnSupplies] = $scope.taskDetail.category_question['returnSupplies'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Supply_Hire.IscleaningPriceToBeIncluded] = $scope.taskDetail.category_question['IscleaningPriceToBeIncluded'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Supply_Hire.supplyTypes] = $scope.taskDetail.category_question['supplyTypes'].join([separator = ',']);;
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

                    break;
                case CONSTANTS.CATEGORY.Entertainment_and_talent:
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Entertainment_and_talent.entertainerRequired] = $scope.taskDetail.category_question['entertainerRequired'].join([separator = ',']);
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Entertainment_and_talent.equipmentReadyForTalent] = $scope.taskDetail.category_question['equipmentReadyForTalent'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Entertainment_and_talent.thingsRequiredForTalent] = $scope.taskDetail.category_question['thingsRequiredForTalent'];
                    break;
                case CONSTANTS.CATEGORY.Car_and_Venue_Hire:
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.carType] = $scope.taskDetail.category_question['carType'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.hireType] = $scope.taskDetail.category_question['hireType'].join([separator = ',']);;
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.totalCars] = $scope.taskDetail.category_question['totalCars'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.totalCost] = $scope.taskDetail.category_question['totalCost'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.totalCostType] = $scope.taskDetail.category_question['totalCostType'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.totalGuest] = $scope.taskDetail.category_question['totalGuest'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.venueCleaning] = $scope.taskDetail.category_question['venueCleaning'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Car_and_Venue_Hire.venueType] = $scope.taskDetail.category_question['venueType'];
                    break;
                case CONSTANTS.CATEGORY.Floristry:
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Floristry.arrangementPresentation] = $scope.taskDetail.category_question['arrangementPresentation'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Floristry.costType] = $scope.taskDetail.category_question['costType'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Floristry.flowersRequiredDescription] = $scope.taskDetail.category_question['flowersRequiredDescription'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Floristry.specialRequestDesc] = $scope.taskDetail.category_question['specialRequestDesc'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Floristry.totalCost] = $scope.taskDetail.category_question['totalCost'];
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

                    break;
                default:
            }
        }
        $scope.openProgresstaskInDetail = function(data)
        {
            $('#progressTaskModal').modal('toggle');
            $("#progressTaskModal").modal({ backdrop: "static" });
            $('#progressTaskModal').modal('show');
            $scope.taskDetail = {};
            $scope.taskDetail = data;
            $scope.taskDetail.category_Detail = {};
            $scope.taskDetail.category_question = angular.fromJson(data.category_question);
            getTaskDetail();
        }
        function getInterestedUsersList(taskid)
        {
            $rootScope.loaderIndicator = true;
            httpService.getInterestedUsersList(taskid).then(function (response) {
                $rootScope.loaderIndicator = false;
                if(response.data.code == 200)
                {
                    $scope.interestedUsersList = response.data.data;
                    $scope.interestedUsersListCount = $scope.interestedUsersList.length;
                }
                else
                {
                    $scope.interestedUsersListCount = 0;
                }
            });
        }
        $scope.assignTaskToUser = function (item)
        {
            $rootScope.loaderIndicator = true;
            $scope.assignTask = {};
            $scope.assignTask.taskId = item.taskId;
            $scope.assignTask.taskPostedUserID = item.taskPostedUserID;
            $scope.assignTask.assignUserID = item.showInterestedUserID;
            $scope.assignTask.taskStatus = "assigned";
            httpService.assignUser($scope.assignTask).then(function (response) {
                $('#OpenTaskModal').modal('hide');
                alert("task assigned successfully");
                getBuisnessTaskOpen();
                $rootScope.loaderIndicator = false;
            });
        }
        $scope.deleteTask = function(data)
        {
            var r = confirm("Are you sure you want to delete this task ?");
            if (r == true) {
                httpService.deleteTask(data.id).then(function (response) {
                    $('#OpenTaskModal').modal('hide');
                    getBuisnessTask();
                });
            }

        }
        function getBuisnessTaskOpen()
        {
            $rootScope.loaderIndicator = true;
            httpService.getBuisnessTask($rootScope.userID).then(function (response) {
                console.log(response);
                if (response.data.code == 200) {
                    if(response.data.data.openTask)
                    {
                        $scope.potentialJobsIndicator = true;
                        $rootScope.loaderIndicator = false;
                        $scope.openTask = [];
                        $scope.openTask = response.data.data.openTask;
                    }
                    if (response.data.data.progressTask) {
                        $scope.jobsInProgressIndicator = true;
                        $rootScope.loaderIndicator = false;
                        $scope.progressTask = [];
                        $scope.progressTask = response.data.data.progressTask;
                    }
                    
                }
                else if (response.data.code == 404) {
                    $rootScope.loaderIndicator = false;
                    $scope.potentialJobsIndicator = false;
                    $scope.jobsInProgressIndicator = false;
                    $scope.openTask = [];
                }
            });
        }

       
        function getCustomerTask() {
            $rootScope.loaderIndicator = true;
            httpService.getCustomerTask($rootScope.userID).then(function (response) {
                console.log(response);
                if (response.data.code == 200) {
                    if (response.data.data.openTask) {
                        $scope.potentialJobsCustomerIndicator = true;
                        $rootScope.loaderIndicator = false;
                        $scope.openTaskCustomer = [];
                        $scope.openTaskCustomer = response.data.data.openTask;
                    }
                    if (response.data.data.progressTask) {
                        $scope.jobsInProgressCustomerIndicator = true;
                        $rootScope.loaderIndicator = false;
                        $scope.progressTaskCustomer = [];
                        $scope.progressTaskCustomer = response.data.data.progressTask;
                    }

                }
                else if (response.data.code == 404) {
                    $rootScope.loaderIndicator = false;
                    $scope.potentialJobsCustomerIndicator = false;
                    $scope.jobsInProgressCustomerIndicator = false;
                    $scope.openTaskCustomer = [];
                }
            });
        }
        $scope.showBuisnessTab = function()
        {
            $scope.buisnessDashboardIndicator = true;
            $scope.customerDashboardIndicator = false;
        }
        $scope.showCustomerTab = function () {
            $scope.buisnessDashboardIndicator = false;
            $scope.customerDashboardIndicator = true;
            getCustomerTask()
        }
        $scope.completeTask = function (data) {
            
            $rootScope.loaderIndicator = true;
            var task = {};
            var id = data.id;
            task.task_status = "completed";
            httpService.updateTask(id, task).then(function (response) {
                $('#progressTaskModal').modal('hide');
                getBuisnessTaskOpen();
                $rootScope.loaderIndicator = false;
            });
        }
}])