app.controller('browseTaskCtrl', function ($scope, httpService, $rootScope, commonService, CONSTANTS) {

    $scope.currentPage = 1;
    $scope.numPerPage = 4;
    $scope.maxSize = 5;
    $scope.taskList = [];
    init();

    function init() {
        browseAllTask();
        getAllCategoryFilters();
    }
   
    function getAllCategoryFilters()
    {
        httpService.getCategory().then(function (data) {
          $scope.categoryList = data.data.data;
        });
    }
   
    $scope.numPages = function () {
        return Math.ceil($scope.taskList.length / $scope.numPerPage);
    };

    function browseAllTask()
    {
        $rootScope.loaderIndicator = true;
        httpService.browseAllTask().then(function (response) {
            $scope.taskList = response.data.data;
            $scope.taskList = $scope.taskList.map(getTaskDetails);
            console.log($scope.taskList);
            //getCategoryDetails();
            $rootScope.loaderIndicator = false;
            //$scope.numPages();
            $scope.$watch("currentPage + numPerPage", function () {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;
                $scope.filteredLists = $scope.taskList.slice(begin, end);
            });

        });
    }

    function getTaskDetails(item)
    {
        item.category_question = angular.fromJson(item.category_question);
        return item;
    }

    $scope.openSelectedtaskInDetail = function(data)
    {              
            $('#taskDetailModal').modal('toggle');
            $("#taskDetailModal").modal({ backdrop: "static" });
            $('#taskDetailModal').modal('show');
            $scope.taskDetail = {};
            $scope.taskDetail = data;
            $scope.taskDetail.category_Detail = {};
            console.log($scope.taskDetail.category_question);
            switch ($scope.taskDetail.category.name) {
                case CONSTANTS.CATEGORY.Catering :
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
                    JSON.stringify($scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.cleaningChecklist]);
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.equipmentRequired] = $scope.taskDetail.category_question['equipmentRequired'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.timeRequired] = $scope.taskDetail.category_question['timeRequired'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.totalCost] = $scope.taskDetail.category_question['totalCost'];
                    $scope.taskDetail.category_Detail[CONSTANTS.CATEGORY_QUESTIONS.Cleaning.costType] = $scope.taskDetail.category_question['costType'];
                    break;
                case 'Catering':
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
                case 'Catering':
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
                case 'Catering':
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
                case 'Catering':
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
                case 'Catering':
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
                case 'Catering':
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
                case 'Catering':
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
                case 'Catering':
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
                case 'Catering':
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
                default:

            }
            //$scope.taskDetail.category_question = angular.fromJson($scope.taskDetail.category_question);
            
    }

});