$( document ).ready( function() {

    console.log('js: before Superlists.Accounts.initialize( navigator )');

    var initialize = function ( navigator, user, token, urls ) {
        $( '#login' ).on( 'click', function () {
            navigator.id.request();
        });
        $( '#logout' ).on( 'click', function () {
            navigator.id.logout();
        });
        navigator.id.watch({
            loggedInUser: user,
            onlogin: function ( assertion ) {
                $.post(
                    urls.login,
                    { assertion: assertion, csrfmiddlewaretoken: token }
                );
            },
            onlogout:       function () {}
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
