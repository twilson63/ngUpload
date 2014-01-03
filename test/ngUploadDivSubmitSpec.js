// ngUpload as class and button
describe('ngUpload', function() {
  var elm, scope;
  beforeEach(module('ngUpload'));
  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element(
      '<div>' +
        '<form action="/upload" ng-upload="bar()">' +
          '<input type="file" name="foo"></input>' +
          '<p>' +
          '<div class="baz" upload-submit>Upload</div>' +
          '</p>' +
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
    expect(form.attr('target')).toBe('upload-iframe-2');
    expect(form.attr('method')).toBe('post');


  });

  it('should set submit control', function() {
    var submit = elm[0].getElementsByClassName('baz')[0];
    submit.click();
    var iframe = elm[0].getElementsByTagName('iframe')[0];
    expect(iframe).toBeDefined();
  });

  it('should send submit event to the form', function() {
    var submit = elm[0].getElementsByClassName('baz')[0];
    var form = elm.find('form');
    var spy = jasmine.createSpy('submitSpy');
    form.bind('submit', spy);
    submit.click();
    expect(spy).toHaveBeenCalled();
  });
});
