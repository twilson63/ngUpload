// ngUpload as class and button
describe('ngUpload', function() {
  var elm, scope;
  beforeEach(module('ngUpload'));
  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element(
      '<div>' +
        '<form action="/upload" ng-upload>' +
          '<input type="file" name="foo"></input>' +
          '<a href="javascript: void(0);" class="baz" upload-submit="bar()">Upload</a>' +
        '</form>' +
      '</div>');
    scope = $rootScope;
    $compile(elm)(scope);
    //scope.digest();
  }));
  it('should set form upload attributes', function() {
    var form = elm.find('form');
    expect(form).toBeDefined();
    expect(form.attr('enctype')).toBe('multipart/form-data');
    expect(form.attr('encoding')).toBe('multipart/form-data');
    expect(form.attr('target')).toBe('upload_iframe');
    expect(form.attr('method')).toBe('post');
    

  });
  it('should set submit control', function() {
    var submit = elm[0].getElementsByClassName('baz')[0];
    submit.click();
    var iframe = elm[0].getElementsByTagName('iframe')[0];
    expect(iframe).toBeDefined();
    expect(submit.getAttribute('disabled')).toBe('disabled');
    expect(submit.getAttribute('title')).toBe('[DISABLED]: Uploading, please wait...');
  });
})