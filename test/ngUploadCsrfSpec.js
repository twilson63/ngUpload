// ngUpload as directive and input submit
describe('ngUpload', function() {
  var scope, $compile, $http, $browser;
  beforeEach(module('ngUpload'));
  beforeEach(inject(function($rootScope, _$compile_, _$browser_, _$http_) {
    $browser = _$browser_;
    $browser.cookies('X-XSRF-TOKEN', 'the-token');
    scope = $rootScope;
    $compile = _$compile_;
    $http = _$http_;
  }));

  function submit(element) {
    element[0].getElementsByClassName('submit-button')[0].click();
  }

  function compile(template) {
    var elm = angular.element(template);
    $compile(elm)(scope);
    return elm;
  }

  function getHiddenField(element) {
    return element[0].getElementsByClassName('upload-csrf-token')[0];
  }

  it('should set csrf hidden field with csrf token from cookie', function() {
    var form = compile(
        '<div>' +
        '<form action="/upload" ng-upload="foo()" upload-options-enable-csrf>' +
        '<input type="file" name="foo"></input>' +
        '<input class="submit-button" type="submit" value="submit"></input>' +
        '</form>' +
        '</div>');
    submit(form);

    var hiddenField = getHiddenField(form);
    expect(hiddenField).toBeDefined();
    expect(hiddenField.getAttribute('value')).toBe('the-token');
    expect(hiddenField.getAttribute('name')).toBe('CSRFToken');
  });

  it('should get csrf param name from a specific attribute', function()  {
    var form = compile(
        '<div>' +
        '<form action="/upload" ng-upload="foo()" upload-options-enable-csrf upload-options-csrf-param="csrf-token-parameter">' +
        '<input type="file" name="foo"></input>' +
        '<input class="submit-button" type="submit" value="submit"></input>' +
        '</form>' +
        '</div>');
    submit(form);

    expect(getHiddenField(form).getAttribute('name')).toBe('csrf-token-parameter');
  });

  it('should get csrf token from cookies according to configured xsrfCookieName', function()  {
    $http.defaults.xsrfCookieName = 'another.cookie.name';
    $browser.cookies('another.cookie.name', 'another-token');
    var form = compile(
        '<div>' +
        '<form action="/upload" ng-upload="foo()" upload-options-enable-csrf upload-options-csrf-param="csrf-token-parameter">' +
        '<input type="file" name="foo"></input>' +
        '<input class="submit-button" type="submit" value="submit"></input>' +
        '</form>' +
        '</div>');
    submit(form);

    expect(getHiddenField(form).getAttribute('value')).toBe('another-token');
  });

});