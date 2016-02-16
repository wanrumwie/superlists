/*global $, test, equal, sinon, Superlists */

test( "initialize binds sign in button to navigator.id.request", function () {
    var requestWasCalled = false; //1
    var mockRequestFunction = function () { requestWasCalled = true; }; //2
    var mockNavigator = { //3
        id: {
            request: mockRequestFunction
        }
    };

    Superlists.Accounts.initialize( mockNavigator ); //4

    $( '#login' ).trigger( 'click' ); //5

    equal( requestWasCalled, true ); //6
});

