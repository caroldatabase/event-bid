app.controller("paymentAckController", ['$scope', '$rootScope', 'httpService', 'commonService', '$routeParams', function ($scope, $rootScope, httpService, commonService, $routeParams) {
    init();

    function init() {
        $scope.transaction_id = $routeParams.tx;
        $scope.item_name = $routeParams.item_name;
        $scope.task_name = $scope.item_name.split("-").pop();
        $scope.amt = $routeParams.amt;
        $scope.currency = $routeParams.cc;
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
      

        $.post("https://www.paypal.com/cgi-bin/GetTransactionDetails/", data)
       .done(function (returnedData) {
           alert("Data Loaded: ");
           console.log(returnedData);
           //returnedData = "SUCCESS mc_gross=1.00 protection_eligibility=Ineligible payer_id=DZGKP6TSJLBYS tax=0.00 payment_date=20:36:03+May+19,+2018+PDT payment_status=Completed charset=windows-1252 first_name=Rebecca mc_fee=0.33 custom= payer_status=verified business=rebecca@eventbid.com.au quantity=1 payer_email=Rebecca.aiezza@bigpond.com txn_id=78V220220L0531157 payment_type=instant last_name=Aiezza receiver_email=rebecca@eventbid.com.au payment_fee= shipping_discount=0.00 insurance_amount=0.00 receiver_id=SXKJS3MKX2H7L txn_type=web_accept item_name=60-TEST+PAYPAL+20.05 discount=0.00 mc_currency=AUD item_number= residence_country=AU handling_amount=0.00 shipping_method=Default transaction_subject= payment_gross= shipping=0.00";
           if (returnedData.includes("SUCCESS")) {
               $scope.message = "Payment Suceeded. Now you can assign task to people who are interested in doing task.";
               $scope.status = "Completed";
               var firstPos = returnedData.lastIndexOf("item_name=");
               var remainingStr = returnedData.substr(firstPos, returnedData.length);
               var firstPos = remainingStr.lastIndexOf("item_name=");
               var pos = remainingStr.indexOf("-");
               event_name = remainingStr.substring(firstPos, pos);
               var event_name_last_index = event_name.lastIndexOf("=");
               var id = remainingStr.substring(event_name_last_index + 1, pos);
               $scope.taskid = id;
               var requestObj = {}
               requestObj.isPaymentMade = "true";
               requestObj.make_payment_transactionId = $scope.transaction_id;
               httpService.updateTask(id, requestObj).then(function (data) {

               });
           }
           else {
               $scope.message = "Payment Failure. Please try again.";
               $scope.status = "Failure";

           }
       });
        //returnedData = "SUCCESS mc_gross=1.00 protection_eligibility=Ineligible payer_id=DZGKP6TSJLBYS tax=0.00 payment_date=20:36:03+May+19,+2018+PDT payment_status=Completed charset=windows-1252 first_name=Rebecca mc_fee=0.33 custom= payer_status=verified business=rebecca@eventbid.com.au quantity=1 payer_email=Rebecca.aiezza@bigpond.com txn_id=78V220220L0531157 payment_type=instant last_name=Aiezza receiver_email=rebecca@eventbid.com.au payment_fee= shipping_discount=0.00 insurance_amount=0.00 receiver_id=SXKJS3MKX2H7L txn_type=web_accept item_name=60-TEST+PAYPAL+20.05 discount=0.00 mc_currency=AUD item_number= residence_country=AU handling_amount=0.00 shipping_method=Default transaction_subject= payment_gross= shipping=0.00";
        
       
    }
}]);