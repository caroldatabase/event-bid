app.factory('httpService', ['$http', 'CONSTANTS', function ($http, CONSTANTS) {

    var serviceBase = CONSTANTS.ENVIORNMENT.PRODUCTION + '/';
    //var serviceBase = CONSTANTS.ENVIORNMENT.LOCAL + '/';
    var httpService = {
        createAccount: createAccount,
        login: login,
        resetPassword: resetPassword,
        forgetPassword: forgetPassword,
        addCategory: addCategory,
        getCategory: getCategory,
        postTask: postTask,
        contactus: contactus,
        newEBCategory: newEBCategory,
        deleteCategory: deleteCategory,
        browseAllTask: browseAllTask,
        deleteTask: deleteTask,
        getAllBlogs: getAllBlogs,
        createBlog: createBlog,
        deleteBlog: deleteBlog,
        addBlog: addBlog,
        showInterest: showInterest,
        getBuisnessTask: getBuisnessTask,
        getInterestedUsersList: getInterestedUsersList,
        assignTask: assignTask,
        browseTaskByCategory: browseTaskByCategory
    };

    function getInterestedUsersList(taskid) {
        return $http.get(serviceBase + 'api/v1/interestUsersList/' + taskid, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

    function getBuisnessTask(userid) {
        return $http.get(serviceBase + 'api/v1/bussinessDashboard/' + userid, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

    function showInterest(interestedUser) {
        return $http.post(serviceBase + 'api/v1/showInterestList', interestedUser, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });

    }

    function assignTask(details) {
        return $http.post(serviceBase + 'api/v1/assignTask', details, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });

    }

    function addBlog(blog) {
        return $http.post(serviceBase + 'api/v1/blog/create', blog, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });

    }

    function createAccount(user) {
        return $http.post(serviceBase + 'api/v1/user/signup', user, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
                return response;
            });
       
    }

    function contactus(user) {
        return $http.post(serviceBase + 'api/v1/user/contactus', user, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

    function newEBCategory(user) {
        return $http.post(serviceBase + 'api/v1/newEBCategory/create', user, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

    function postTask(task) {
        return $http.post(serviceBase + 'api/v1/post-task/create' , task, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });

    }

    function login(user) {
        return $http.post(serviceBase + 'api/v1/user/login' , user, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });

    }

    function resetPassword(user)
    {
        return $http.post(serviceBase + 'api/login/resetPassword/', user, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

    function forgetPassword(emailID)
    {
        console.log(serviceBase + 'api/v1/user/forget-password?email=' + emailID );
        return $http.post(serviceBase + 'api/v1/user/forget-password?email=' + emailID  , { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }
    // category section 

    function addCategory(category)
    {
        return $http.post(serviceBase + 'api/v1/post-task/category',   category , { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

    function assignUser(user) {
        return $http.post(serviceBase + '/api/v1/assignTask', user, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

    function getCategory() {
        return $http.get(serviceBase + 'api/v1/post-task/getcategory', { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

    function deleteBlog(blogid) {
        return $http.get(serviceBase + 'api/v1/blog/delete/' + blogid, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

    function deleteCategory(categoryid) {
        return $http.get(serviceBase + 'api/v1/category/delete/' + categoryid, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

    function deleteTask(taskid) {
        return $http.get(serviceBase + 'api/v1/post-task/delete/' + taskid, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }
    
    //task section 
    function browseAllTask(pageNum) {
        return $http.get(serviceBase + 'api/v1/post-task/getPostTask?task_status=open&page_size=1&page_num=' + pageNum, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

    function browseTaskByCategory(categoryId, pageNum) {
        return $http.get(serviceBase + 'api/v1/post-task/getPostTask?task_status=open&page_num=' + pageNum +  '&category_id=' + categoryId, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

    function getAllBlogs() {
        return $http.get(serviceBase + 'api/v1/getEventbidHub', { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

    function createBlog() {
        return $http.get(serviceBase + 'api/v1/blog/create', { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

    

    return httpService;


}]);