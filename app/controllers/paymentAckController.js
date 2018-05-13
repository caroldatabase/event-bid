app.controller("paymentAckController", ['$scope', '$rootScope', 'httpService', 'commonService', '$routeParams', function ($scope, $rootScope, httpService, commonService, $routeParams) {
    init();

    function init() {
        $scope.transaction_id = $routeParams.tx;
        console.log($scope.transaction_id);
        commonService.scrollToTop();
        checkTransaction();
    }

    
    function checkTransaction()
    {
        var data = {};
        data.cmd = "_notify-synch",
        data.tx = $scope.transaction_id;
        data.at = "2UgIk2q6xYYw2D-_4901jamBx8VieMienrTVCKXMkaVe7nAOd6txPodXX10";
        $.post('https://www.paypal.com/cgi-bin/webscr', data,
            function (returnedData) {
                console.log(returnedData);
                if (returnedData.includes("SUCCESS"))
                {
                    $scope.status = "Payment Suceeded. Now you can assign task to people who are interested in doing task.";
                    if(returnedData.includes("task_id"))
                    {
                        var pos = returnedData.lastIndexOf("task_id=") + 1;
                        returnedData.substring(pos, path.length() - pos);
                    }
                }
                else {
                    $scope.status = "Payment Failure. Please try again.";
                }
            });
        }
}]);