    $(document).ready(function() {

        window.Superlists = {
            Accounts: {
                initialize: function () {}
            }
        };
        Superlists.Accounts.initialize(navigator)

    });


$(document).ready(function() {

var loginLink = document.getElementById('login');
if (loginLink) {
  loginLink.onclick = function() { navigator.id.request(); };
}

var logoutLink = document.getElementById('logout');
if (logoutLink) {
  logoutLink.onclick = function() { navigator.id.logout(); };
}

var currentUser = $( "#user_email" ).val() || null;
var csrf_token = $( "#csrfmiddlewaretoken" ).val();
console.log('currentUser=', currentUser);
console.log('csrf_token=', csrf_token);

navigator.id.watch({
  loggedInUser: currentUser,
  onlogin: function(assertion) {
    $.post('/accounts/login', {assertion: assertion, csrfmiddlewaretoken: csrf_token})
    .done(function() { window.location.reload(); })
    .fail(function() { navigator.id.logout();});
  },
  onlogout: function() {
    $.post('/accounts/logout')
    .always(function() { window.location.reload(); });
  }
});

});

