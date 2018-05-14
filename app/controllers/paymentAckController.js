app.controller("paymentAckController", ['$scope', '$rootScope', 'httpService', 'commonService', '$routeParams', function ($scope, $rootScope, httpService, commonService, $routeParams) {
    init();

    function init() {
        $scope.transaction_id = $routeParams.tx;
        $scope.item_name = $routeParams.item_name;
        console.log($scope.transaction_id);
        commonService.scrollToTop();
        checkTransaction();
        alert("payment check - 14/05 build")
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
                if (item_name.includes("SUCCESS"))
                {
                    $scope.status = "Payment Suceeded. Now you can assign task to people who are interested in doing task.";
                    var pos = item_name.lastIndexOf("-");
                    var id = str.substring(0, pos);
                    var requestObj = {}
                    requestObj.isPaymentMade = "true";
                    requestObj.make_payment_transactionId = $scope.transaction_id;
                    httpService.updateTask(id, requestObj).then(function (data) {

                    });
                }
                else {
                    $scope.status = "Payment Failure. Please try again.";
                }
            });
        }
}]);