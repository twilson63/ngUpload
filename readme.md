# ngUpload

An AngularJS file upload directive.  

## Update

Instead of treating this as a service, I have converted ngUpload to 
an AngularJS Directive, this way you do not have to deal with id's when referencing the form element.  The only drawback is the requirement to use jQuery to normalize the pulling of iFrame contents on a completed response from the server.  

## Requirements

* AngularJS
* JQuery

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

## Example

see `example` folder

## License

MIT

## How to contribute

pull requests welcome.

## Thanks

* AngularJS Team
* NodeJS Team
* JavaScript Team