// ngUpload as class and button
describe('ngUpload', function() {
  var elm, scope;
  beforeEach(module('ngUpload'));
  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element(
      '<div>' +
        '<form action="/upload" ng-upload>' +
          '<input type="file" name="foo"></input>' +
          '<div class="baz" upload-submit="bar()">Upload</div>' +
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
    var submit = elm.find('div.baz');
    submit.click();
    var iframe = elm.find('#upload_iframe');
    expect(iframe).toBeDefined();
    expect(submit.attr('disabled')).toBe('disabled');
    expect(submit.attr('title')).toBe('[DISABLED]: Uploading, please wait...');
  });
})