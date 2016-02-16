$( document ).ready( function() {

    console.log('js: urls=', urls);

    var loginLink = document.getElementById( 'login' );
    if ( loginLink ) {
      loginLink.onclick = function() { navigator.id.request(); };
    }

    var logoutLink = document.getElementById( 'logout' );
    if ( logoutLink ) {
      logoutLink.onclick = function() { navigator.id.logout(); };
    }

    var currentUser = $( "#user_email" ).val() || null;
    var csrf_token = $( "#csrfmiddlewaretoken" ).val();
    console.log('js: currentUser=', currentUser);
    console.log('js: csrf_token=', csrf_token);

    navigator.id.watch({
        loggedInUser: currentUser,
        onlogin: function( assertion ) {
            $.post( '/accounts/login', {
                assertion: assertion, 
                csrfmiddlewaretoken: csrf_token 
            }).done( function() { window.location.reload(); }).fail( function() { navigator.id.logout(); });
        },
        onlogout: function() {
            $.post( '/accounts/logout', { 
                csrfmiddlewaretoken: csrf_token 
            }).always( function() { window.location.reload(); });
        }
    });

    Superlists.Accounts.initialize( navigator );

});

