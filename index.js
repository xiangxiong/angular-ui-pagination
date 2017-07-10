/**
 * Created by V-XiongXiang on 2017/7/3.
 */
import angular from 'angular';
import './directives';

var ngApp = angular.module('app',['angular-ui-pagination']);
PaginationDemoCtrl.$inject = ['$scope','$log'];

function  PaginationDemoCtrl($scope,$log){
    $scope.totalItems = 50;
    $scope.currentPage = 4;
    //
    // $scope.pageChanged = function(){
    //     $log.log('Page changed to: ' + $scope.currentPage);
    // };
    //

    // $scope.maxSize = 10;
    // $scope.bigTotalItems = 120;
    // $scope.bigCurrentPage = 1;
}
ngApp.controller("PaginationDemoCtrl",PaginationDemoCtrl);
