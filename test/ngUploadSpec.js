// ngUpload as directive and input submit
describe('ngUpload', function() {
  var elm, scope;
  beforeEach(module('ngUpload'));
  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element(
      '<div>' +
        '<form action="/upload" ng-upload>' +
          '<input id="secret" type="hidden" name="secret" ng-model="test.secret"></input>' +
          '<input id="title" type="text" name="title" ng-model="test.title"></input>' +
          '<input type="file" name="foo"></input>' +
          '<input type="submit" value="submit" upload-submit="foo()"></input>' +
        '</form>' +
      '</div>');
    scope = $rootScope;
    scope.test = {title: 'test123', secret: 'secret123' };

    // the ng-model of #test-input
    scope.hamster="is el primo";

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
  it('should set value from ng-model attribute for non-hidden fields', function() {
      var submit = elm.find('input[type="submit"]');
      expect(submit.attr('upload-submit')).toBeDefined();
      submit.click();
      var iframe = elm.find('#upload_iframe');

      expect(elm.find('#title').val()).toEqual( scope.test.title );
      expect(elm.find('#secret').val()).toEqual('');
  });
  it('should set submit control', function() {
    var submit = elm.find('input[type="submit"]');
    expect(submit.attr('upload-submit')).toBeDefined();
    submit.click();
    var iframe = elm.find('#upload_iframe');
    expect(iframe[0]).toBeDefined();    
    expect(submit.attr('disabled')).toBe('disabled');
    expect(submit.attr('title')).toBe('[DISABLED]: Uploading, please wait...' );
  });
  it('should not upload if the element is disabled', function() {
    var submit = elm.find('input[type="submit"]');
    submit.attr('disabled','disabled');      
    expect(submit.attr('disabled')).toBeDefined();
    submit.click();
    var iframe = elm.find('#upload_iframe');    
    expect(iframe.length).toEqual(0);
  });

})