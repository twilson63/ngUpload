# ngUpload

A simple iframe upload service for AngularJS

## Usage

Add to your html file

```
<script src="/services/upload.js"></script>
```

Inject module into your application

```
var app = angular.module('myApp', ['ngUpload']);
```

Create a basic form with a file input element

```
<form action="/upload">
  <input type="file" name="logo"></input>
  <button ng-click="upload()">Upload</button>
</form>
```

In your controller, capture the upload event
and call upload.submit

```
app.controller('Index', function($scope, upload) {
  $scope.upload = function() {
    upload.submit(function(content){
      // handle response back....
    });
  }
});
```

## How to contribute

pull requests welcome.

## Thanks

* AngularJS Team
* NodeJS Team
* JavaScript Team