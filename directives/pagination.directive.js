angular.module("angular-ui-pagination",['angular-ui-paging'])
.controller('uiPaginationController',['$scope','paginationConfig','$log','uiPaging','$attrs',function ($scope,paginationConfig,$log,uiPaging,$attrs) {
    var ctrl = this;

    // 初始化参数信息
    uiPaging.create(this,$scope,$attrs);
    function makePage(number,text,isActive) {
        return {
            number:number,
            text:text,
            active:isActive
        }
    }

    function getPages(currentPage,totalPages){
        var pages = [];
        var starPage = 1,endPage = totalPages;
        // 添加页面链接
        for(var number = starPage; number<= endPage; number++){
            var page = makePage(number,number,number === currentPage);
            pages.push(page);
        }
        return pages;
    };

    // 渲染页面
    var originalRender = this.render;
    this.render = function () {
        originalRender();
        if($scope.page > 0 && $scope.page <= $scope.totalPages){
            $scope.pages = getPages($scope.page,$scope.totalPages);
        }
    };
}])
.constant('paginationConfig',{
     itemsPerPage:10,
     first:'首页',
     next:'下一页',
     previous:'上一页',
     last:'末页'
})
.directive('uipagination',['$parse','paginationConfig',function($parse,paginationConfig){
    return{
        scope:{
            totalItems:'=',
            first:'@',
            previous:'@',
            next:'@',
            last:'@',
            ngDisabled:'='
        },
        require:['uipagination','?ngModel'],
        restrict:'A',
        controller:'uiPaginationController',
        templateUrl:function (element,attrs){
            return attrs.templateUrl || '../template/pagination.html';
        },
        link:function (scope,element,attrs,ctrls){
            var paginnationCtrl = ctrls[0],ngModelCtrl = ctrls[1];
            if(!ngModelCtrl){
                return;
            }
            paginnationCtrl.init(ngModelCtrl,paginationConfig);
        }
    }
}]);