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
    equal( requestWasCalled, false, 'check request must be not called before click' );
    $( '#login' ).trigger( 'click' );
    equal( requestWasCalled, true, 'check request must be called after click' );

});

test( "initialize calls navigator.id.watch", function () {
    var user = 'current user';
    var token = 'csrf token';
    var urls = { login: 'login url', logout: 'logout url' };
    var mockNavigator = {
        id: {
            watch: sinon.mock() //1
        }
    };

    Superlists.Accounts.initialize( mockNavigator, user, token, urls );

    equal( mockNavigator.id.watch.calledOnce, true, 'check watch function must be called' );
});

test( "watch sees current user", function () {
    var user = 'current user';
    var token = 'csrf token';
    var urls = { login: 'login url', logout: 'logout url' };
    var mockNavigator = {
        id: {
            watch: sinon.mock()
        }
    };

    Superlists.Accounts.initialize( mockNavigator, user, token, urls );
    var watchCallArgs = mockNavigator.id.watch.firstCall.args[0];
    equal( watchCallArgs.loggedInUser, user, 'check user' );
});
