# angular-ui-pagination
angular-ui-pagination Plugins

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


maxSize pagination


```html
<div class="row">
	<div class="col-12">
		<ui uipagination total-items="totalItems" max-size="maxSize" ng-model="currentPage" class="pagination" ng-change="pageChanged()"></ui>
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






