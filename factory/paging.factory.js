/**
 * Created by V-XiongXiang on 2017/7/6.
 */
angular.module('angular-ui-paging',[])
.factory('uiPaging',['$parse','$log',function ($parse,$log) {
    return{
        create:function (ctrl,$scope,$attrs) {
            ctrl.setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign:angular.noop;

            ctrl.ngModelCtrl = {$setViewValue:angular.noop};
            ctrl.watchers = [];
            ctrl.init = function (ngModelCtrl,config) {
                ctrl.ngModelCtrl = ngModelCtrl;
                ctrl.config = config;

                ngModelCtrl.$render = function(){
                    ctrl.render();
                };
                if($attrs.itemsPerPage){
                    ctrl.watchers.push($scope.$parent.$watch($attrs.itemsPerPage,function (value){
                        ctrl.itemsPerPage = parseInt(value,10);
                        $scope.totalPages = ctrl.calculateTotalPages();
                        ctrl.updatePage();
                    }));
                }else{
                    ctrl.itemsPerPage = config.itemsPerPage;
                }

                $scope.$watch('totalItems',function (newTotal,oldTotal) {
                   if(angular.isDefined(newTotal) || newTotal !== oldTotal){
                       $scope.totalPages = ctrl.calculateTotalPages();
                       ctrl.updatePage();
                   }
                });
            }

            ctrl.calculateTotalPages = function () {
                var totalPages = ctrl.itemsPerPage<1 ? 1:Math.ceil($scope.totalItems/ctrl.itemsPerPage);
                return Math.max(totalPages || 0,1);
            };

            ctrl.render = function () {
                $scope.page = parseInt(ctrl.ngModelCtrl.$viewValue,10) || 1;
            }
            
            $scope.selectPage = function (page,evt){
                if(evt){
                    evt.preventDefault();
                }

                var clickAllowed = !$scope.ngDisabled || !evt;
                if (clickAllowed && $scope.page !== page && page > 0 && page <= $scope.totalPages){
                    if(evt && evt.target){
                        evt.target.blur();
                    }
                    ctrl.ngModelCtrl.$setViewValue(page);
                    ctrl.ngModelCtrl.$render();
                }
            };

            $scope.getText = function (key) {
                return $scope[key+'Text'] || ctrl.config[key+'Text'];
            }

            $scope.noPrevious = function () {
                return $scope.page === 1;
            }

            $scope.noNext = function () {
                return $scope.page === $scope.totalPages;
            }

            ctrl.updatePage = function () {
                ctrl.setNumPages($scope.$parent,$scope.totalPages);
                if($scope.page > $scope.totalPages){
                    $scope.selectPage($scope.totalPages);
                }else{
                    ctrl.ngModelCtrl.$render();
                }
            };

            $scope.$on('$destroy',function () {
               while (ctrl.watchers.length){
                   ctrl.watchers.shift()();
               }
            });
        }
    }
}]);
