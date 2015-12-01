// ngUpload as directive and input submit
describe('ngUpload', function() {
    var elm, scope;
    beforeEach(module('ngUpload'));
    beforeEach(inject(function($rootScope, $compile) {
        elm = angular.element(
            '<div>' +
            '<input type="text" name="bar" id="bar" ng-model="baz"></input>' +
            '<form action="/upload" ng-upload="foo()" upload-options-before-submit="before_submit()">' +
            '<input type="file" name="foo"></input>' +
            '<input type="submit" value="submit"></input>' +
            '</form>' +
            '</div>');
        scope = $rootScope;
        $compile(elm)(scope);
    }));

    it('should run before_submit callback', inject(function($compile) {
        scope.before_submit = jasmine.createSpy('beforeSubmit');

        var form = elm.find('form');
        expect(form).toBeDefined();

        var iframe = elm[0].getElementsByTagName('iframe')[0];
        expect(iframe).toBeDefined();

        form.submit();

        expect(scope.before_submit).toHaveBeenCalled();
    }));

    it('should run before_submit callback and stop submit', function() {
        scope.before_submit = function() {
            scope.before_submit_called = true;
            return false;
        };

        var form = elm.find('form');
        expect(form).toBeDefined();

        form.submit();

        var iframe = elm.find('#upload_iframe');
        expect(iframe[0]).not.toBeDefined();

        expect(scope.before_submit_called).toBe(true);
    });

    it('should run a digest cycle when form submit is stopped', function() {
        scope.before_submit = function() {
            scope.baz = 'qux';
            return false;
        };

        var text = elm.find('input')[0];
        expect(text.value).toBe('');

        var form = elm.find('form');
        expect(form).toBeDefined();

        form.submit();

        expect(text.value).toBe('qux');
    });
});
