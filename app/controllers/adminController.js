app.controller('adminCtrl', function ($scope, httpService, $rootScope) {
    init();

    function init()
    {
        getCategory();
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
        httpService.getCategory().then(function (response) {
            $scope.categories = response.data.data;
        });
    }

    $rootScope.$on("addedCategory", function (event, args) {
        getCategory();
    });
});