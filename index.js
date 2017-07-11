/**
 * Created by V-XiongXiang on 2017/7/3.
 */
import angular from 'angular';
import './directives';

var ngApp = angular.module('app', ['angular-ui-pagination']);
PaginationCtrl.$inject = ['$scope','$http'];

function PaginationCtrl($scope, $http) {
    $scope.viewModel = {
        totalItems:40,      // 总记录数
        currentPage: 1,     // 当前页（默认第一页）
        tableData: {}
    };

    $scope.pageChanged = function () {
        query($scope.viewModel.currentPage);
    };

    // 初始化
    $scope.init = function () { 
        query($scope.viewModel.currentPage);
    }

    // 查询
    var query = function (currentPage) {
        var  request = {
            method: 'POST',
            url: 'xxxx',
            data: { pageNo: currentPage, pageSize: 10 }
        };

        $http(request)
        .then(function (response) {
               // $scope.viewModel.totalItems = response.data.rowCount;
                $scope.viewModel.tableData = response.data;
                console.log(response.data);
         });
    }
}
ngApp.controller("PaginationCtrl", PaginationCtrl);
