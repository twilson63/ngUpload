// ngUpload as directive and input submit
describe('ngUpload', function() {
    var elm, scope;
    beforeEach(module('ngUpload'));
    beforeEach(inject(function($rootScope, $compile) {
        elm = angular.element(
            '<div>' +
                '<form action="/upload" ng-upload>' +
                '<input id="secret-field" type="hidden" name="secret_field" ng-model="secret"></input>' +
                '<input type="file" name="foo"></input>' +
                '<input type="submit" value="submit" upload-submit="foo()" upload-options-convert-hidden></input>' +
                '</form>' +
                '</div>');
        scope = $rootScope;
        scope.secret = "test123";
        $compile(elm)(scope);
        //scope.digest();

    }));
    it('should set value of hidden field', function() {
        var form = elm.find('form');
        expect(form).toBeDefined();

        var submit = elm.find('input[type="submit"]');
        submit.click();

        var iframe = elm.find('#upload_iframe');
        expect(iframe[0]).toBeDefined();

        expect(elm.find('#secret-field').val()).toEqual("test123");

    });
})