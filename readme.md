# ngUpload

An AngularJS file upload directive.  

## Update 0.2.1

* Bug fixes and enahncements (#12 and #13)
* Addition of an example to demonstrate using ngUpload to submit a full form, with a file input and other types of inputs, to the server.
* Example also demonstate how to consume a JSON returned by the server in Angular. (Checkout example 5 on the demo page(s) - [ASP.Net MVC](http://ng-upload.azurewebsites.net) or [NodeJS](http://ng-upload.eu01.aws.af.cm/). 

This source code of this example is given below:

``` html
   <form ng-upload="uploadComplete(contents, completed)" action="/upload-full-form">
       <p>
           <label>Fullname:</label>
           <input type="text" name="fullname" ng-model="fullname" />
       </p>
       <p>
           <label>Gender:</label>
           <input type="text" name="gender" ng-model="gender" />
       </p>
       <p>
           <label>Favourite Color:</label>
           <input type="text" name="color" ng-model="color"/>
       </p>
       <p>
           <label>Your picture (file will not be saved on the server):</label>
           <input type="file" name="file" />
       </p>
       <p>
           <input type="submit" class="btn upload-submit" value="Submit" />
       </p>
   </form>
   <div class="alert alert-info">Server Response: {{response | json}}</div>
   <div>
       Fullname: <b>{{response.fullname}}</b><br />
       Gender: <b>{{response.gender}}</b><br />
       Favourite Color: <span ng-style="response.style">{{response.color}}</span><br />
       Picture: {{response.pictureUrl}}
   </div>
```
... and the context ngController's source is:

``` js
   app.controller('Example5Ctrl', function ($scope) {
      $scope.uploadComplete = function (content, completed) {
          if (completed && content.length > 0)
          {
              $scope.response = JSON.parse(content); // Presumed content is a json string!
              $scope.response.style = {
                  color: $scope.response.color,
                  "font-weight": "bold"
              };
              
              // Clear form (reason for using the 'ng-model' directive on the input elements)
              $scope.fullname = '';
              $scope.gender = '';
              $scope.color = '';
              // Look for way to clear the input[type=file] element
          }
      };
   });
```

## Update 0.2.0

* ngUpload is now an AngularJS Directive, removing the need to deal with the form[@id] attribute.
* Addition of the __uploadOptionsEnableControls__ option to prevent the default disabling of submission controls during upload, like so:
``` html
<form ng-upload='callbackFunction(contents, completed)' uploadOptionsEnableControls>
   ...
</form>
``` 
_Submission controls are html elements marked with the **upload-submit** css class_.
* Some bug fixes.

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
   <form action="/uploads" ng-upload="results(content, completed)"> 
     <input type="file" name="avatar"></input>
     <input type="submit" class="upload-submit" value="Upload"></input>
   </form>
 </div>
</div>
```

### Some rule of thumb

* Any html element that supports the click event can be used to submit the form marked with the __ng-upload__ directive, as long as such elements are marked with the 'upload-submit' class.
* Make sure you import the __'ngUpload'__ module in your angularJS application.

Applying this rules, the sample above can be re-written as

``` html
<div ng-app="app">
  <div ng-controller="mainCtrl">
   <form action="/uploads" ng-upload="results(contents, completed)"> 
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

In addition to downloading [ng-upload](https://github.com/twilson63/ngUpload/zipball/master) directly, this directive can also be installed via [NuGet](http://www.nuget.org) under the package identity [__AngularJs.ngUpload__](https://nuget.org/packages/AngularJS.ngUpload/).  

To install, enter:
```
install-package AngularJS.ngUpload
```
on the Package Manager Console of Visual Studio. Or you can search for the [__AngularJs.ngUpload__](https://nuget.org/packages/AngularJS.ngUpload/) package via the Manage NuGet packages context menu for your solution or project.

## License

MIT

## How to contribute

pull requests welcome.

## Contributors

* ADEBISI Foluso A. (https://github.com/adebisi-fa)

## Thanks

* AngularJS Team
* NodeJS Team
* JavaScript Team
