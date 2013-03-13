# ngUpload

An AngularJS file upload directive.  

## Latest version: 0.3.1 (for updates see CHANGELOG.md)

## Requirements

* AngularJS (http://angularjs.org)
* JQuery (http://jquery.org)

## Usage

Add to your html file

```
<script src="/js/ng-upload.js"></script>
```

Create a basic form with a file input element

``` html
<div ng-app="app">
  <div ng-controller="mainCtrl">
   <form action="/uploads" ng-upload> 
     <input type="file" name="avatar"></input>
     <input type="submit" value="Upload" 
       upload-submit="results(content, completed)"></input>
   </form>
 </div>
</div>
```

### Some rule of thumb

* Any html element that supports the click event can be used to submit the form marked with the __ng-upload__ directive, as long as such elements are marked with the __'upload-submit'__ directive.
* Make sure you import the __'ngUpload'__ module in your angularJS application.

Applying this rules, the sample above can be re-written as

``` html
<div ng-app="app">
  <div ng-controller="mainCtrl">
   <form action="/uploads" ng-upload> 
     <input type="file" name="avatar"></input>
     <div style='cursor: pointer' upload-submit="results(content, completed)">Upload with Div</div> &bull;
   </form>
 </div>
</div>
```

or

``` html
<div ng-app="app">
  <div ng-controller="mainCtrl">
   <form action="/uploads" ng-upload> 
     <input type="file" name="avatar"></input>
     <a href='javascript:void(0)' 
       class="upload-submit: results(contents, completed)" >
         Upload with Anchor</a>
   </form>
 </div>
</div>
```

where the form can be submit with a Div or Anchor html element.

The AngularJS controller for the above samples is given as:

``` js
angular.module('app', ['ngUpload'])
  .controller('mainCtrl', function($scope) {
    $scope.results = function(content, completed) {
      if (completed && content.length > 0)
        console.log(content); // process content
      else
      {
        // 1. ignore content and adjust your model to show/hide UI snippets; or
        // 2. show content as an _operation progress_ information
      }
    }
});
```

## Example

Example of forms that posts to ASP.Net MVC or NodeJS server are now included under the [/examples](https://github.com/twilson63/ngUpload/tree/master/examples) folder.

Live demo of the ASP.Net MVC example can be found at http://ng-upload.azurewebsites.net  

Live demo of the NodeJS example can be found at http://ng-upload.eu01.aws.af.cm

## Installation via NuGet

In addition to downloading [ng-upload](https://github.com/twilson63/ngUpload/zipball/master) directly, this directive can also be installed via 

[NuGet](http://www.nuget.org) under the package identity [__AngularJs.ngUpload__](https://nuget.org/packages/AngularJS.ngUpload/).  

To install, enter:
```
install-package AngularJS.ngUpload
```
on the Package Manager Console of Visual Studio. Or you can search for the [__AngularJs.ngUpload__](https://nuget.org/packages/AngularJS.ngUpload/) package via the Manage NuGet packages context menu for your solution or project.

## Test

Needs Chrome Installed.

``` sh
npm install
npm install testacular -g

testacular start
```

## jshint

``` sh
npm install
npm install grunt-cli -g

grunt jshint
```

## Minify

``` sh
npm install
npm install grunt-cli -g

grunt uglify
```


## License

MIT

## How to contribute

pull requests welcome.

please use the following style guidelines

(http://nodeguide.com/style.html)

## Contributors

* ADEBISI Foluso A. (https://github.com/adebisi-fa)

## Thanks

* AngularJS Team
* NodeJS Team
* JavaScript Team
