app.controller('browseTaskCtrl', function ($scope, httpService, $rootScope, commonService) {
    init();

    function init() {
        browseAllTask();
        $scope.currentPage = 1;
        $scope.numPerPage = 5;
        $scope.maxSize = 5;
       
    }
   
   

    function browseAllTask()
    {
        $rootScope.loaderIndicator = true;
        httpService.browseAllTask().then(function (response) {
            $scope.taskList = response.data.data;
            //$scope.taskList = $scope.taskList.map(getCategoryDetails);
            //getCategoryDetails();
            $rootScope.loaderIndicator = false;

            $scope.$watch("currentPage + numPerPage", function () {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;
                $scope.filteredLists = $scope.taskList.slice(begin, end);
            });

        });
    }

    function getCategoryDetails()
    {
        for(i=0; i< $scope.taskList.length; i++)
        {
            for(j=0; j < $rootScope.categoryList.length ; j++)
            {
                if ($scope.taskList[i].category_id == $rootScope.categoryList[j].id)
                    $scope.taskList[i].categoryImage = $rootScope.categoryList[j].categoryImage;

            }
        }
    }

});