$( document ).ready( function() {

    console.log('js: before Superlists.Accounts.initialize( navigator )');

    var initialize = function ( navigator, user, token, urls ) {
        $( '#login' ).on( 'click', function () {
            navigator.id.request();
        });
        navigator.id.watch({
            loggedInUser: user
        });

        console.log( 'initialize:', navigator );
    };

    window.Superlists = {
        Accounts: {
            initialize: initialize
        }
    };

//    Superlists.Accounts.initialize( navigator );

});
