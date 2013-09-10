// ngUpload as directive and input submit
describe('ngUpload', function() {
    var elm, scope;
    beforeEach(module('ngUpload'));
    beforeEach(inject(function($rootScope, $compile) {
        elm = angular.element(
            '<div>' +
                '<form action="/upload" ng-upload>' +
                '<input class="secret-field" type="hidden" name="secret_field" ng-model="secret"></input>' +
                '<input type="file" name="foo"></input>' +
                '<input class="submit-button" type="submit" value="submit" upload-submit="foo()" upload-options-convert-hidden></input>' +
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

        var submit = elm[0].getElementsByClassName('submit-button')[0];
        submit.click();

        var iframe = elm[0].getElementsByTagName('iframe')[0];
        expect(iframe).toBeDefined();

        expect(elm[0].getElementsByClassName('secret-field')[0].value).toEqual("test123");
    });
});