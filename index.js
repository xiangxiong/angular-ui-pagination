/**
 * Created by V-XiongXiang on 2017/7/3.
 */
import angular from 'angular';
import './directives';

var ngApp = angular.module('app',['angular-ui-pagination']);
PaginationCtrl.$inject = ['$scope','$log'];

function  PaginationCtrl($scope,$log){
    $scope.totalItems = 50;
    $scope.currentPage = 4;

    $scope.pageChanged = function()
    {
        // $log.log('Page changed to: ' + $scope.currentPage);
    };
}
ngApp.controller("PaginationCtrl",PaginationCtrl);
