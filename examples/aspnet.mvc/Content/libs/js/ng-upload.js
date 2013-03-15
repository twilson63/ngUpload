// Version 0.3.1
// AngularJS simple file upload directive
// this directive uses an iframe as a target
// to enable the uploading of files without
// losing focus in the ng-app.
//
// <div ng-app="app">
//   <div ng-controller="mainCtrl">
//    <form action="/uploads" ng-upload> 
//      <input type="file" name="avatar"></input>
//      <input type="submit" value="Upload" 
//         upload-submit="submited(content, completed)"></input>
//    </form>
//  </div>
// </div>
//
//  angular.module('app', ['ngUpload'])
//    .controller('mainCtrl', function($scope) {
//      $scope.submited = function(content, completed) {
//        if (completed) {
//          console.log(content);
//        }
//      }  
//  });
//
angular.module('ngUpload', [])
  .directive('uploadSubmit', ['$parse', function ($parse) {
      return {
          restrict: 'AC',
          link: function (scope, element, attrs) {

              // Options (just 1 for now) 
              // Each option should be prefixed with 'upload-options-' or 'uploadOptions'
              // {
              //    // specify whether to enable the submit button when uploading forms
              //    enableControls: bool 
              // }
              var options = {};
              options.enableControls = attrs.uploadOptionsEnableControls;

              // "ng:upload" is excluded as it fails some test Specs
              var ngUploadSyntaxes = ["ng-upload", "ng_upload", "x-ng-upload", "data-ng-upload"];

              // Find an enclosing form
              var form = null;

              // First attempt using the attribute syntax, i.e. <form ngUploadSyntax />
              angular.forEach(ngUploadSyntaxes,
                  function (ngUploadSyntax) {
                      // if a form has already been found, . . .
                      if (form)
                          return; // stop searching, jump out!

                      var forms = element.closest('form[' + ngUploadSyntax + ']');

                      if (forms.length > 0) // If a form is found
                          form = forms.first(); // jqery always return a collection, so pick first
                  }
              );

              if (form == null) {
                  // Second attempt using the class syntax, i.e. <form class='ngUploadSyntax' />
                  angular.forEach(ngUploadSyntaxes,
                      function (ngUploadSyntax) {
                          // if a form has already been found, . . .
                          if (form)
                              return; // stop searching, jump out!

                          var forms = element.closest('form.' + ngUploadSyntax);

                          if (forms.length > 0) // If a form is found
                              form = forms.first(); // jqery always return a collection, so pick first
                      }
                  );
              }

              if (form == null)
                  // Complain
                  throw "[uploadSubmit] Directive can only be used inside a form.";

              if (!attrs.uploadSubmit && form.attr("ng-upload"))
                  attrs.uploadSubmit = form.attr("ng-upload");

              if (!attrs.uploadSubmit) {
                  throw "[uploadSubmit] A valid callback function must be supplied.";
              }

              // Retrieve the callback function
              var fnExpr = attrs.uploadSubmit.split('(')[0];
              var fn = scope.$eval(fnExpr); //$parse(attrs.uploadSubmit);

              if (!angular.isFunction(fn)) {
                  var message = "[uploadSubmit] Expression does not point to a valid function.";
                  throw message + "\n";
              }

              element.bind('click', function () {

                  // new id is generated for the iframe as every click
                  form.attr('target', new Date().getTime());

                  // create a new iframe
                  var iframe = angular.element("<iframe id='" + form.attr("target") + "' name='" + form.attr("target") + "' border='0' width='0' height='0' style='width: 0px; height: 0px; border: none; display: none' />");

                  // attach function to load event of the iframe
                  iframe.bind('load', function () {
                      // get content - requires jQuery
                      var content = iframe.contents().find('body').text();

                      // execute the upload response function in the active scope
                      scope.$apply(function () {
                          fn(content, true);
                      });

                      // remove iframe
                      if (content !== "") { // Fixes a bug in Google Chrome that dispose the iframe before content is ready.
                          setTimeout(function () { iframe.remove(); }, 250);
                          element.attr('disabled', null);
                          element.attr('title', 'Click to start upload.');
                      }
                  });

                  // add the new iframe to application
                  form.parent().append(iframe);

                  scope.$apply(function () {
                      fn("Please wait...", false);
                  });

                  var enabled = true;
                  if (!options.enableControls) {
                      // disable the submit control on click
                      element.attr('disabled', 'disabled');
                      enabled = false;
                  }
                  // why do we need this???
                  element.attr('title', (enabled ? '[ENABLED]: ' : '[DISABLED]: ') + 'Uploading, please wait...');

                  // submit the form - requires jQuery
                  form.submit();

              }).attr('title', 'Click to start upload.');
          }
      };
  }])
  .directive('ngUpload', ['$parse', function ($parse) {
      return {
          restrict: 'AC',
          link: function (scope, element, attrs) {
              /*
                  target iframe identity are autogenerated to avoid iframe 'Permission Denied' errors
              */
              // element.attr("target", "upload_iframe");
              // element.attr('target', new Date().getTime());
              element.attr("method", "post");
              element.attr("enctype", "multipart/form-data");
              element.attr("encoding", "multipart/form-data");
          }
      };
  }]);