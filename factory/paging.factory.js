angular.module('angular-ui-paging', [])
    .factory('uiPaging', ['$parse', '$log', function ($parse, $log) {
        return {
            create: function (ctrl, $scope, $attrs) {
                ctrl.ngModelCtrl = {$setViewValue: angular.noop};
                ctrl.watchers = [];

                ctrl.init = function (ngModelCtrl, config) {
                    ctrl.ngModelCtrl = ngModelCtrl;
                    ctrl.config = config;

                    ngModelCtrl.$render = function(){
                         ctrl.render();
                    };

                    if ($attrs.itemsPerPage) {
                        ctrl.itemsPerPage = $attrs.itemsPerPage;
                    }else{
                        ctrl.itemsPerPage = config.itemsPerPage;
                    }

                    $scope.$watch('totalItems', function (newTotal, oldTotal) {
                        if (angular.isDefined(newTotal) || newTotal !== oldTotal) {
                            $scope.totalPages = ctrl.calculateTotalPages();
                            ctrl.updatePage();
                        }
                    });
                };

                // 计算总页数.
                ctrl.calculateTotalPages = function () {
                    var totalPages = ctrl.itemsPerPage < 1 ? 1:Math.ceil($scope.totalItems / ctrl.itemsPerPage);
                    return Math.max(totalPages || 0,1);
                };

                // 页面渲染初始化当前页.
                ctrl.render = function () {
                    $scope.page = parseInt(ctrl.ngModelCtrl.$viewValue,10) || 1;
                }

                // 显示分页的文本信息
                $scope.getText = function(key){
                    return ctrl.config[key];
                }

                $scope.noPrevious = function () {
                    return $scope.page === 1;
                }

                $scope.noNext = function () {
                    return $scope.page === $scope.totalPages;
                }

                // 重新渲染页面
                ctrl.updatePage = function () {
                   if($scope.page > $scope.totalPages){
                        $scope.selectPage($scope.totalPages);
                   }else{
                        ctrl.ngModelCtrl.$render();
                   }
                };
                
                // 选中当前页
                $scope.selectPage = function (page,evt){
                    if(evt){
                        evt.preventDefault();
                    }
                    var clickAllowed = !$scope.ngDisabled || !evt;
                    if(clickAllowed && $scope.page !== page && page > 0 && page <= $scope.totalPages){
                        if(evt && evt.target){
                            evt.target.blur();
                        }
                        ctrl.ngModelCtrl.$setViewValue(page);
                        ctrl.ngModelCtrl.$render();
                    }
                };
            }
        }
    }]);