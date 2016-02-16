/*global $, test, equal, sinon, Superlists */

test( "initialize binds sign in button to navigator.id.request", function () {
    var requestWasCalled = false; //1
    var mockRequestFunction = function () { requestWasCalled = true; }; //2
    var mockNavigator = { //3
        id: {
            request: mockRequestFunction,
            watch: function () {}
        }
    };
    Superlists.Accounts.initialize( mockNavigator ); //4
    equal( requestWasCalled, false, 'check request should be not called before click' );
    $( '#login' ).trigger( 'click' );
    equal( requestWasCalled, true, 'check request should be called after click' );

});

var user, token, urls, mockNavigator, requests, xhr; //1
module( "navigator.id.watch tests", {
    setup: function () {
        user = 'current user'; //2
        token = 'csrf token';
        urls = { login: 'login url', logout: 'logout url' };
        mockNavigator = {
            id: {
                watch: sinon.mock()
            }
        };
        xhr = sinon.useFakeXMLHttpRequest(); //3
        requests = []; //4
        xhr.onCreate = function ( request ) { requests.push( request ); }; //5
    },
    teardown: function () {
        mockNavigator.id.watch.reset(); //6
        xhr.restore(); //7
    }
});


test( "initialize calls navigator.id.watch", function () {
    Superlists.Accounts.initialize( mockNavigator, user, token, urls );
    equal( mockNavigator.id.watch.calledOnce, true, 'check watch function should be called' );
});

test( "watch sees current user", function () {
    Superlists.Accounts.initialize( mockNavigator, user, token, urls );
    var watchCallArgs = mockNavigator.id.watch.firstCall.args[0];
    equal( watchCallArgs.loggedInUser, user, 'check user' );
});

test( "onlogin does ajax post to login url", function () {
    Superlists.Accounts.initialize( mockNavigator, user, token, urls );
    var onloginCallback = mockNavigator.id.watch.firstCall.args[0].onlogin; //1
    onloginCallback(); //2
    equal( requests.length, 1, 'must be one ajax request' ); //3
    equal( requests[0].method, 'POST', 'request method should be a POST' );
    equal( requests[0].url, urls.login, 'check url' );
});

test( "onlogin sends assertion with csrf token", function () {
    Superlists.Accounts.initialize( mockNavigator, user, token, urls );
    var onloginCallback = mockNavigator.id.watch.firstCall.args[0].onlogin;
    var assertion = 'browser-id assertion';
    onloginCallback( assertion );
    equal(
        requests[0].requestBody,
        $.param( { assertion: assertion, csrfmiddlewaretoken: token } ),
        'check POST data' );
});

test( "onlogout is just a placeholder", function () {
    Superlists.Accounts.initialize( mockNavigator, user, token, urls );
    var onlogoutCallback = mockNavigator.id.watch.firstCall.args[0].onlogout;
    equal( typeof onlogoutCallback, "function", "onlogout should be a function" );
});

