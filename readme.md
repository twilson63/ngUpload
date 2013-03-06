# ngUpload

An AngularJS file upload directive.  

## Update

Instead of treating this as a service, I have converted ngUpload to 
an AngularJS Directive, this way you do not have to deal with @id when referencing the form element.  

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
     <input type="submit upload-submit" value="Upload"></input>
   </form>
 </div>
</div>
```

### Some rule of thumb

* Any html element that supports the click event can be used to submit the form marked with the __ng-upload__ directive, as long as such elements are marked with the 'upload-submit' class.
* The __()__ suffix on the __ng-upload__ directive callback function is optional.
* Make sure you import the __'ngUpload'__ module in your angularJS application.

Applying this rules, the sample above can be re-written as

``` html
<div ng-app="app">
  <div ng-controller="mainCtrl">
   <form action="/uploads" ng-upload="results"> 
     <input type="file" name="avatar"></input>
     <div class='upload-submit' style='cursor: pointer'>Upload with Div</div> &bull;
     <a class='upload-submit' href='javascript:void(0)'>Upload with Anchor</a>
   </form>
 </div>
</div>
```
where the form can be submit with a Div or Anchor html element.

The AngularJS controller for the above samples is given as:

``` js
angular.module('app', ['ngUpload'])
  .controller('mainCtrl', function($scope) {
    $scope.results = function(content) {
      console.log(content);
    }  
});
```

## Example

Example of forms that posts to ASP.Net MVC or NodeJS server are now include under the [/examples](https://github.com/adebisi-fa/ngUpload/tree/master/examples) folder.

Live examples of the ASP.Net MVC sample can be found at http://ng-upload.azurewebsites.net

## License

MIT

## How to contribute

pull requests welcome.

## Thanks

* AngularJS Team
* NodeJS Team
* JavaScript Team
