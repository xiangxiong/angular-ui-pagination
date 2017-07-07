angular.module("angular-ui-pagination",['angular-ui-paging'])
.controller('uiPaginationController',['$scope','paginationConfig','$log','uiPaging','$attrs',function ($scope,paginationConfig,$log,uiPaging,$attrs) {
    var ctrl = this;

    $scope.getText = function(key){
        return paginationConfig[key]
    }

    uiPaging.create(this,$scope,$attrs);

}])
.constant('paginationConfig',{
     rowCount:10,
     first:'首页',
     next:'下一页',
     previous:'上一页',
     last:'末页'
})
.directive('uipagination',['paginationConfig',function(paginationConfig){
    return{
        restrict:'A',
        require:['uipagination','?ngModel'],
        templateUrl:function (element,attrs) {
            return attrs.templateUrl || '../template/pagination.html';
        },
        controller:'uiPaginationController',
        link:function (scope,element,attrs,ctrls) {
            var paginnationCtrl = ctrls[0],ngModelCtrl = ctrls[1];
            if(!ngModelCtrl){
                return;
            }
        }
    }
}]);