// Global:  $ (?), document (?), window (?)
// navigator object should be load from "https://login.persona.org/include.js" by <script> in template

$( document ).ready( function() {

    var initialize = function ( navigator, user, token, urls ) {
        $( '#login' ).on( 'click', function () {
            navigator.id.request();
        });
        $( '#logout' ).on( 'click', function () {
            navigator.id.logout();
        });
        navigator.id.watch({
            loggedInUser: user,
            onlogin: function( assertion ) {
                var $post = $.post( urls.login, { assertion: assertion, csrfmiddlewaretoken: token });
                $post.done( function() { window.location.reload(); });
                $post.fail( function() { navigator.id.logout(); });
            },
            onlogout: function() {
                var $post = $.post( urls.logout, { csrfmiddlewaretoken: token });
                $post.always( function() { window.location.reload(); });
            }
        });
    };

    window.Superlists = {
        Accounts: {
            initialize: initialize
        }
    };

});
