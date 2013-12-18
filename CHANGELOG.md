# 0.5.3

* Fixed issue with firefox #90

# 0.5.2

* Fixed issue with second re-submit

# 0.5.1

* Form now submits on [enter]
* modified the dsl to a simplier pattern

# 0.5.0
* Removed disabled and validated works in 1.2 

# 0.4.0
* Same as 0.3.21 just bumped to stable branch all new modifications will 
occur on 0.5.x 

# 0.3.21

* #75 Fix issue with <pre> tags on response back, should also address #77

# 0.3.20

* #72 Add beforeSubmit callback

# 0.3.19

* Removed JQuery Dependency re: https://github.com/intelekshual

# 0.3.18

* Modified bower.json to allow for all future versions of angular and
  jquery

# 0.3.14 

* Changed the way content of the upload iframe is obtained...

# 0.3.13

* cleaned up some unnecessary files to make distribution lean

# 0.3.12

* #56 added fixes for IE 9 and IE 10 from https://github.com/trov-codystebbins

# 0.3.10

* removed .DS_Store and corrected bower version

# 0.3.9

* #50 Add option to enable rails csrf, copy ng-model values to input values

# 0.3.8

* #43 Handle cases to support application/json and type/text and type/html.

# 0.3.7

* #34 changed the bind to occur after the iframe is added to the dom.

# 0.3.6

* #41 Prevent file from uploading if the submit element is disabled


# 0.3.5

* #35 fix(iframe - get content): Get html, not text
* #39 Bugfix: check url already have get params

# 0.3.3

* added conditional to click event preventDefault

# 0.3.2

* added preventDefault to click event

# 0.3.1

* Changed form detection to use .parents method instead of passing by scope

# 0.3.0

* Refactored API

Now there are two directives, ng-upload on your upload form and
upload-submit on your clickable submit object.  This new pattern
is more angularjs like and you can declare these directives as 
attributes or classes.

see the examples
 

# 0.2.1

* Added test
* Modified callback function to use angularjs $parse
* Removed explict usage of $ as jQuery

# 0.2.0

* Bug fixes and enahncements (#12 and #13)
* Addition of an example to demonstrate using ngUpload to submit a full form, with a file input and other types of inputs, to the server.
* Example also demonstate how to consume a JSON returned by the server in Angular. (Checkout example 5 on the demo page(s) - [ASP.Net MVC](http://ng-upload.azurewebsites.net) or [NodeJS](http://ng-upload.eu01.aws.af.cm/). 

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
