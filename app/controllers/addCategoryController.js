app.controller("addCategoryController", ['$scope', 'httpService', '$rootScope', function ($scope, httpService, $rootScope) {

    $scope.addNewCategory = addNewCategory;
    $scope.ModalClose = ModalClose;

    init();
    function init()
    {
        $scope.category = {};
    }
    function addNewCategory()
    {
        $scope.addCategoryForm.$setSubmitted(true);
        if ($scope.addCategoryForm.$valid) {
            $rootScope.loaderIndicator = true;
            httpService.addCategory($scope.category).then(function (data) {
                if(data.data.message == 'category created successfully.')
                {
                    $rootScope.loaderIndicator = false;
                    $scope.successMessageIndicator = true;
                    $scope.ErrorIndicator = false;
                    $scope.message = "Category added successfully.";
                    $scope.category = {};
                    $('#categoryName').val("");
                    $('#categoryImage').val("");
                    $rootScope.$broadcast("addedCategory", function () {
                    });
                }
                else
                {
                    if (data.data.message == "Request URL not available") {
                        $rootScope.loaderIndicator = false;
                        $scope.message = "Something went wrong. Technical issues."
                        $scope.ErrorIndicator = true;
                    }
                    else {
                        $rootScope.loaderIndicator = false;
                        $scope.message = "Category name already exists."
                        $scope.ErrorIndicator = true;
                    }
                }
            });
        }
        else {
            $scope.message = "Please enter category name."
            $scope.ErrorIndicator = true;
            $scope.successMessageIndicator = false;
        }
    }

    function ModalClose()
    {
        $scope.category = {};
        $scope.ErrorIndicator = false;
        $scope.successMessageIndicator = false;
        angular.element('#categoryName').removeClass('error');
    }

  
}]);