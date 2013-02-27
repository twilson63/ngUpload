# ngUpload

An AngularJS file upload directive.  

## Usage

Add to your html file

```
<script src="/js/ng-upload.js"></script>
```

Create a basic form with a file input element

``` html
<div ng-app="app">
  <div ng-controller="mainCtrl">
   <form action="/uploads" ng-upload="results()"> 
     <input type="file" name="avatar"></input>
     <input type="submit" value="Upload"></input>
   </form>
 </div>
</div>

```

``` js
angular.module('app', ['ng-upload'])
  .controller('mainCtrl', function($scope) {
    $scope.results = function(content) {
      console.log(content);
    }  
});
```

## License

MIT

## How to contribute

pull requests welcome.

## Thanks

* AngularJS Team
* NodeJS Team
* JavaScript Team