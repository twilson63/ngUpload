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
angular.module('ng-upload', [])
  .directive('ngUpload', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        // build iframe
        var iframe = angular.element("<iframe id='upload_iframe' name='upload_iframe' width=0 height=0 border=0 style='width: 0; height: 0; border: none;'></iframe>");
        // add iframe to app
        element.parent().append(iframe);
        // attach function to load event
        iframe.bind('load', function() {
          // remove listener
          iframe.unbind('load');
          // get scope function
          if (attrs['ngUpload']) {
            var fn = attrs['ngUpload'].split('(')[0];
            // get content - requires jQuery
            var content = iframe.contents().find('body').text();
            // get response
            scope.$apply(function() { scope[fn](content); });
          }
          // remove iframe
          setTimeout(function() { iframe.remove() }, 250);
        });
        // add file attributes to form
        element.attr("target", "upload_iframe");
        element.attr("method", "post");
        element.attr("enctype", "multipart/form-data");
        element.attr("encoding", "multipart/form-data");
      }
    }
});