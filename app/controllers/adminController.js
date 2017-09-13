app.controller('adminCtrl', function ($scope, httpService, $rootScope) {
    init();

    function init()
    {
        $scope.categoryIndicator = false;
        $scope.blogIndicator = false;
        $scope.taskIndicator = false; 
        getCategory();
        $scope.currentPage = 1;
        $scope.numPerPage = 5;
        $scope.maxSize = 5;
    }

    //category section 
    $scope.openCategorySection = function()
    {
        $scope.categoryIndicator = true;
        $scope.blogIndicator = false;
        $scope.taskIndicator = false;
    }

    $scope.openAddCategoryPopup = function () {
        $('#addCategoryPopup').modal('show');
        $('#categoryName').val(""); 
        $('#categoryImage').val("");
       
    }

    $scope.deleteCategory = function(data)
    {
        var r = confirm("Are you sure you want to delete category ?");
        if (r == true) {
            $rootScope.loaderIndicator = true;
            httpService.deleteCategory(data.id).then(function (response) {
                getCategory();
                $rootScope.loaderIndicator = false;
            });
        }
    }

    function getCategory()
    {
        $rootScope.loaderIndicator = true;
        httpService.getCategory().then(function (response) {
            $scope.categories = response.data.data;
            console.log($scope.categories);
            $rootScope.loaderIndicator = false;
        });
    }

    $rootScope.$on("addedCategory", function (event, args) {
        getCategory();
    });

    $rootScope.$on("addedBlogs", function (event, args) {
       // getCategory();
    });

    $scope.openBlogSection = function()
    {
        $scope.categoryIndicator = false;
        $scope.blogIndicator = true;
        $scope.taskIndicator = false;
    }

    $scope.openTaskSection = function () {
        $scope.categoryIndicator = false;
        $scope.blogIndicator = false;
        $scope.taskIndicator = true;
        getAllTask();
    }

    function getAllTask() {
        $rootScope.loaderIndicator = true;
        httpService.browseAllTask().then(function (response) {
            $scope.taskList = response.data.data;
            $rootScope.loaderIndicator = false;
            $scope.$watch("currentPage + numPerPage", function () {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;
                $scope.filteredLists = $scope.taskList.slice(begin, end);
            });

        });
    }

    $scope.openAddBlogPopup = function () {
        $('#addBlogPopup').modal('show');
    }

    $scope.deleteTask = function(data)
    {
        var r = confirm("Are you sure you want to delete this Task ?");
        if (r == true) {
            $rootScope.loaderIndicator = true;
            httpService.deleteTask(data.id).then(function (response) {
                getAllTask();
                $rootScope.loaderIndicator = false;
            });
        }
    }

});