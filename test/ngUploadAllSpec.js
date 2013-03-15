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
        frm1 = angular.element(
            '<div>' +
                '<form action="/upload" ng-upload></form>' +
            '</div>'
        );

        frm2 = angular.element(
            '<div>' +
                '<form action="/upload" class="ng-upload"></form>' +
            '</div>'
        );

        scope = $rootScope.$new();
        $controller(TestController, { $scope: scope });

        $compile(frm1)(scope);
        $compile(frm2)(scope);
        //scope.digest();
    }));

    it('should set form upload attributes when activated as <form ng-upload />.', function () {
        var form = frm1.find('form');
        expect(form).toBeDefined();
        expect(form.attr('enctype')).toBe('multipart/form-data');
        expect(form.attr('encoding')).toBe('multipart/form-data');
        expect(form.attr('method')).toBe('post');
        expect(form.attr('action')).toBe('/upload');
    });

    it('should set form upload attributes when activated as <form class="ng-upload" />.', function () {
        var form = frm2.find('form');
        expect(form).toBeDefined();
        expect(form.attr('enctype')).toBe('multipart/form-data');
        expect(form.attr('encoding')).toBe('multipart/form-data');
        expect(form.attr('method')).toBe('post');
        expect(form.attr('action')).toBe('/upload');
    });

    // Make sure uploadSubmit works with different ngUpload directive syntaxes
    describe('- uploadSubmit works when ngUpload\'s mark-up syntax is', function () {
        var compile, scope, div;

        beforeEach(inject(function ($rootScope, $controller, $compile) {
            compile = $compile;
            scope = $rootScope.$new();
            $controller(TestController, { $scope: scope });
        }));

        it('ng-upload.', function () {
            div = compile(
                angular.element(
                    '<div>' +
                        '<form action="/upload" ng-upload>' +
                            '<input type="file" name="foo"></input>' +
                            '<input type="submit" value="submit" upload-submit="bar()"></input>' +
                        '</form>' +
                    '</div>'
                )
            )(scope);

            var submit = div.find("input[type=submit]");
            submit.click();
            expect(scope.result).toBe("bar() was called");
        });

        it('ng_upload.', function () {
            div = compile(
                angular.element(
                    '<div>' +
                        '<form action="/upload" ng_upload>' +
                            '<input type="file" name="foo"></input>' +
                            '<input type="submit" value="submit" upload-submit="bar()"></input>' +
                        '</form>' +
                    '</div>'
                )
            )(scope);

            submit = div.find("input[type=submit]");
            submit.click();
            expect(scope.result).toBe("bar() was called");
        });

        it('x-ng-upload.', function () {
            div = compile(
                angular.element(
                    '<div>' +
                        '<form action="/upload" x-ng-upload>' +
                            '<input type="file" name="foo"></input>' +
                            '<input type="submit" value="submit" upload-submit="bar()"></input>' +
                        '</form>' +
                    '</div>'
                )
            )(scope);

            var submit = div.find("input[type=submit]");
            submit.click();
            expect(scope.result).toBe("bar() was called");
        });

        it('data-ng-upload.', function () {
            var div = compile(
                angular.element(
                    '<div>' +
                        '<form action="/upload" data-ng-upload>' +
                            '<input type="file" name="foo"></input>' +
                            '<input type="submit" value="submit" upload-submit="bar()"></input>' +
                        '</form>' +
                    '</div>'
                )
            )(scope);

            var submit = div.find("input[type=submit]");
            submit.click();
            expect(scope.result).toBe("bar() was called");
        });
    });

    describe(' - Compilation: ', function () {
        var input, inputB, compile;

        beforeEach(inject(function ($rootScope, $compile, $controller) {
            compile = $compile;
            scope = $rootScope.$new();
            $controller(TestController, { $scope: scope });
        }));

        it('Should throw an exception, when callback function is not set at all', function () {
            var shouldThrow = function () {
                compile(
                    angular.element(
                        '<div>' +
                            '<form action="/upload" ng-upload>' +
                                '<input type="file" name="foo"></input>' +
                                '<p>' +
                                    '<input type="submit" upload-submit value="Upload" />' +
                                '</p>' +
                            '</form>' +
                        '</div>'
                    )
                )(scope);
            }
            expect(shouldThrow).toThrow();
        });

        it('Should throw an exception, when callback function is set on uploadSubmit but not valid on scope', function () {
            var shouldThrow = function () {
                compile(
                    angular.element(
                        '<div>' +
                            '<form action="/upload" ng-upload>' +
                                '<input type="file" name="foo"></input>' +
                                '<p>' +
                                    '<input type="submit" upload-submit="nonExistingFunction()" value="Upload" />' +
                                '</p>' +
                            '</form>' +
                        '</div>'
                    )
                )(scope);
            }
            expect(shouldThrow).toThrow();
        });

        it('Shouldn\'t throw an exception when callback function is set on uploadSubmit and valid on scope', function () {
            var shouldNotThrow = function () {
                compile(
                    angular.element(
                        '<div>' +
                            '<form action="/upload" ng-upload>' +
                                '<input type="file" name="foo"></input>' +
                                '<p>' +
                                    '<input type="submit" upload-submit="bar2()" value="Upload" />' +
                                '</p>' +
                            '</form>' +
                        '</div>'
                    )
                )(scope);
            }
            expect(shouldNotThrow).not.toThrow();
        });

        it('Shouldn\'t throw an exception when callback function is set on ngUpload and valid on scope', function () {
            var mainDiv;
            var shouldNotThrow = function () {
                compile(
                    mainDiv = angular.element(
                        '<div>' +
                            '<form action="/upload" ng-upload="bar2()">' +
                                '<input type="file" name="foo"></input>' +
                                '<p>' +
                                    '<input type="submit" upload-submit value="Upload" />' +
                                '</p>' +
                            '</form>' +
                        '</div>'
                    )
                )(scope);
            }
            expect(shouldNotThrow).not.toThrow();
        });

        it('Should throw an exception when ngUpload is marked up as ng:Upload', function () {
            var mainDiv;
            var shouldThrow = function () {
                compile(
                    mainDiv = angular.element(
                        '<div>' +
                            '<form action="/upload" ng:upload>' +
                                '<input type="file" name="foo"></input>' +
                                '<input type="submit" value="submit" upload-submit="bar()"></input>' +
                            '</form>' +
                        '</div>'
                    )
                )(scope);
            }
            expect(shouldThrow).toThrow();
        });
    });

    // uploadSubmit tests using html 'div'
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
                '</div>');

            divB = angular.element(
                '<div>' +
                    '<form action="/upload" ng-upload>' +
                        '<input type="file" name="foo"></input>' +
                        '<div class="baz" upload-submit="bar2(iFrameText, status)">Upload</div>' +
                    '</form>' +
                '</div>');

            divC = angular.element(
               '<div>' +
                   '<form action="/upload" ng-upload>' +
                       '<input type="file" name="foo"></input>' +
                       '<div class="baz" upload-submit="bar2()">Upload</div>' +
                   '</form>' +
               '</div>');

            divD = angular.element(
               '<div>' +
                   '<form action="/upload" ng-upload>' +
                       '<input type="file" name="foo"></input>' +
                       '<div class="baz" upload-submit="bar2">Upload</div>' +
                   '</form>' +
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
            expect(scope.result).toBe('bar() was called');
        });

        it('should invoke scope.bar2(result, status) after submit. (Parameters renamed)', function () {
            var submit = divB.find('div.baz');
            submit.click();
            expect(scope.result).toBe('bar2() was called');
        });

        it('should invoke scope.bar2() after submit. (Parameters skipped)', function () {
            var submit = divC.find('div.baz');
            submit.click();
            expect(scope.result).toBe('bar2() was called');
        });

        it('should invoke scope.bar2 after submit. (Parameters and parenthesis skipped)', function () {
            var submit = divD.find('div.baz');
            submit.click();
            expect(scope.result).toBe('bar2() was called');
        });
    })

    // uploadSubmit tests using button (with the class construct)
    describe('- Using Button (Class Format): ', function () {

        var btnClassA, btnClassB, btnClassC, btnClassD;

        beforeEach(inject(function ($rootScope, $compile, $controller) {

            btnClassA = angular.element(
              '<div>' +
                '<form action="/upload" class="ng-upload">' +
                  '<input type="file" name="foo"></input>' +
                  '<button class="upload-submit: bar(content, completed)">Upload</button>' +
                '</form>' +
              '</div>');

            btnClassB = angular.element(
              '<div>' +
                '<form action="/upload" class="ng-upload">' +
                  '<input type="file" name="foo"></input>' +
                  '<button class="upload-submit: bar2(param1String, param2Boolean)">Upload</button>' +
                '</form>' +
              '</div>');

            btnClassC = angular.element(
              '<div>' +
                '<form action="/upload" class="ng-upload">' +
                  '<input type="file" name="foo"></input>' +
                  '<button class="upload-submit: bar2()">Upload</button>' +
                '</form>' +
              '</div>');

            btnClassD = angular.element(
              '<div>' +
                '<form action="/upload" class="ng-upload">' +
                  '<input type="file" name="foo"></input>' +
                  '<button class="upload-submit: bar2">Upload</button>' +
                '</form>' +
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
            expect(scope.result).toBe('bar() was called');
        });

        it('Should invoke scope.bar2(param1String, param2Boolean) after submit. (Parameters renamed)', function () {
            var submit = btnClassB.find('button');
            submit.click();
            expect(scope.result).toBe('bar2() was called');
        });

        it('Should invoke scope.bar2() after submit. (Parameters skipped)', function () {
            var submit = btnClassC.find('button');
            submit.click();
            expect(scope.result).toBe('bar2() was called');
        });

        it('Should invoke scope.bar2 after submit. (Parameters and parenthesis skipped)', function () {
            var submit = btnClassD.find('button');
            submit.click();
            expect(scope.result).toBe('bar2() was called');
        });
    })

    // uploadSubmit tests using html 'anchor'
    describe('- Using Anchor: ', function () {

        var anchorA, anchorB;

        beforeEach(inject(function ($rootScope, $compile, $controller) {
            anchorA = angular.element(
              '<div>' +
                '<form action="/upload" ng-upload>' +
                  '<input type="file" name="foo"></input>' +
                  '<a href="javascript: void(0);" class="baz" upload-submit="bar(content, completed)">Upload</a>' +
                '</form>' +
            '</div>');

            anchorB = angular.element(
            '<div>' +
              '<form action="/upload" ng-upload>' +
                '<input type="file" name="foo"></input>' +
                '<a href="javascript: void(0);" class="baz" upload-submit="bar2(anchor1, anchor2)">Upload</a>' +
              '</form>' +
            '</div>');

            anchorC = angular.element(
            '<div>' +
              '<form action="/upload" ng-upload>' +
                '<input type="file" name="foo"></input>' +
                '<a href="javascript: void(0);" class="baz" upload-submit="bar2()">Upload</a>' +
              '</form>' +
            '</div>');

            anchorD = angular.element(
            '<div>' +
              '<form action="/upload" ng-upload>' +
                '<input type="file" name="foo"></input>' +
                '<a href="javascript: void(0);" class="baz" upload-submit="bar2()">Upload</a>' +
              '</form>' +
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
            expect(scope.result).toBe('bar() was called');
        });

        it('Should invoke scope.bar2(result, status) after submit. (Parameters renamed)', function () {
            var submit = anchorB.find('a.baz');
            submit.click();
            expect(scope.result).toBe('bar2() was called');
        });

        it('Should invoke scope.bar2() after submit. (Parameters skipped)', function () {
            var submit = anchorB.find('a.baz');
            submit.click();
            expect(scope.result).toBe('bar2() was called');
        });

        it('Should invoke scope.bar2 after submit. (Parameters and parenthesis skipped)', function () {
            var submit = anchorB.find('a.baz');
            submit.click();
            expect(scope.result).toBe('bar2() was called');
        });
    })

    // uploadSubmit tests using html 'input[type=submit]'
    describe('- Using Input: ', function () {
        var inputA, inputB, inputC, inputD;

        beforeEach(inject(function ($rootScope, $compile, $controller) {
            inputA = angular.element(
              '<div>' +
                '<form action="/upload" ng-upload>' +
                  '<input type="file" name="foo"></input>' +
                  '<input type="submit" value="submit" upload-submit="bar(content, completed)"></input>' +
                '</form>' +
              '</div>');

            inputB = angular.element(
                '<div>' +
                  '<form action="/upload" ng-upload>' +
                    '<input type="file" name="foo"></input>' +
                    '<input type="submit" value="submit" upload-submit="bar2(inp1, inp2)"></input>' +
                  '</form>' +
                '</div>');

            inputC = angular.element(
                '<div>' +
                  '<form action="/upload" ng-upload>' +
                    '<input type="file" name="foo"></input>' +
                    '<input type="submit" value="submit" upload-submit="bar2()"></input>' +
                  '</form>' +
                '</div>');

            inputD = angular.element(
                '<div>' +
                  '<form action="/upload" ng-upload>' +
                    '<input type="file" name="foo"></input>' +
                    '<input type="submit" value="submit" upload-submit="bar2"></input>' +
                  '</form>' +
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
            expect(scope.result).toBe('bar() was called');
        });

        it('Should invoke scope.bar2(param1String, param2Boolean) after submit. (Parameters renamed)', function () {
            var submit = inputB.find('input[type=submit]');
            submit.click();
            expect(scope.result).toBe('bar2() was called');
        });

        it('Should invoke scope.bar2() after submit. (Parameters skipped)', function () {
            var submit = inputC.find('input[type=submit]');
            submit.click();
            expect(scope.result).toBe('bar2() was called');
        });

        it('Should invoke scope.bar2 after submit. (Parameters and parenthesis skipped)', function () {
            var submit = inputD.find('input[type=submit]');
            submit.click();
            expect(scope.result).toBe('bar2() was called');
        });
    });
})