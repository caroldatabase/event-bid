app.controller("addCategoryController", ['$scope', 'httpService', '$rootScope', function ($scope, httpService, $rootScope) {

    $scope.addNewCategory = addNewCategory;
    $scope.ModalClose = ModalClose;

    init();
    function init()
    {

    }
    function addNewCategory()
    {
        $scope.addCategoryForm.$setSubmitted(true);
        if ($scope.addCategoryForm.$valid) {
            $rootScope.loaderIndicator = true;
            httpService.addCategory($scope.categoryName).then(function (data) {
                if(data.data.message == 'category created successfully.')
                {
                    $rootScope.loaderIndicator = false;
                    $scope.successMessageIndicator = true;
                    $scope.ErrorIndicator = false;
                    $scope.message = "Category added successfully.";
                    $scope.categoryName = null;
                }
                else
                {
                    $rootScope.loaderIndicator = false;
                    $scope.message = "Category name already exists."
                    $scope.ErrorIndicator = true;
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
        $scope.categoryName = null;
        $scope.ErrorIndicator = false;
        $scope.successMessageIndicator = false;
        angular.element('#categoryName').removeClass('error');
    }
}]);