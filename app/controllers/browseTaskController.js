app.controller('browseTaskCtrl', function ($scope, httpService, $rootScope, commonService) {
    init();

    function init() {
        browseAllTask();
        $scope.currentPage = 1;
        $scope.numPerPage = 5;
        $scope.maxSize = 5;
        getAllCategoryFilters();
    }
   
    function getAllCategoryFilters()
    {
        httpService.getCategory().then(function (data) {
          $scope.categoryList = data.data.data;
        });
    }
   

    function browseAllTask()
    {
        $rootScope.loaderIndicator = true;
        httpService.browseAllTask().then(function (response) {
            $scope.taskList = response.data.data;
            $scope.taskList = $scope.taskList.map(getTaskDetails);
            console.log($scope.taskList);
            //getCategoryDetails();
            $rootScope.loaderIndicator = false;

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
            $scope.taskDetail = data
            //$scope.taskDetail.category_question = angular.fromJson($scope.taskDetail.category_question);
            console.log(data);
    }

});