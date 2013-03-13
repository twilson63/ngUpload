// Sample controler for testing the ngUpload directive
var TestController = function ($scope) {
    $scope.bar = function (content, completed) {
        $scope.result = "bar() was called";
    };

    $scope.bar2 = function (result, status) {
        $scope.result = "bar2() was called";
    }

    $scope.foo = function (result, status) {
        $scope.result = "foo() was called";
    }
};

// ngUpload tests
describe('ngUpload', function () {
    var scope;

    beforeEach(module('ngUpload'));

    beforeEach(inject(function ($rootScope, $compile, $controller) {
        frm = angular.element(
            '<div>' +
            '<form action="/upload" ng-upload></form>' +
            '</div>'
        );

        scope = $rootScope.$new();
        $controller(TestController, { $scope: scope });

        $compile(frm)(scope);
        //scope.digest();
    }));

    it('should set form upload attributes', function () {
        var form = frm.find('form');
        expect(form).toBeDefined();
        expect(form.attr('enctype')).toBe('multipart/form-data');
        expect(form.attr('encoding')).toBe('multipart/form-data');
        expect(form.attr('target')).toBe('upload_iframe');
        expect(form.attr('method')).toBe('post');
    });

    // ngSubmit tests using html 'div'
    describe('- Using Div: ', function () {

        var divA, divB, divC, divD;

        beforeEach(inject(function ($rootScope, $compile, $controller) {
            divA = angular.element(
                '<div>' +
                '<form action="/upload" ng-upload>' +
                    '<input type="file" name="foo"></input>' +
                    '<p>' +
                    '<div class="baz" upload-submit="bar(content, completed)">Upload</div>' +
                    '</p>' +
                '</form>' +
                '<span class="result">{{result}}</span>' +
                '</div>');

            divB = angular.element(
                '<div>' +
                    '<form action="/upload" ng-upload>' +
                        '<input type="file" name="foo"></input>' +
                        '<div class="baz" upload-submit="bar2(iFrameText, status)">Upload</div>' +
                    '</form>' +
                    '<span class="result">{{result}}</span>' +
                '</div>');

            divC = angular.element(
               '<div>' +
                   '<form action="/upload" ng-upload>' +
                       '<input type="file" name="foo"></input>' +
                       '<div class="baz" upload-submit="bar2()">Upload</div>' +
                   '</form>' +
                   '<span class="result">{{result}}</span>' +
               '</div>');

            divD = angular.element(
               '<div>' +
                   '<form action="/upload" ng-upload>' +
                       '<input type="file" name="foo"></input>' +
                       '<div class="baz" upload-submit="bar2">Upload</div>' +
                   '</form>' +
                   '<span class="result">{{result}}</span>' +
               '</div>');

            scope = $rootScope.$new();
            $controller(TestController, { $scope: scope });

            $compile(divA)(scope);
            $compile(divB)(scope);
            $compile(divC)(scope);
            $compile(divD)(scope);
        }));

        it('Should set submit control', function () {
            var submit = divA.find('div.baz');
            submit.click();
            var iframe = divA.find('#upload_iframe');
            expect(iframe).toBeDefined();
            expect(submit.attr('disabled')).toBe('disabled');
            expect(submit.attr('title')).toBe('[DISABLED]: Uploading, please wait...');
        });

        it('Should invoke scope.bar(content, completed) after submit (Parameters not renamed)', function () {
            var submit = divA.find('div.baz');
            submit.click();
            var result = divA.find('.result');
            expect(result).toBeDefined();
            expect(result.text()).toBe('bar() was called');
        });

        it('should invoke scope.bar2(result, status) after submit. (Parameters renamed)', function () {
            var submit = divB.find('div.baz');
            submit.click();
            var result = divB.find('.result');
            expect(result).toBeDefined();
            expect(result.text()).toBe('bar2() was called');
        });

        it('should invoke scope.bar2() after submit. (Parameters skipped)', function () {
            var submit = divC.find('div.baz');
            submit.click();
            var result = divC.find('.result');
            expect(result).toBeDefined();
            expect(result.text()).toBe('bar2() was called');
        });

        it('should invoke scope.bar2 after submit. (Parameters and parenthesis skipped)', function () {
            var submit = divD.find('div.baz');
            submit.click();
            var result = divD.find('.result');
            expect(result).toBeDefined();
            expect(result.text()).toBe('bar2() was called');
        });
    })

    // ngSubmit tests using button (with the class construct)
    describe('- Using Button (Class Format): ', function () {

        var btnClassA, btnClassB, btnClassC, btnClassD;

        beforeEach(inject(function ($rootScope, $compile, $controller) {

            btnClassA = angular.element(
              '<div>' +
                '<form action="/upload" class="ng-upload">' +
                  '<input type="file" name="foo"></input>' +
                  '<button class="upload-submit: bar(content, completed)">Upload</button>' +
                '</form>' +
                '<span class="result">{{result}}</span>' +
              '</div>');

            btnClassB = angular.element(
              '<div>' +
                '<form action="/upload" class="ng-upload">' +
                  '<input type="file" name="foo"></input>' +
                  '<button class="upload-submit: bar2(param1String, param2Boolean)">Upload</button>' +
                '</form>' +
                '<span class="result">{{result}}</span>' +
              '</div>');

            btnClassC = angular.element(
              '<div>' +
                '<form action="/upload" class="ng-upload">' +
                  '<input type="file" name="foo"></input>' +
                  '<button class="upload-submit: bar2()">Upload</button>' +
                '</form>' +
                '<span class="result">{{result}}</span>' +
              '</div>');

            btnClassD = angular.element(
              '<div>' +
                '<form action="/upload" class="ng-upload">' +
                  '<input type="file" name="foo"></input>' +
                  '<button class="upload-submit: bar2">Upload</button>' +
                '</form>' +
                '<span class="result">{{result}}</span>' +
              '</div>');

            scope = $rootScope.$new();
            $controller(TestController, { $scope: scope });

            $compile(btnClassA)(scope);
            $compile(btnClassB)(scope);
            $compile(btnClassC)(scope);
            $compile(btnClassD)(scope);
        }));

        it('Should set submit control', function () {
            var submit = btnClassA.find('button');
            submit.click();
            var iframe = btnClassA.find('#upload_iframe');
            expect(iframe).toBeDefined();
            expect(submit.attr('disabled')).toBe('disabled');
            expect(submit.attr('title')).toBe('[DISABLED]: Uploading, please wait...');
        });

        it('Should invoke scope.bar(content, completed) after submit (Parameters not renamed)', function () {
            var submit = btnClassA.find('button');
            submit.click();
            var result = btnClassA.find('.result');
            expect(result).toBeDefined();
            expect(result.text()).toBe('bar() was called');
        });

        it('Should invoke scope.bar2(param1String, param2Boolean) after submit. (Parameters renamed)', function () {
            var submit = btnClassB.find('button');
            submit.click();
            var result = btnClassB.find('.result');
            expect(result).toBeDefined();
            expect(result.text()).toBe('bar2() was called');
        });

        it('Should invoke scope.bar2() after submit. (Parameters skipped)', function () {
            var submit = btnClassC.find('button');
            submit.click();
            var result = btnClassC.find('.result');
            expect(result).toBeDefined();
            expect(result.text()).toBe('bar2() was called');
        });

        it('Should invoke scope.bar2 after submit. (Parameters and parenthesis skipped)', function () {
            var submit = btnClassD.find('button');
            submit.click();
            var result = btnClassD.find('.result');
            expect(result).toBeDefined();
            expect(result.text()).toBe('bar2() was called');
        });
    })

    // ngSubmit tests using html 'anchor'
    describe('- Using Anchor: ', function () {

        var anchorA, anchorB;

        beforeEach(inject(function ($rootScope, $compile, $controller) {
            anchorA = angular.element(
              '<div>' +
                '<form action="/upload" ng-upload>' +
                  '<input type="file" name="foo"></input>' +
                  '<a href="javascript: void(0);" class="baz" upload-submit="bar(content, completed)">Upload</a>' +
                '</form>' +
                '<span class="result">{{result}}</span>' +
              '</div>');

            anchorB = angular.element(
            '<div>' +
              '<form action="/upload" ng-upload>' +
                '<input type="file" name="foo"></input>' +
                '<a href="javascript: void(0);" class="baz" upload-submit="bar2(anchor1, anchor2)">Upload</a>' +
              '</form>' +
              '<span class="result">{{result}}</span>' +
            '</div>');

            anchorC = angular.element(
            '<div>' +
              '<form action="/upload" ng-upload>' +
                '<input type="file" name="foo"></input>' +
                '<a href="javascript: void(0);" class="baz" upload-submit="bar2()">Upload</a>' +
              '</form>' +
              '<span class="result">{{result}}</span>' +
            '</div>');

            anchorD = angular.element(
            '<div>' +
              '<form action="/upload" ng-upload>' +
                '<input type="file" name="foo"></input>' +
                '<a href="javascript: void(0);" class="baz" upload-submit="bar2()">Upload</a>' +
              '</form>' +
              '<span class="result">{{result}}</span>' +
            '</div>');

            scope = $rootScope.$new();
            $controller(TestController, { $scope: scope });

            $compile(anchorA)(scope);
            $compile(anchorB)(scope);
        }));

        it('Should set submit control', function () {
            var submit = anchorA.find('a.baz');
            submit.click();
            var iframe = anchorB.find('#upload_iframe');
            expect(iframe).toBeDefined();
            expect(submit.attr('disabled')).toBe('disabled');
            expect(submit.attr('title')).toBe('[DISABLED]: Uploading, please wait...');
        });

        it('Should invoke scope.bar(content, completed) after submit (Parameters not renamed)', function () {
            var submit = anchorA.find('a.baz');
            submit.click();
            var result = anchorA.find('.result');
            expect(result).toBeDefined();
            expect(result.text()).toBe('bar() was called');
        });

        it('Should invoke scope.bar2(result, status) after submit. (Parameters renamed)', function () {
            var submit = anchorB.find('a.baz');
            submit.click();
            var result = anchorB.find('.result');
            expect(result).toBeDefined();
            expect(result.text()).toBe('bar2() was called');
        });

        it('Should invoke scope.bar2() after submit. (Parameters skipped)', function () {
            var submit = anchorB.find('a.baz');
            submit.click();
            var result = anchorB.find('.result');
            expect(result).toBeDefined();
            expect(result.text()).toBe('bar2() was called');
        });

        it('Should invoke scope.bar2 after submit. (Parameters and parenthesis skipped)', function () {
            var submit = anchorB.find('a.baz');
            submit.click();
            var result = anchorB.find('.result');
            expect(result).toBeDefined();
            expect(result.text()).toBe('bar2() was called');
        });
    })

    // ngSubmit tests using html 'input[type=submit]'
    describe('- Using Input: ', function () {
        var inputA, inputB, inputC, inputD;

        beforeEach(inject(function ($rootScope, $compile, $controller) {
            inputA = angular.element(
              '<div>' +
                '<form action="/upload" ng-upload>' +
                  '<input type="file" name="foo"></input>' +
                  '<input type="submit" value="submit" upload-submit="bar(content, completed)"></input>' +
                '</form>' +
                '<span class="result">{{result}}</span>' +
              '</div>');

            inputB = angular.element(
                '<div>' +
                  '<form action="/upload" ng-upload>' +
                    '<input type="file" name="foo"></input>' +
                    '<input type="submit" value="submit" upload-submit="bar2(inp1, inp2)"></input>' +
                  '</form>' +
                  '<span class="result">{{result}}</span>' +
                '</div>');

            inputC = angular.element(
                '<div>' +
                  '<form action="/upload" ng-upload>' +
                    '<input type="file" name="foo"></input>' +
                    '<input type="submit" value="submit" upload-submit="bar2()"></input>' +
                  '</form>' +
                  '<span class="result">{{result}}</span>' +
                '</div>');

            inputD = angular.element(
                '<div>' +
                  '<form action="/upload" ng-upload>' +
                    '<input type="file" name="foo"></input>' +
                    '<input type="submit" value="submit" upload-submit="bar2"></input>' +
                  '</form>' +
                  '<span class="result">{{result}}</span>' +
                '</div>');

            scope = $rootScope.$new();
            $controller(TestController, { $scope: scope });

            $compile(inputA)(scope);
            $compile(inputB)(scope);
            $compile(inputC)(scope);
            $compile(inputD)(scope);
        }));

        it('Should set submit control', function () {
            var submit = inputA.find('input[type=submit]');
            submit.click();
            var iframe = inputA.find('#upload_iframe');
            expect(iframe).toBeDefined();
            expect(submit.attr('disabled')).toBe('disabled');
            expect(submit.attr('title')).toBe('[DISABLED]: Uploading, please wait...');
        });

        it('Should invoke scope.bar(content, completed) after submit (Parameters not renamed)', function () {
            var submit = inputA.find('input[type=submit]');
            submit.click();
            var result = inputA.find('.result');
            expect(result).toBeDefined();
            expect(result.text()).toBe('bar() was called');
        });

        it('Should invoke scope.bar2(param1String, param2Boolean) after submit. (Parameters renamed)', function () {
            var submit = inputB.find('input[type=submit]');
            submit.click();
            var result = inputB.find('.result');
            expect(result).toBeDefined();
            expect(result.text()).toBe('bar2() was called');
        });

        it('Should invoke scope.bar2() after submit. (Parameters skipped)', function () {
            var submit = inputC.find('input[type=submit]');
            submit.click();
            var result = inputC.find('.result');
            expect(result).toBeDefined();
            expect(result.text()).toBe('bar2() was called');
        });

        it('Should invoke scope.bar2 after submit. (Parameters and parenthesis skipped)', function () {
            var submit = inputD.find('input[type=submit]');
            submit.click();
            var result = inputD.find('.result');
            expect(result).toBeDefined();
            expect(result.text()).toBe('bar2() was called');
        });
    });
})