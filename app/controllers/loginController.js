app.controller('loginController', ['$scope', 'httpService', 'commonService', 'CONSTANTS', '$rootScope', function ($scope, httpService, commonService, CONSTANTS, $rootScope) {

    //scope functions
    $scope.createAccount = createAccount;
    $scope.fbLogin = fbLogin;
    $scope.login = login;
    $scope.resetPassword = resetPassword;
    $scope.selectCategories = selectCategories;
    $scope.userTypeClicked = userTypeClicked;
    $scope.EmailLogin = EmailLogin;
    $scope.checkEmail = checkEmail;
    $scope.logout = logout;
    init();

    //scope.variables 
    $scope.SignUpIndicator = false;
    $scope.user = {};
    $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
    $scope.errorIndicator = false;
     $rootScope.loaderIndicator = false;

    $scope.passwordIndicator = false;
   
    function init()
    {
        executeJquery();
        httpService.getCategory().then(function (data) {
            $rootScope.categoryList = $scope.categoryList = data.data.data;
        });

    }

    function executeJquery()
    {
        $("#signUpPopup").on("hidden.bs.modal", function () {
            $scope.user = {};
            $scope.errorIndicator = false;
            $scope.SignUpIndicator = false;
        });

        $("#loginPopup").on("hidden.bs.modal", function () {
            $scope.user = {};
            $scope.errorMessageIndicator = false;
            $scope.emailIndicator = false;
        });
        
        
    }
    
    function selectCategories()
    {
        if ($scope.user.selectedCategories.length <= 3)
            $scope.user.categories = $scope.user.selectedCategories;
        //else
            //$scope.errorIndicator = true;
            //$scope.message = "You can select at max three categories.";
    }
   
    function EmailLogin()
    {
        if ($scope.user && !$scope.user.userType)
        {
            $scope.signUpForm.userType.$invalid = true;
            $scope.errorIndicator = true;
            $scope.message = "Please select user type.";
            $scope.userTypeIndicator = true;
        }
        else
        {
            $scope.SignUpIndicator = true;
            if ($scope.user.userType === "taskSeeker") {
                $scope.categoriesIndicator = true;
                setTimeout(function () { $('#selectedCategories').multiselect(); }, 000);
                
            }
        }
    }

    function userTypeClicked()
    {
        $scope.errorIndicator = false;
        $scope.userTypeIndicator = false;
        $scope.signUpForm.$submitted = false;
        setTimeout(function () { $('#selectedCategories').multiselect(); }, 1000);
        if( $scope.user.userType === "taskSeeker")
        {
            $scope.categoriesIndicator = true;
            //setTimeout(function () { $('#selectedCategories').multiselect(); }, 000);
        }
        else {
            $scope.categoriesIndicator = false;
            //setTimeout(function () { $('#selectedCategories').multiselect(); }, 000);
        }
    }

    function createAccount()
    {
        if ($scope.user.password === $scope.user.cnfrmPass)
        {
            $scope.passwordIndicator = false;
            $scope.signUpForm.$setSubmitted(true);
            if ($scope.signUpForm.$valid) {
                //$scope.user.userType = "taskHirer";
                 $rootScope.loaderIndicator = true;
                httpService.createAccount($scope.user).then(function (result) {
                    if (result.data.code != 500 || result.data.message ==  "Registration successfully done.") {
                         $rootScope.loaderIndicator = false;
                         $scope.user = {};
                         var userRes = result.data.data;
                        commonService.setCookieValues('FirstName', userRes.firstName);
                        commonService.setCookieValues('UserID', userRes.userId);
                        commonService.setCookieValues('UserType', userRes.userType);
                        $rootScope.isLogin = true;
                        $rootScope.UserType = userRes.userType;
                        $rootScope.firstName = userRes.firstName;
                        
                            $('#signUpPopup').modal('toggle');
                            if($rootScope.postTaskClicked == true)
                            {
                                commonService.updateLocationPath('/post-task');
                            }

                    }
                    else if (result.data.message == "The email has already been taken.") {
                         $rootScope.loaderIndicator = false;
                        $scope.errorIndicator = true;
                        $scope.message = "Account with this emailid already exists. Please try with different emailid. "
                    }
                });
            }
            else {
                $scope.message = CONSTANTS.ERRORMESSAGE.REQUIREDFIELDERROR;
                $scope.errorIndicator = true;
            }
        }
        else {
            $scope.message = "password and confirm password are not same.";
            $scope.errorIndicator = true;
            $scope.passwordIndicator = true;
        }

    }

    function fbLogin()
    {
        
            FB.login(function (response) {
                if (response.authResponse) {
                    console.log('Authentication with facebook is successful.');
                    FB.api('/me?fields=id,email,first_name,last_name', function (response) {
                        console.log('Good to see you, ' + response.name + '.');
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            });
        

        
    }

    function login()
    {
        $scope.loginForm.$setSubmitted(true);
        if ($scope.loginForm.$valid) {
            $rootScope.loaderIndicator = true;
            httpService.login($scope.user).then(function (result) {
                if (result.data.message == "Successfully logged in.") {
                    $rootScope.loaderIndicator = false;
                    if ($scope.user.email == 'admin@eventbid.com' && $scope.user.password == 'admin123$') {
                        $rootScope.adminIndicator = true;
                    }
                   
                    $scope.user = {};
                    var userRes = result.data.data;
                    commonService.setCookieValues('FirstName', userRes.firstName);
                    commonService.setCookieValues('UserID', userRes.userId);
                    $rootScope.isLogin = true;
                    $rootScope.firstName = userRes.firstName;
                    commonService.setCookieValues('UserType', userRes.userType);
                    $rootScope.UserType = userRes.userType;
                    
                        $('#loginPopup').modal('toggle');
                        if ($rootScope.postTaskClicked == true) {
                            commonService.updateLocationPath('/post-task');
                        }
                       
                    
                }
                else
                {
                    $rootScope.loaderIndicator = false;
                    $scope.message = "email or password is wrong.Please enter correct details.";
                    $scope.errorMessageIndicator = true;
                    $rootScope.loaderIndicator = false;
                }
            });
        }
        else {
            $scope.message = CONSTANTS.ERRORMESSAGE.REQUIREDFIELDERROR;
            $scope.errorMessageIndicator = true;
        }

    }

    function resetPassword()
    {
        httpService.login($scope.user).then(function () {
            alert("reset succeded");
        });
    }

    function checkEmail(form)
    {
        if (form.$error.pattern) {
            $scope.emailIndicator = true;
        }
        else
            $scope.emailIndicator = false;
    }

    function logout()
    {
        commonService.deleteCookieValues('FirstName');
        commonService.deleteCookieValues('UserID');
        commonService.deleteCookieValues('UserType');
        $rootScope.isLogin = false;
        $rootScope.adminIndicator = false;
        commonService.reloadRoute();
        
    }

    $scope.openSignupModal = function () {
        $scope.user = {};
        $('#signUpPopup').modal('toggle');
        $("#signUpPopup").modal({ backdrop: "static" });
        $('#signUpPopup').modal('show');
       // $scope.signUpForm.$setUntouched();
        //$scope.signUpForm.$setPristine();
    }
    
    $scope.openLoginModal = function () {
        $('#loginPopup').modal('toggle');
        $("#loginPopup").modal({ backdrop: "static" });
        $('#loginPopup').modal('show');
       // $scope.loginForm.$setUntouched();
        //$scope.loginForm.$setPristine();
        $scope.user = {};
    }
}]);
app.controller('ForgetPassController', ['$scope', 'httpService', function ($scope, httpService) {
    $scope.forgetPassword = forgetPassword;
    $scope.checkEmail = checkEmail;
    init();
    function init()
    {
        $scope.user = {};
        $scope.successIndicator = false;
    }
    function forgetPassword() {
        $scope.forgotPassForm.$setSubmitted(true);
        if ($scope.forgotPassForm.$valid) {
            httpService.forgetPassword($scope.emailID).then(function (data) {
                $scope.successMessage = "Reset password link has sent. Please check your email.";
                $scope.successIndicator = true;
            });
        }
        else {
            $scope.emailErrorIndicator = true;
            $scope.message = "Please enter email address";
        }
    }

    function checkEmail() {
        if ($scope.forgotPassForm.$error.email) {
            $scope.emailErrorIndicator = true;
            $scope.message = "Please enter valid email address.";

        }
        else
            $scope.emailErrorIndicator = false;
    }
}]);