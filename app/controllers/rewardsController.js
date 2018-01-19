app.controller('rewardsCtrl',['$scope', 'commonService', function ($scope, commonService) {
    init();

    function init() {
        commonService.scrollToTop();
        $('#collapseOne').hide();
        $('#collapseTwo').hide();
    }

    $('#headingOne').click(function () {
        $('#collapseOne').toggle('1000');
        $('#collapseTwo').hide();
        $("i", this).toggleClass("up down");
    });

    $('#headingTwo').click(function () {
        $('#collapseTwo').toggle('1000');
        $('#collapseOne').hide();
        $("i", this).toggleClass("up down");
    });
}]);