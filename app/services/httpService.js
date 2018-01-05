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
        assignUser: assignUser,
        browseTaskByCategory: browseTaskByCategory,
        getUserDetails: getUserDetails,
        updateProfile: updateProfile,
        contactEBManager: contactEBManager,
        updateTask: updateTask,
        getCustomerTask: getCustomerTask,
        changePassword: changePassword,
        getRecommendationTask: getRecommendationTask,
        postComment: postComment,
        getAllComment: getAllComment,
        replyComment: replyComment,
        makePayment: makePayment,
        addCard: addCard,
        updateCard: updateCard,
        getCardDetails: getCardDetails,
        deleteCardDetails: deleteCardDetails,
        paymentByCard: paymentByCard,
        getQualification:getQualification,
        getInsurance:getInsurance,
        approveQualification:approveQualification,
        approveInsurance:approveInsurance,
        getPersonalMessage:getPersonalMessage,
        addPersonalMessage:addPersonalMessage,
        deactivate:deactivate,
        addInsurance:addInsurance
    };
    /************************************Card Details ***********************************************************/
    function addCard(cardDetails) {
        return $http.post(serviceBase + 'api/v1/addCard', cardDetails, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

    function updateCard(cardDetails) {
        return $http.post(serviceBase + 'api/v1/updateCard', cardDetails, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

    function getCardDetails(user) {
        return $http.post(serviceBase + 'api/v1/getCard', user , { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

    function deleteCardDetails(card) {
        return $http.post(serviceBase + 'api/v1/deleteCard', card, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

    function paymentByCard(cardDetails) {
        return $http.post(serviceBase + 'api/v1/paymentByCard', cardDetails, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }


    /****************** ****************/

    function postComment(comment) {
        return $http.post(serviceBase + 'api/v1/comment/post', comment, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });

    }

    function makePayment(user) {
        return $http.post(serviceBase + 'api/v1/makePayment', user, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });

    }

    function getAllComment(taskid) {
        return $http.get(serviceBase + 'api/v1/comment/post?getCommentBy=task&taskId=' + taskid, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

    function replyComment(comment) {
        return $http.post(serviceBase + 'api/v1/comment/post?commentReply=yes', comment, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });

    }

    function updateTask(id, task) {
        return $http.post(serviceBase + 'api/v1/post-task/update/'+ id, task, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });

    }

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
     
    function getRecommendationTask(userid)
    {
        return $http.get(serviceBase + 'api/v1/getRecommendTask/' + userid, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }
    function getCustomerTask(userid) {
        return $http.get(serviceBase + 'api/v1/customerBusinessTask/' + userid, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

    function showInterest(interestedUser) {
        return $http.post(serviceBase + 'api/v1/showInterestList', interestedUser, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });

    }

    function contactEBManager(user) {
        return $http.post(serviceBase + 'api/v1/EBManagerContactEnquiry', user, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
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

    function updateProfile(userid, user) {
        return $http.post(serviceBase + 'api/v1/user/update-profile/'+ userid, user, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
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

    function changePassword(userId, oldPass, newPass) {
       // console.log(serviceBase + 'api/v1/user/changePassword?email=' + emailID);
        return $http.post(serviceBase + 'api/v1/user/changePassword/' +  userId + '?' + 'newPassword='+ newPass + '&oldPassword=' + oldPass
            , { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
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
        return $http.post(serviceBase + 'api/v1/assignTask', user, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

    function getUserDetails(userid) {
        return $http.get(serviceBase + '/api/v1/user/details/' + userid,  { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
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
        return $http.get(serviceBase + 'api/v1/post-task/getPostTask?task_status=open&page_num=' + pageNum, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
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

    function getQualification(pageNum,pageSize) {
        return $http.get(serviceBase + 'api/v1/blog/getQualification?page_num=' + pageNum +  '&page_size=' + pageSize, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

     function getInsurance(pageNum,pageSize) {
        return $http.get(serviceBase + 'api/v1/blog/getInsurance?page_num=' + pageNum +  '&page_size=' + pageSize, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }
   
     function approveQualification(userid, user) {
        return $http.post(serviceBase + 'api/v1/approveQualification/'+ userid, user, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });

    }

    function approveInsurance(userid, user) {
        return $http.post(serviceBase + 'api/v1/approveInsurance/'+ userid, user, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });

    }
   
    function getPersonalMessage(user) {
        return $http.post(serviceBase + 'api/v1/getPersonalMessage/', user, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });

    }
    
     function addPersonalMessage(user) {
        return $http.post(serviceBase + 'api/v1/addPersonalMessage/', user, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });

    }

      function deactivate(userid) {
        return $http.get(serviceBase + 'api/v1/user/deactivate'+ userid, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }
 
    function addInsurance(user) {
        return $http.post(serviceBase + 'api/v1/addInsurance/', user, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });

    }
    
    return httpService;


}]);