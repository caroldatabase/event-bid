app.controller('howItWorksCtrl', function ($scope, commonService, $rootScope) {
    init();

    function init()
    {
        if ($rootScope.isLogin)
            $scope.loginIndicator = true;
        commonService.scrollToTop();
        $('#collapseOne').hide();
        $('#collapseTwo').hide();
        $('#collapseThree').hide();
        $('#collapseFour').hide();
    }

    $('#headingOne').click(function () {
        $('#collapseOne').toggle('1000');
        $('#collapseTwo').hide();
        $('#collapseThree').hide();
        $('#collapseFour').hide();
        $("i", this).toggleClass("up down");
    });

    $('#headingTwo').click(function () {
        $('#collapseTwo').toggle('1000');
        $('#collapseOne').hide();     
        $('#collapseThree').hide();
        $('#collapseFour').hide();
        $("i", this).toggleClass("up down");
    });

    $('#headingThree').click(function () {
        $('#collapseThree').toggle('1000');
        $('#collapseTwo').hide();
        $('#collapseOne').hide();
        $('#collapseFour').hide();
        $("i", this).toggleClass("up down");
    });

    $('#headingFour').click(function () {
        $('#collapseFour').toggle('1000');
        $('#collapseTwo').hide();
        $('#collapseThree').hide();
        $('#collapseOne').hide();
        $("i", this).toggleClass("up down");
    });
    
    $scope.openSignupModal = function()
    {
        $('#signUpPopup').modal('toggle');
    }
});