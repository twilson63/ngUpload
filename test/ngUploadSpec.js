// TODO
describe('ngUpload', function() {
  var elm, scope;
  beforeEach(module('ngUpload'));
  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element(
      '<div>' +
        '<form ng-upload="foo()">' +
          '<input type="file" name="foo"></input>' +
          '<input class="upload_submit" type="submit" value="submit"></input>' +
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
  });
  it('should find submitcontrol', function() {
    var submitControl = elm.find('form .upload_submit');
    expect(submitControl).toBeDefined();
  });
})