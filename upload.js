// Service code was resourced from
// http://viralpatel.net/blogs/ajax-style-file-uploading-using-hidden-iframe/

angular.module('ngUpload', []).factory('upload', function($window, $rootScope){
  var createIframe = function() {
    var iframe = $window.document.createElement('iframe');
    iframe.setAttribute("id", "upload_iframe");
    iframe.setAttribute("name", "upload_iframe");
    iframe.setAttribute("width", "0");
    iframe.setAttribute("height", "0");
    iframe.setAttribute("border", "0");
    iframe.setAttribute("style", "width: 0; height: 0; border: none;");
    return iframe;
  }
  var setFormProperties = function(form) {
    // Set properties of form...
    form.setAttribute("target", "upload_iframe");
    form.setAttribute("method", "post");
    form.setAttribute("enctype", "multipart/form-data");
    form.setAttribute("encoding", "multipart/form-data");
  }

  return {
    submit: function(formId, callback) {
      var form = $window.document.getElementById(formId);
      var iframe = createIframe();
      form.parentNode.appendChild(iframe);
      $window.frames['upload_iframe'].name = 'upload_iframe';

      iframeId = $window.document.getElementById('upload_iframe');

      var eventHandler = function () {
         if (iframeId.detachEvent) iframeId.detachEvent("onload", eventHandler);
         else iframeId.removeEventListener("load", eventHandler, false);

         // Message from server...
         if (iframeId.contentDocument) {
             content = iframeId.contentDocument.body.innerHTML;
         } else if (iframeId.contentWindow) {
             content = iframeId.contentWindow.document.body.innerHTML;
         } else if (iframeId.document) {
             content = iframeId.document.body.innerHTML;
         }

         $rootScope.$apply(callback(content));
         // Del the iframe...
         setTimeout('iframeId.parentNode.removeChild(iframeId)', 250);
      }
      if (iframeId.addEventListener) iframeId.addEventListener("load", eventHandler, true);
      if (iframeId.attachEvent) iframeId.attachEvent("onload", eventHandler);

      setFormProperties(form);
      // Submit the form...
      form.submit();
    }
  }
})