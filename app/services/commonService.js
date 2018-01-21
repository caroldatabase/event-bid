app.factory('commonService', ['$location', '$window', '$cookies', '$route', '$rootScope', '$filter', 'httpService',
    function ($location, $window, $cookies, $route, $rootScope, $filter, httpService) {
    var commonService = {
        updateLocationPath : updateLocationPath,
        scrollToTop: scrollToTop,
        setCookieValues: setCookieValues,
        reloadRoute: reloadRoute,
        deleteCookieValues: deleteCookieValues,
        checkUserLoggedIn: checkUserLoggedIn,
        getUserid: getUserid,
        getCategoryMapping: getCategoryMapping
    };

    function getCategoryMapping(categoryList)
    {
        var categoryConst = {};
        for (var i = 0; i < categoryList.length; i++)
        {
            var filtered = $filter('uppercase')(categoryList[i].name);
            categoryConst[filtered.replace(/\ /gi, '_')] = categoryList[i].id;
        }
        return categoryConst;
    }
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
       if (dataType == "UserType")
           $cookies.put("UserType", data);
       if (dataType == "Photo")
           $cookies.put("Photo", data);
    }
    function deleteCookieValues(dataType) {
        if (dataType == "FirstName")
            $cookies.remove("FirstName");
        if (dataType == "UserID")
            $cookies.remove("UserID");
        if (dataType == "Photo")
            $cookies.remove("Photo");
        if (dataType == "UserType")
            $cookies.remove("UserType");

    }
    
    function getUserid()
    {
        var userId = "";
        userId = $cookies.get("UserID");
        return userId;
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
            $rootScope.UserType = $cookies.get("UserType");
        }
        else {
            $rootScope.isLogin = false;
        }
    }
    function updateUserDetails()
    {
        var userId = $cookies.get("UserID");
        $rootScope.loaderIndicator = true;
        httpService.getUserDetails(userId).then(function (response) {
            if (response.data.message == "Record found successfully.") {
                var userDetails = response.data.data;
                $rootScope.photo = userDetails.photo;
                $rootScope.loaderIndicator = false;
                setCookieValues('FirstName', userDetails.firstName);
                setCookieValues('Photo', $rootScope.photo);
            }
        })
    }
    return commonService;


}]);
