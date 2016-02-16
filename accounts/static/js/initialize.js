$( document ).ready( function() {

    console.log('js: before Superlists.Accounts.initialize( navigator )');
    console.log( window )

    var initialize = function ( navigator ) {
        navigator.id.request();
        console.log('initialize:', navigator );
    };

    window.Superlists = {
        Accounts: {
            initialize: initialize
        }
    };

//    Superlists.Accounts.initialize( navigator );

    console.log('js: navigator=', navigator);
    console.log('js: Superlists=', Superlists);
    console.log('js: Superlists.Accounts=', Superlists.Accounts);
    console.log('js: Superlists.Accounts.initialize=', Superlists.Accounts.initialize);

});
