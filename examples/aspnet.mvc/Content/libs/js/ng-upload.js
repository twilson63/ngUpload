// AngularJS simple file upload directive
// this directive uses an iframe as a target
// to enable the uploading of files without
// losing focus in the ng-app.
//
// <div ng-app="app">
//   <div ng-controller="mainCtrl">
//    <form action="/uploads" ng-upload="results()"> 
//      <input type="file" name="avatar"></input>
//      <input type="submit" value="Upload"></input>
//    </form>
//  </div>
// </div>
//
//  angular.module('app', ['ng-upload'])
//    .controller('mainCtrl', function($scope) {
//      $scope.results = function(content) {
//        console.log(content);
//      }  
//  });
//
angular.module('ngUpload', [])
  .directive('ngUpload', function () {
      return {
          restrict: 'A',
          link: function (scope, element, attrs) {

              // Options (just 1 for now) 
              // Each option should be prefixed with 'upload-Options-' or 'uploadOptions'
              // {
              //    // specify whether to disable the submit button when uploading forms
              //    enableControls: bool 
              // }
              var options = {};
              options.enableControls = attrs['uploadOptionsEnableControls'];

              // get scope function to execute on successful form upload
              if (attrs['ngUpload']) {

                  element.attr("target", "upload_iframe");
                  element.attr("method", "post");
                  element.attr("enctype", "multipart/form-data");
                  element.attr("encoding", "multipart/form-data");

                  // Retrieve the callback function
                  var fn = attrs['ngUpload'].split('(')[0];
                  var callbackFn = scope[fn];

                  // Helper function to create new iframe for each form submission
                  var addNewDisposableIframe = function (submitControl) {
                      // create a new iframe
                      var iframe = $("<iframe id='upload_iframe' name='upload_iframe' border='0' width='0' height='0' style='width: 0px; height: 0px; border: none; display: none' />");

                      // attach function to load event of the iframe
                      iframe.bind('load', function () {

                          //remove listener
                          iframe.unbind('load');

                          // get content - requires jQuery
                          var content = iframe.contents().find('body').text();

                          // execute the upload response function in the active scope
                          scope.$apply(function () { callbackFn(content); });

                          // remove iframe
                          setTimeout(function () { iframe.remove() }, 250);

                          //if (options.enableControls == null || !(options.enableControls.length >= 0))
                          submitControl.attr('disabled', null);
                          submitControl.attr('title', 'Click to start upload.');
                      });

                      // add the new iframe to application
                      element.parent().append(iframe);
                  }

                  // 1) get the upload submit control(s) on the form (submitters must be decorated with the 'ng-upload-submit' class)
                  // 2) attach a handler to the controls' click event
                  $('.upload-submit', element).click(
                      function () {

                          scope.$apply(function () { callbackFn('Please wait...'); });

                          console.log(angular.toJson(options));

                          var enabled = true;
                          if (options.enableControls == null || !(options.enableControls.length >= 0)) {
                              // disable the submit control on click
                              $(this).attr('disabled', 'disabled');
                              enabled = false;
                          }

                          $(this).attr('title', (enabled ? '[ENABLED]: ' : '[DISABLED]: ') + 'Uploading, please wait...');

                          addNewDisposableIframe($(this) /* pass the submit control */);

                          // submit the form
                          $(element).submit();
                      }
                  ).attr('title', 'Click to start upload.');
              }
              else
                  console.log("No callback function found on the ngUpload directive.");
          }
      }
  });