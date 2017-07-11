# angular-ui-pagination
angular-ui-pagination 分页 / AngularJS 分页 / pagination

## Installation
Download the package from github. The package is also availble over npm install angular-ui-pagination or bower install angular-ui-pagination

Include 'javascript' and 'css' files into your page.


Declare a dependency on the module.


```js
angular.module('myModule',['angular-ui-pagination']);
```


Insert the pagination in your html template
Default pagination 

```html
<div class="row">
	<div class="col-12">
		<ui uipagination total-items="totalItems" ng-model="currentPage" class="pagination" ng-change="pageChanged()"></ui>
	</div>
</div>
```

## Design


```css
You can completely change the design if you want.
.pagination {
    margin-top: 0;
}
.pagination .page-item .page-link {
    color: #37a884;
}
.pagination .page-item.active .page-link,
.pagination .page-item.active .page-link:focus,
.pagination .page-item.active .page-link:hover {
    color: #fff;
    border-color: #37a884;
    background-color: #37a884;
}
.pagination > .active > a, .pagination > .active > span, .pagination > .active > a:hover, .pagination > .active > span:hover, .pagination > .active > a:focus, .pagination > .active > span:focus {
    border-color: #37a884 !important;
    background-color: #37a884 !important;
}
```

## How to Use
``` js
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
            url: 'xxx',
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
```






