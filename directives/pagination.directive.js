/**
 * Created by V-XiongXiang on 2017/7/6.
 */
angular.module('angular-ui-pagination',['angular-ui-paging'])
.controller('uiPaginationController',['$scope','$attrs','$parse','uiPaging','uiPaginationConfig','$log',function ($scope,$attrs,$parse,uiPaging,uiPaginationConfig,$log) {
        var maxSize = angular.isDefined($attrs.maxSize) ? $scope.$parent.$eval($attrs.maxSize):uiPaginationConfig.maxSize,
            rotate = angular.isDefined($attrs.rotate) ? $scope.$parent.$eval($attrs.rotate):uiPaginationConfig.rotate,
            forceEllipses = angular.isDefined($attrs.forceEllipses) ? $scope.$parent.$eval($attrs.forceEllipses):uiPaginationConfig.forceEllipses,
            boundaryLinkNumbers = angular.isDefined($attrs.boundaryLinkNumbers)? $scope.$parent.$eval($attrs.boundaryLinkNumbers):uiPaginationConfig.boundaryLinkNumbers;
            pageLabel = angular.isDefined($attrs.pageLabel) ? function (idx) { return $scope.$parent.$eval($attrs.pageLabel,{$page:idx});}:angular.identity;

        $scope.boundaryLinks = angular.isDefined($attrs.boundaryLinks) ? $scope.$parent.$eval($attrs.boundaryLinks):uiPaginationConfig.boundaryLinks;
        $scope.directionLinks = angular.isDefined($attrs.directionLinks) ? $scope.$parent.$eval($attrs.directionLinks):uiPaginationConfig.directionLinks;
        uiPaging.create(this,$scope,$attrs);

    if ($attrs.maxSize){
        ctrl.watchers.push($scope.$parent.$watch($parse($attrs.maxSize),function (value) {
            maxSize = parseInt(value,10);
            ctrl.render();
        }));
    }

    function makePage(number,text,isActive) {
        return{
            number:number,
            text:text,
            active:isActive
        }
    }

    function getPages(currentPage,totalPages) {
        var pages = [];

        // Default page limits
        var startPage = 1,endPage = totalPages;
        var isMaxSized = angular.isDefined(maxSize) && maxSize < totalPages;
        // recompute if maxSize
        if(isMaxSized){
            if(rotate){
                // Current page is displayed in the middle of the visible ones
                startPage = Math.max(currentPage - Math.floor(maxSize/2),1);
                endPage = startPage + maxSize - 1;
                // Adjust if limit is exceeded
                if(endPage > totalPages){
                    endPage = totalPages;
                    startPage = endPage - maxSize + 1;
                }
            } else {
                // Visible pages are paginated with maxSize
                startPage = (Math.ceil(currentPage / maxSize) - 1) * maxSize + 1;
                // Adjust last page if limit is exceeded
                endPage = Math.min(startPage + maxSize -1,totalPages)
            }
        }

        // add page number links
        for (var number = startPage; number <= endPage; number++){
            var page = makePage(number,pageLabel(number),number === currentPage);
            pages.push(page);
        }

        // add links to move between page sets
        if(isMaxSized && maxSize > 0 &&(!rotate || forceEllipses || boundaryLinkNumbers)){
            if(startPage > 1){
                if(!boundaryLinkNumbers || startPage > 3){
                    var previousPageSet = makePage(startPage - 1,'...',false);
                    pages.unshift(previousPageSet);
                }
                if(boundaryLinkNumbers)

                    if(startPage === 3){
                        var secondPageLink = makePage(2,'2',false);
                        pages.unshift(secondPageLink);
                    }

                    // add the first page
                    var firstPageLink = makePage(1,'1',false);
                    pages.unshift(firstPageLink);
                }
            }

        if(endPage < totalPages){
            if(!boundaryLinkNumbers || endPage < totalPages -2){
                var nextPageSet = makePage(endPage + 1,'...',false);
                pages.push(nextPageSet);
            }
            if(boundaryLinkNumbers){
                if(endPage === totalPages - 2){
                    var secondToLastPageLink = makePage(totalPages - 1,totalPages - 1,false);
                    pages.push(secondToLastPageLink);
                }

                // add the last page
                var lastPageLink = makePage(totalPages,totalPages,false);
                pages.push(lastPageLink);
            }
        }
        return pages;
    }

    var originalRender = this.render;
    this.render = function () {
        originalRender();
        if($scope.page > 0 && $scope.page <= $scope.totalPages){
            $scope.pages = getPages($scope.page,$scope.totalPages);
        }
    }
}])
.constant('uiPaginationConfig',{
    maxSize:10,
    itemsPerPage:10,
    boundaryLinks:false,
    directionLinks:true,
    firstText:'首页',
    previousText:'上一页',
    nextText:'下一页',
    lastText:'末页',
    rotate:true,
    forceEllipses:false
})
.directive('uiPagination',['$parse','uiPaginationConfig',function ($parse,uiPaginationConfig) {
    return {
        scope:{
                totalItems:'=',
                firstText:'@',
                previousText:'@',
                nextText:'@',
                lastText:'@',
                ngDisabled:'='
            },
        require:['uiPagination','?ngModel'],
        restrict:'A',
        controller:'uiPaginationController',
        controllerAs:'pagination',
        templateUrl:function (element,attrs){
            return attrs.templateUrl || '../template/pagination.html';
        },
        link:function (scope,element,attrs,ctrls) {
            element.addClass('pagination');
            var paginationCtrl = ctrls[0],ngModelCtrl = ctrls[1];
            if(!ngModelCtrl){
                return;
            }
            paginationCtrl.init(ngModelCtrl,uiPaginationConfig);
        }
    }
}])
