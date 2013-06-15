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
