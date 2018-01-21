app.controller('adminCtrl', ['$scope', 'commonService', 'httpService', '$rootScope', '$location', '$window','$routeParams',
function ($scope, commonService, httpService, $rootScope, $location, $window, $routeParams) {
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
        var userId = commonService.getUserid();
        if ($routeParams.payments)
        {
            $scope.categoryIndicator = false;
            $scope.blogIndicator = false;
            $scope.taskIndicator = false;
            $scope.userIndicator = false;
            $scope.paymentIndicator = true;
            $scope.insuranceIndicator = false;
            getPaymentManagement();
        }
        if(userId!=36){
            commonService.deleteCookieValues('FirstName');
            commonService.deleteCookieValues('UserID');
            commonService.deleteCookieValues('UserType');
            commonService.deleteCookieValues('Photo');
            $rootScope.isLogin = false;
            $rootScope.adminIndicator = false;
            commonService.reloadRoute();  
            $location.path('/');
        }
    }

    //category section 
    $scope.openCategorySection = function()
    {
        $scope.categoryIndicator = true;
        $scope.blogIndicator = false;
        $scope.taskIndicator = false;
        $scope.userIndicator = false;
        $scope.paymentIndicator = false;
        $scope.insuranceIndicator = false;
    }
    $scope.openInsuranceQualificationSection = function()
    {

        $scope.categoryIndicator = false;
        $scope.blogIndicator = false;
        $scope.taskIndicator = false;
        $scope.userIndicator = false;
        $scope.paymentIndicator = false;
        $scope.insuranceIndicator = true;
        getInsuranceList();
        getQualificationList();
    }
    $scope.openUserSection = function()
    {
        $scope.categoryIndicator = false;
        $scope.blogIndicator = false;
        $scope.taskIndicator = false;
        $scope.userIndicator = true;
            getUserList();
    }
    $scope.openPaymentSection = function()
    {
        $scope.categoryIndicator = false;
        $scope.blogIndicator = false;
        $scope.taskIndicator = false;
        $scope.userIndicator = false;
        $scope.paymentIndicator = true;
        $scope.insuranceIndicator = false;
        getPaymentManagement();
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
        $scope.paymentIndicator = false;
        $scope.insuranceIndicator = false;
        getAllBlogs();
    }

    $scope.openTaskSection = function () {
        $scope.categoryIndicator = false;
        $scope.blogIndicator = false;
        $scope.taskIndicator = true;
        $scope.userIndicator = false;
        $scope.paymentIndicator = false;
        $scope.insuranceIndicator = false;
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

    function getPaymentManagement()
    {
        $rootScope.loaderIndicator = true;
        httpService.getCompletedTaskList().then(function (response) {
            $rootScope.loaderIndicator = false;
            $scope.taskList = response.data.data;
            for (var i = 0; i < $scope.taskList.length; i++) {
                $scope.taskList[i].category_question = JSON.parse($scope.taskList[i].category_question);
            }
        });

    }
    $scope.releasePayment = function()
    {
      $rootScope.loaderIndicator = true;
        var param={
              "actionType": "PAY",
              "currencyCode": "USD",
              "receiverList": {
                "receiver": [{
                  "amount": "0.04",
                  "email": "kanikasethi04@gmail.com"  // this email ll be paypal login user email of reciever
                }]
              },
              "returnUrl": "http://uat.eventbid.com.au/#/admin",  // set success url
              "cancelUrl": "http://uat.eventbid.com.au/#/admin", // set cancel url
              "requestEnvelope": {
                "errorLanguage": "en_US",
                "detailLevel": "ReturnAll"
              }
            }
             httpService.paypal(param).then(function (response) {
                 
                 if(response.data.message=="PayKey Generated"){
                     $rootScope.loaderIndicator = false;
                      $window.location.href=' https://www.sandbox.paypal.com/webapps/adaptivepayment/flow/pay?paykey=' +response.data.data.payKey;
                 }else{
                     $rootScope.loaderIndicator = false;
                 }
        });
    }

    function getInsuranceList()
    {
        $rootScope.loaderIndicator = true;
        httpService.getInsurance().then(function (response) {
            $rootScope.loaderIndicator = false;
            $scope.insuranceList = response.data.data;
            console.log($scope.insuranceList);
        });

    }
    function getQualificationList() {
        $rootScope.loaderIndicator = true;
        httpService.getQualifications().then(function (response) {
            $rootScope.loaderIndicator = false;
            $scope.qualificationList = response.data.data;
            console.log($scope.qualificationList);
        });

    }
}]);