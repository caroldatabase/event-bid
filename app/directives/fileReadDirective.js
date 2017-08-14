//your directive
app.directive("fileread", ['$rootScope',
  function ($rootScope) {
      return {
          scope: {
              fileread: "="
          },
          link: function (scope, element, attributes) {
              element.bind("change", function (changeEvent) {
                  var reader = new FileReader();
                  reader.onload = function (loadEvent) {
                      scope.$apply(function () {
                          scope.fileread = loadEvent.target.result;
                          $rootScope.$broadcast("imageAdded", scope.fileread);
                      });
                  }
                  reader.readAsDataURL(changeEvent.target.files[0]);
                  
              });
          }
      }
  }]);