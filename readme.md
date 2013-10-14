# ngUpload

An AngularJS file upload directive.  

## 0.3.21 - for updates see CHANGELOG.md

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
           <label>Favorite Color:</label>
           <input type="text" name="color" ng-model="color"/>
       </p>
       <p>
           <label>Your picture (file will not be saved on the server):</label>
           <input type="file" name="file" />
       </p>
       <p>
           <input type="submit" class="btn" value="Submit" 
             upload-submit="uploadComplete(content, completed)" />
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

## Requirements

* AngularJS (http://angularjs.org)

## Install with Bower

```
bower install ngUpload 
```

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

* Working in IE

In order, for ngUpload to respond correctly for IE, your server needs to return the response back as `html/text` not `application/json`


## Directive Options

### ngUpload

* `upload-options-enable-rails-csrf`: Turns on support for [Rails' CSRF](http://guides.rubyonrails.org/security.html#cross-site-request-forgery-csrf) 
                               by adding a hidden form field with the csrf token.

### uploadSubmit

* `upload-options-enable-controls`: Whether to enable the submit button when uploading forms.
* `upload-options-convert-hidden`: Set the value of hidden inputs to their `ng-model` attribute when the form is submitted.




## Example

Example of forms that posts to NodeJS server are now included under the [/examples](https://github.com/twilson63/ngUpload/tree/master/examples) folder.

## Test

Needs Chrome Installed.

``` sh
npm install
npm install grunt-cli -g

npm test
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
* Hassan Alqaraguli (https://github.com/HassanAlqaraguli)
* Jørgen Borgesen (https://github.com/jorgenfb)
* cristianocd (https://github.com/cristianocd)
* Evgeniy Zatsepin (https://github.com/dizzy7)
* Chris Tesene (https://github.com/ctesene)
* denyo (https://github.com/denyo)
* mguymon (https://github.com/mguymon)
* marek-stoj (https://github.com/marek-stoj)
* Robert Coker (https://github.com/intelekshual)
* Michael Guymon (https://github.com/mguymon)

## Thanks

* AngularJS Team
* NodeJS Team
* JavaScript Team
