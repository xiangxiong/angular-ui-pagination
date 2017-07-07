angular.module('angular-ui-paging',[])
.factory('uiPaging',['$parse','$log',function ($parse,$log) {
    return {
        create:function (ctrl,$scope,$attrs) {
            ctrl.ngModelCtrl = { $setViewValue:angular.noop };
            ctrl.watchers = [];

            ctrl.init = function(ngModelCtrl,config) {
                ctrl.ngModelCtrl = ngModelCtrl;
                ctrl.config = config;

                ngModelCtrl.$render = function () {
                    ctrl.render();
                };

                $scope.$watch('totalItems',function (newTotal,oldTotal){
                    if(angular.isDefined(newTotal) || newTotal !== oldTotal){
                        $log.log("totalItems");
                    }
                });
            };

        }
    }
}]);