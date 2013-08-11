// Version (see package.json)
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
    .directive('uploadSubmit', ['$parse', function($parse) {
        return {
            restrict: 'AC',
            link: function(scope, element, attrs) {
                // Options (just 1 for now)
                // Each option should be prefixed with 'upload-options-' or 'uploadOptions'
                // {
                //    // specify whether to enable the submit button when uploading forms
                //    enableControls: bool
                //
                //    // sets the value of hidden input to their ng-model when the form is submitted
                //    convertHidden
                // }
                var options = {};
                options.enableControls = attrs.uploadOptionsEnableControls;

                if ( attrs.hasOwnProperty( "uploadOptionsConvertHidden" ) ) {
                    // Allow blank or true
                    options.convertHidden = attrs.uploadOptionsConvertHidden != "false";
                }

                // submit the form - requires jQuery
                var form = angular.element(element).parents('form');

                // Retrieve the callback function
                var fn = $parse(attrs.uploadSubmit);

                if (!angular.isFunction(fn)) {
                    var message = "The expression on the ngUpload directive does not point to a valid function.";
                    throw message + "\n";
                }

                element.bind('click', function($event) {
                    // prevent default behavior of click
                    if ($event) {
                        $event.preventDefault = true;
                    }

                    if (element.attr('disabled')) {
                        return;
                    }

                    // create a new iframe
                    var iframe = angular.element("<iframe id='upload_iframe' name='upload_iframe' border='0' width='0' height='0' style='width: 0px; height: 0px; border: none; display: none' />");

                    // add the new iframe to application
                    form.parent().append(iframe);

                    // attach function to load event of the iframe
                    iframe.bind('load', function () {
                        // get content using native DOM. use of jQuery to retrieve content triggers IE bug 
                        // http://bugs.jquery.com/ticket/13936
                        var nativeIframe = iframe[0];                       
                        var iFrameDoc = nativeIframe.contentDocument || nativeIframe.contentWindow.document;
                        var content = iFrameDoc.body.innerText || iFrameDoc.body.textContent;
                        try {
                            content = $.parseJSON(content);
                        } catch (e) {
                            if (console) { console.log('WARN: XHR response is not valid json'); }
                        }
                        // if outside a digest cycle, execute the upload response function in the active scope
                        // else execute the upload response function in the current digest
                        if (!scope.$$phase) {
                            scope.$apply(function () {
                                fn(scope, { content: content, completed: true });
                            });
                        } else {
                            fn(scope, { content: content, completed: true });
                        }
                        // remove iframe
                        if (content !== "") { // Fixes a bug in Google Chrome that dispose the iframe before content is ready.
                            setTimeout(function () { iframe.remove(); }, 250);
                        }
                        element.attr('disabled', null);
                        element.attr('title', 'Click to start upload.');
                    });

                    if (!scope.$$phase) {
                        scope.$apply(function () {
                            fn(scope, {content: "Please wait...", completed: false });
                        });
                    } else {
                        fn(scope, {content: "Please wait...", completed: false });
                    }

                    var enabled = true;
                    if (!options.enableControls) {
                        // disable the submit control on click
                        element.attr('disabled', 'disabled');
                        enabled = false;
                    }
                    // why do we need this???
                    element.attr('title', (enabled ? '[ENABLED]: ' : '[DISABLED]: ') + 'Uploading, please wait...');

                    // If convertHidden option is enabled, set the value of hidden fields to the eval of the ng-model
                    if (options.convertHidden) {
                        form.find(':hidden[ng-model]').each( function() {
                            $(this).attr('value', scope.$eval( $(this).attr('ng-model') ));
                        });
                    }

                    form.submit();

                }).attr('title', 'Click to start upload.');
            }
        };
    }])
    .directive('ngUpload', ['$parse', function ($parse) {
        return {
            restrict: 'AC',
            link: function (scope, element, attrs) {

                // Options (just 1 for now)
                // Each option should be prefixed with 'upload-options-' or 'uploadOptions'
                // {
                //    // add the Rails CSRF hidden input to form
                //    enableRailsCsrf: bool
                // }

                var options = {};
                if ( attrs.hasOwnProperty( "uploadOptionsEnableRailsCsrf" ) ) {
                    // allow for blank or true
                    options.enableRailsCsrf = attrs.uploadOptionsEnableRailsCsrf != "false";
                }

                element.attr("target", "upload_iframe");
                element.attr("method", "post");
                // Append a timestamp field to the url to prevent browser caching results
                var separator = element.attr("action").indexOf('?')==-1 ? '?' : '&';
                element.attr("action", element.attr("action") + separator + "_t=" + new Date().getTime());
                element.attr("enctype", "multipart/form-data");
                element.attr("encoding", "multipart/form-data");

                // If enabled, add csrf hidden input to form
                if ( options.enableRailsCsrf ) {
                    $("<input />")
                        .attr("id", "upload-csrf-token")
                        .attr("type", "hidden")
                        .attr("name", $('meta[name=csrf-param]').attr('content') )
                        .val( $('meta[name=csrf-token]').attr('content') )
                        .appendTo(element);

                }
            }
        };
    }]);
