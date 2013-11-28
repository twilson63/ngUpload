// ngUpload as directive and input submit
describe('ngUpload', function() {
    var elm, scope;
    beforeEach(module('ngUpload'));
    beforeEach(inject(function($rootScope, $compile) {
        elm = angular.element(
            '<div>' +
                '<form action="/upload" ng-upload="foo()" upload-option-before-submit="before_submit()">' +
                '<input type="file" name="foo"></input>' +
                '<input type="submit" value="submit"></input>' +
                '</form>' +
                '</div>');
        scope = $rootScope;
        $compile(elm)(scope);

    }));

    it('should run before_submit callback', function() {
        scope.before_submit = function($scope) {
            $scope.before_submit_called = true;
        }

        var form = elm.find('form');
        expect(form).toBeDefined();

        var submit = elm.find('input[type="submit"]');
        submit.click();

        var iframe = elm.find('#upload_iframe');
        expect(iframe[0]).toBeDefined();

        expect(scope.before_submit_called).toBe(true)
    });

    it('should run before_submit callback and stop submit', function() {
        scope.before_submit = function($scope) {
            $scope.before_submit_called = true;
            return false;
        }

        var form = elm.find('form');
        expect(form).toBeDefined();

        var submit = elm.find('input[type="submit"]');
        submit.click();

        var iframe = elm.find('#upload_iframe');
        expect(iframe[0]).not.toBeDefined();

        expect(scope.before_submit_called).toBe(true)
    });
});