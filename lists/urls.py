from django.conf.urls import url
from lists.views import view_list, new_list

"""
/lists/ - під'єднано у модулі luperlists.urls.py:
            url(r'^lists/',   include('lists.urls')),
"""
urlpatterns = [
    # url(r'^person/table/$',   PersonTableView.as_view(), name='person-table'),
    # url(r'^$',                  home_page, name='home'),
    url(r'^(\d+)/$',            view_list, name='view_list'),
    url(r'^new$',               new_list,  name='new_list'),
    url(r'^logout$',            new_list,  name='logout'),
]
# urlpatterns += staticfiles_urlpatterns()

