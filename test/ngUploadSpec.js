// ngUpload as directive and input submit
describe('ngUpload', function() {
  var elm, scope;
  beforeEach(module('ngUpload'));
  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element(
      '<div>' +
        '<form action="/upload" ng-upload>' +
          '<input class="secret-input" id="secret" type="hidden" name="secret" ng-model="test.secret"></input>' +
          '<input class="title-input" id="title" type="text" name="title" ng-model="test.title"></input>' +
          '<input type="file" name="foo"></input>' +
          '<input class="submit-button" type="submit" value="submit" upload-submit="foo()"></input>' +
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
      var submit = elm[0].getElementsByClassName('submit-button')[0];
      submit.click();

      expect(angular.element(elm[0].getElementsByClassName('title-input')[0]).val()).toEqual( scope.test.title );
      expect(angular.element(elm[0].getElementsByClassName('secret-input')[0]).val()).toEqual('');
  });
  it('should set submit control', function() {
    var submit = elm[0].getElementsByClassName('submit-button')[0];
    expect(submit.getAttribute('upload-submit')).toBeDefined();
    submit.click();
    var iframe = elm[0].getElementsByTagName('iframe')[0];
    expect(iframe).toBeDefined();
 
    expect(submit.getAttribute('disabled')).toBe('disabled');
    expect(submit.getAttribute('title')).toBe('[DISABLED]: Uploading, please wait...' );
  });
  it('should not upload if the element is disabled', function() {
    var submit = elm[0].getElementsByClassName('submit-button')[0];
    submit.setAttribute('disabled','disabled');
    expect(submit.getAttribute('disabled')).toBeDefined();
    submit.click();
    var iframe = elm[0].getElementsByTagName('iframe');
    expect(iframe.length).toEqual(0);
  });

})