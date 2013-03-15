# 0.3.1

* Changed form detection to use .parents method instead of passing by scope

# 0.3.0

* Refactored API (Breaks existing codes)

Now there are two directives, ng-upload on your upload form and
upload-submit on your clickable submit object.  This new pattern
is more angularjs like and you can declare these directives as 
attributes or classes.

``` html
   <form ng-upload action="/upload-full-form">
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
           <input type="submit" class="btn" value="Submit" 
             upload-submit="uploadComplete(contents, completed)" />
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
    if (completed && content.length > 0) {
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

# 0.2.1

* Added test
* Modified callback function to use angularjs $parse
* Removed explict usage of $ as jQuery

# 0.2.0

* Bug fixes and enahncements (#12 and #13)
* Addition of an example to demonstrate using ngUpload to submit a full form, with a file input and other types of inputs, to the server.
* Example also demonstate how to consume a JSON returned by the server in Angular. (Checkout example 5 on the demo page(s) - [ASP.Net MVC](http://ng-upload.azurewebsites.net) or [NodeJS](http://ng-upload.eu01.aws.af.cm/). 

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
    if (completed && content.length > 0) {
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

## Update 0.1.1

* ngUpload is now an AngularJS Directive, removing the need to deal with the form[@id] attribute.
* Addition of the __uploadOptionsEnableControls__ option to prevent the default disabling of submission controls during upload, like so:
``` html
<form ng-upload='callbackFunction(contents, completed)' uploadOptionsEnableControls>
   ...
</form>
``` 
_Submission controls are html elements marked with the **upload-submit** css class_.
* Some bug fixes.


This source code of this example is given below:
