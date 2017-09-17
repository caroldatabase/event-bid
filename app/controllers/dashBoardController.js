app.controller('dashBoardController', ['$scope', 'commonService', '$rootScope', 'httpService', function ($scope, commonService, $rootScope, httpService) {

   
    init();
    $scope.postTask = postTask;
    $scope.promptModalClose = promptModalClose;
    $scope.seeMoreClick = seeMoreClick;

    function init()
    {
       
        commonService.scrollToTop();
        $(document).ready(function () {
            $('.owl-carousel.home-banner').owlCarousel({
                items: 1,
                animateOut: 'fadeOut',
                loop: true,
                margin: 0,
                responsive: true,
                nav: false,
                autoplay: true,
                autoPlaySpeed: 5000,
                autoPlayTimeout: 5000,
                autoplayHoverPause: true
            });
           
            $('.owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                        nav: true
                    },
                    600: {
                        items: 3,
                        nav: false
                    },
                    1000: {
                        items: 4,
                        nav: true,
                        loop: false,
                        margin: 20
                    }
                }
            })
        })
        getAllBlogs();
        commonService.checkUserLoggedIn();
        
    }

    function postTask()
    {
        if ($rootScope.isLogin)
        {
            commonService.updateLocationPath('/post-task');
        }
        else {

            $('#promptLoginPopup').modal('show');

        }
    }
    
    function seeMoreClick()
    {
        commonService.updateLocationPath('/categories');
    }

    function promptModalClose()
    {
        $('#promptLoginPopup').modal('toggle');
       
    }

    function getAllBlogs() {
        $rootScope.loaderIndicator = true;
        if (!$rootScope.blogList) {
            httpService.getAllBlogs().then(function (response) {
                $rootScope.blogList = response.data.data;
                $rootScope.loaderIndicator = false;
            });
        }
    }

    $scope.openBlogDetailPopup = function(item)
    {
        $('#blogDetailPopup').modal('toggle');
        $("#blogDetailPopup").modal({ backdrop: "static" });
        $('#blogDetailPopup').modal('show');
        $scope.item = item;
    }
}]);


