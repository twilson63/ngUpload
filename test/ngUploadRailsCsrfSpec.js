// ngUpload as directive and input submit
describe('ngUpload', function() {
  var elm, scope;
  beforeEach(module('ngUpload'));
  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element(
      '<div>' +
        '<form action="/upload" ng-upload upload-options-enable-rails-csrf>' +
          '<input type="file" name="foo"></input>' +
          '<input class="submit-button" type="submit" value="submit" upload-submit="foo()"></input>' +
        '</form>' +
      '</div>');
    scope = $rootScope;
    $compile(elm)(scope);
    //scope.digest();
    
  }));
  it('should set csrf hidden field', function() {
    var form = elm.find('form');
    expect(form).toBeDefined();

    var submit = elm[0].getElementsByClassName('submit-button')[0];
    submit.click();

    var iframe = elm[0].getElementsByTagName('iframe')[0];
    expect(iframe).toBeDefined();

    expect(elm[0].getElementsByClassName('upload-csrf-token')[0]).toBeDefined();
    
    //expect(elm.find('#upload-csrf-token').val()).toBe('test_token');

  });
})