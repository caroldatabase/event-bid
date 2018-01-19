app.controller('adminCtrl', ['$scope','commonService', 'httpService', '$rootScope', function ($scope,commonService, httpService, $rootScope) {
    init();

    function init()
    {
        commonService.checkUserLoggedIn();
        $scope.categoryIndicator = false;
        $scope.blogIndicator = false;
        $scope.taskIndicator = false;
        $scope.userIndicator = false;
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
        $scope.userIndicator = false;
    }
    $scope.openUserSection = function()
    {
        $scope.categoryIndicator = false;
        $scope.blogIndicator = false;
        $scope.taskIndicator = false;
        $scope.userIndicator = true;
            getUserList();
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
                $rootScope.loaderIndicator = false;
            });
        
    }
    function getUserList()
    {
        $rootScope.loaderIndicator = true;
            httpService.allUserDetails().then(function (response) {
                     if (response.data.message == "Transaction Found!") {
                        $scope.userList = response.data.data;
                        $rootScope.loaderIndicator = false;
                         $scope.userIndicator=true;
                        
                    } else {
                        $rootScope.loaderIndicator = false;
                    }
                
                $rootScope.loaderIndicator = false;
            });
        
    }
     $scope.deactivateUser=function (userid){
         $rootScope.loaderIndicator = true;
         var userId = commonService.getUserid();
            httpService.deactivate(userId).then(function (response) {
                     if (response.data.message == "User deactivated!") {
                        $rootScope.loaderIndicator = false;
                        alert("User deactivated successfully");
                        $scope.userIndicator=true;                      
                    } else {
                        $rootScope.loaderIndicator = false;
                    }
                
                $rootScope.loaderIndicator = false;
            });
    }

    $rootScope.$on("addedCategory", function (event, args) {
        getCategory();
    });

    $rootScope.$on("addedBlogs", function (event, args) {
        getAllBlogs();
    });

    $scope.openBlogSection = function()
    {
        $scope.categoryIndicator = false;
        $scope.blogIndicator = true;
        $scope.taskIndicator = false;
        $scope.userIndicator = false;
        getAllBlogs();
    }

    $scope.openTaskSection = function () {
        $scope.categoryIndicator = false;
        $scope.blogIndicator = false;
        $scope.taskIndicator = true;
        $scope.userIndicator = false;
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

    function getAllBlogs()
    {
        $rootScope.loaderIndicator = true;
        httpService.getAllBlogs().then(function (response) {
            $scope.blogList = response.data.data;
            console.log($scope.blogList)
            $rootScope.loaderIndicator = false;
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

    $scope.deleteBlog = function(data)
    {
        var r = confirm("Are you sure you want to delete this Blog?");
        if (r == true) {
            $rootScope.loaderIndicator = true;
            httpService.deleteBlog(data.id).then(function (response) {
                getAllBlogs();
                $rootScope.loaderIndicator = false;
            });
        }
    }

}]);