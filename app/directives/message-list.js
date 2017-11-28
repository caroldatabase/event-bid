app.directive('messageList', function($timeout, $anchorScroll, MessageService, ngNotify) {
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'app/directives/message-list.html',
        link: function(scope, element, attrs, ctrl) {
            var element = angular.element(element)
            var init = function() {};
            init();
        },
        controller: function($scope) {
            $scope.messages = MessageService;
            $scope.autoScrollDown = true;
            var hasScrollReachedBottom = function () {
                return element.scrollTop() + element.innerHeight() >= element.prop('scrollHeight')
            };
            $scope.scrollToBottom = function () {
                var uuid_last_message = _.last($scope.messages).uuid;
                $anchorScroll(uuid_last_message);
            };
            // Hook that is called once the list is completely rendered
            $scope.listDidRender = function () {
                if ($scope.autoScrollDown)
                    $scope.scrollToBottom();
            };
            var watchScroll = function () {
                scope.autoScrollDown = hasScrollReachedBottom()
            };
            var init = function () {
                // … 
                element.bind("scroll", _.throttle(watchScroll, 250));
            };
            var hasScrollReachedTop = function () {
                return element.scrollTop() === 0;
            };
            var fetchPreviousMessages = function () {
                ngNotify.set('Loading previous messages...', 'success');
                var currentMessage = scope.messages[0].uuid.toString();
                scope.messages.$load(10);
            };
            var watchScroll = function () {
                if (hasScrollReachedTop()) {
                    if (MessageService.messagesAllFetched()) {
                        ngNotify.set('All the messages have been loaded', 'grimace');
                    } else {
                        fetchPreviousMessages();
                    }
                }
               
            };
            var fetchPreviousMessages = function () {
                ngNotify.set('Loading previous messages...', 'success');
                var currentMessage = scope.messages[0].uuid.toString();
                scope.messages.$load(10).then(function (m) {
                    // Scroll to the previous message 
                    _.defer(function () { $anchorScroll(currentMessage) });
                });
            };
        }
    };
});