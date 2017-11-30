app.controller('chat', function ($scope, Messages) {
    // Message Inbox
    $scope.messages = [];
    //// Receive Messages
    Messages.receive(function (message) {
        $scope.messages.push(message);
    });
    //// Send Messages
    $scope.send = function () {
        Messages.user({ name: "Kanika Sethi" });
        Messages.send({
            data: $scope.textbox
        });
        
    };

});