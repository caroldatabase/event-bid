app.controller("paymentAckController", ['$scope', '$rootScope', 'httpService', 'commonService', '$routeParams', function ($scope, $rootScope, httpService, commonService, $routeParams) {
    init();

    function init() {
        $scope.transaction_id = $routeParams.tx;
        $scope.item_name = $routeParams.item_name;
        console.log($scope.transaction_id);
        commonService.scrollToTop();
        checkTransaction();
        alert("payment check - 15/05 build")
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
                    var firstPos = returnedData.lastIndexOf("item_name=");
                    var remainingStr = returnedData.substr(firstPos, returnedData.length);
                    var firstPos = remainingStr.lastIndexOf("item_name=");
                    var pos = remainingStr.indexOf("-");
                    var event_name = remainingStr.substring(firstPos, pos);
                    var event_name_last_index = event_name.lastIndexOf("=");
                    var id = remainingStr.substring(event_name_last_index + 1, pos);
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