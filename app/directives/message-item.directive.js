app.directive('messageItem', function(MessageService) {
	return {
		restrict: "E",
		templateUrl: 'app/directives/message-item.html',
		scope: {
			senderUuid: "@",
			content: "@",
			date: "@"
		}
	}
});