from django.conf.urls import url
from django.contrib.auth.views import logout

urlpatterns = [
    url(r'^login$',  'accounts.views.login',  name='login'),
    url(r'^logout$', logout, {'next_page': '/'}, name='logout'),
]