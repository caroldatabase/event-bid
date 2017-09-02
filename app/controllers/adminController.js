app.controller('adminCtrl', function ($scope, httpService, $rootScope) {
    init();

    function init()
    {
        $scope.categoryIndicator = false;
        $scope.blogIndicator = false;
        getCategory();
    }

    //category section 
    $scope.openCategorySection = function()
    {
        $scope.categoryIndicator = true;
        $scope.blogIndicator = false;
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
    }

    $scope.openAddBlogPopup = function () {
        $('#addBlogPopup').modal('show');
    }

});