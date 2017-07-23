app.factory('commonService', ['$location', '$window', '$cookies', '$route', '$rootScope', 'httpService',
    function ($location, $window, $cookies, $route, $rootScope) {
    var commonService = {
        updateLocationPath : updateLocationPath,
        scrollToTop: scrollToTop,
        setCookieValues: setCookieValues,
        reloadRoute: reloadRoute,
        deleteCookieValues: deleteCookieValues,
        checkUserLoggedIn: checkUserLoggedIn
    };

    function updateLocationPath(pathValue) {
        $location.path(pathValue);
    }

    function scrollToTop()
    {
        $window.scrollTo(0, 0);
    }

    function setCookieValues(dataType, data) {
       if(dataType == "FirstName")
           $cookies.put("FirstName", data);
       if (dataType == "UserID")
           $cookies.put("UserID", data);
    }
    function deleteCookieValues(dataType) {
        if (dataType == "FirstName")
            $cookies.remove("FirstName");
        if (dataType == "UserID")
            $cookies.remove("UserID");

    }
    function reloadRoute()
    {
        $route.reload();
    }

    function checkUserLoggedIn()
    {
        var userID = $cookies.get("UserID");
        if (userID)
        {
            $rootScope.isLogin = true;
            $rootScope.userID = userID;
            $rootScope.firstName = $cookies.get("FirstName");
        }
        else {
            $rootScope.isLogin = false;
        }
    }
    
    return commonService;


}]);
